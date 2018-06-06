"""
对SequenceToSequence模型进行基本的参数组合测试
"""

import pickle
import sys

import numpy as np
import tensorflow as tf

# import jieba
# from nltk.tokenize import word_tokenize

sys.path.append('..')


def start_service(model_addr, msg_q, reply_q, single_msg):
    """测试不同参数在生成的假数据上的运行结果"""

    from .sequence_to_sequence import SequenceToSequence
    from .data_utils import batch_flow

    x_data, _ = pickle.load(open(model_addr + '.chatbot.pkl', 'rb'))
    ws = pickle.load(open(model_addr + '.ws.pkl', 'rb'))

    for x in x_data[:5]:
        print(' '.join(x))

    config = tf.ConfigProto(
        device_count={'CPU': 1, 'GPU': 0},
        allow_soft_placement=True,
        log_device_placement=False
    )

    # save_path = '.ckpt'
    save_path = model_addr + '.ckpt'

    # 测试部分
    tf.reset_default_graph()
    model_pred = SequenceToSequence(
        input_vocab_size=len(ws),
        target_vocab_size=len(ws),
        batch_size=1,
        mode='decode',
        beam_width=0,
        bidirectional='true',
        use_residual='false',
        use_dropout='false',
        time_major='false',
        cell_type='lstm',
        depth=2,
        attention_type='Bahdanau',
        hidden_units=128,
        optimizer='adam',
        learning_rate=0.001,
        embedding_size=300
    )
    init = tf.global_variables_initializer()

    with tf.Session(config=config) as sess:
        sess.run(init)
        model_pred.load(sess, save_path)

        while True:
            msg = msg_q.get()
            x_test = [list(msg.lower())]
            # x_test = [word_tokenize(user_text)]
            bar = batch_flow([x_test], ws, 1)
            x, xl = next(bar)
            x = np.flip(x, axis=1)
            # x = np.array([
            #     list(reversed(xx))
            #     for xx in x
            # ])
            print(x, xl)
            pred = model_pred.predict(
                sess,
                np.array(x),
                np.array(xl)
            )
            print(pred)
            reply_q.put(pred)
            single_msg.set()
            # prob = np.exp(prob.transpose())
            print(ws.inverse_transform(x[0]))
            # print(ws.inverse_transform(pred[0]))
            # print(pred.shape, prob.shape)
            for p in pred:
                ans = ws.inverse_transform(p)
                print(ans)
