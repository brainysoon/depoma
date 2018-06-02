create table wechat_info
(
	id int unsigned auto_increment
		primary key,
	wechat_id varchar(64) not null,
	login_status int not null,
	state int not null,
	constraint wechat_info_id_uindex
		unique (id),
	constraint wechat_info_wechat_id_uindex
		unique (wechat_id)
);
create table wechat_record
(
	id int unsigned auto_increment
		primary key,
	wechat_id varchar(64) not null,
	robot_id varchar(64) not null,
	chat_content varchar(256) not null,
	gmt_sent datetime not null,
	status int not null,
	constraint wechat_records_id_uindex
		unique (id)
);