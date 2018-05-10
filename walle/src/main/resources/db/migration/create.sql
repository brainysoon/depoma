CREATE TABLE wechat
(
  id           int unsigned PRIMARY KEY                  NOT NULL AUTO_INCREMENT
  COMMENT '微信账号唯一标识',
  openid       varchar(64)                               NOT NULL
  COMMENT '微信openid用于拉取用户信息',
  nickname     varchar(32)                               NOT NULL
  COMMENT '用户昵称',
  sex          tinyint unsigned                          NOT NULL
  COMMENT '用户性别',
  lang         varchar(8)                                NOT NULL
  COMMENT '用户语言',
  city         varchar(32)                               NOT NULL
  COMMENT '用户所在城市',
  country      varchar(32)                               NOT NULL
  COMMENT '用户所在国家',
  province     varchar(32)                               NOT NULL
  COMMENT '用户所在省份',
  avatar       varchar(128)                              NOT NULL
  COMMENT '用户头像url',
  gmt_create   datetime                                  NOT NULL
  COMMENT '插入时间',
  gmt_modified datetime                                  NOT NULL
  COMMENT '上一次修改时间',
  state        tinyint unsigned                          NOT NULL
  COMMENT '用户状态 0 未激活 1激活'
)
engine = Innodb
charset = utf8mb4;
CREATE UNIQUE INDEX wechat_id_uindex
  ON wechat (id);
CREATE UNIQUE INDEX wechat_openid_uindex
  ON wechat (openid);