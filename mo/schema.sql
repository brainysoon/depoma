create table wechat_info
(
	id int unsigned auto_increment
		primary key,
	service_id varchar(64) not null,
	wechat_id varchar(128) not null,
	nick_name varchar(64) not null,
	signature varchar(128) not null,
	sex tinyint unsigned not null,
	avatar_url varchar(256) not null,
	login_status tinyint unsigned not null,
	gmt_modified datetime not null,
	gmt_create datetime not null,
	state tinyint unsigned not null,
	constraint wechat_info_id_uindex
		unique (id),
	constraint wechat_info_qr_id_uindex
		unique (service_id),
	constraint wechat_info_user_name_uindex
		unique (wechat_id)
);

create table wechat_record
(
	id int unsigned auto_increment
		primary key,
	wechat_id varchar(128) not null,
	robot_id varchar(64) not null,
	to_nick_name varchar(64) not null,
	to_remark_name varchar(64) not null,
	chat_content varchar(256) not null,
	reply_content varchar(64) not null,
	gmt_sent datetime not null,
	status int not null,
	constraint wechat_records_id_uindex
		unique (id)
);

create table wechat_sample
(
	id int unsigned auto_increment
		primary key,
	wechat_id varchar(128) not null,
	sample_addr varchar(128) not null,
	gmt_modified datetime not null,
	gmt_create datetime not null,
	status tinyint unsigned not null,
	constraint wechat_sample_id_uindex
		unique (id)
);