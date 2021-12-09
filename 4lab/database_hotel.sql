Create table Hotel(
	Id 			    int				primary key,
	name 			varchar(100) 	not null,
	CountRooms 	    int				not null,
	LevelOfService 	varchar(255) 	not null,
	CountFreeRooms 	int				not null,
	CountBusyRooms 	int				not null,
	Income 		    numeric(12,5) 	null	
);

Create table HotelRoom(
	Id 			    int				primary key,
	CountRooms 	    int 			not null,
	TypeRoom 		varchar(100)	not null,
	Price			numeric(10,2)	not null,
	Reservation		Int				not null,
	HotelID		    int				null,
	ClientID		int				null
);

Create table Client(
	Id 			    int				primary key,
	FIOname 		varchar(150)	not null,
	Passport 		integer			not null,
	HotelID		    int				null
);

alter table Client add CONSTRAINT client_hotel_fk
foreign key(HotelID)
references Hotel(ID)
ON DELETE CASCADE;

alter table HotelRoom add CONSTRAINT hotel_room_hotel_fk
foreign key(HotelID)
references Hotel(ID)
ON DELETE CASCADE;

alter table HotelRoom add CONSTRAINT hotel_room_client_fk
foreign key(ClientId)
references Client(ID)
ON DELETE CASCADE;

create sequence client_seq start 1;
create sequence hotel_seq start 1;
create sequence hotelroom_seq start 1;

insert into hotel values (nextval('hotel_seq'),'Волга', 50, 'супер отель 5 звезд', 21, 29, null);

insert into client values (nextval('client_seq'),'Андрианова Юлия Васильевна',731423456, 1);
insert into client values (nextval('client_seq'),'Шпак Матвей Игоревич',731423456, 1);
insert into client values (nextval('client_seq'),'Ворсина Инга Ларионовна',731423456, 1);
insert into client values (nextval('client_seq'),'Ивашкина Дарья Владимировна',731423456, 1);
insert into client values (nextval('client_seq'),'Васечкин Иван Петрович',731412356, 1);

insert into hotelroom values (nextval('hotelroom_seq'), 1, 'стандарт', 1800, 1, 1,5 );
insert into hotelroom values (nextval('hotelroom_seq'), 2, 'стандарт', 1800, 1, 1,4 ) ;
insert into hotelroom values (nextval('hotelroom_seq'), 3, 'люкс', 3500, 1, 1, 3 );
insert into hotelroom values (nextval('hotelroom_seq'), 3, 'люкс', 3500, 1, 1, 2 );
insert into hotelroom values (nextval('hotelroom_seq'), 2, 'эконом', 1500, 1, 1, 1 );

insert into hotelroom values (nextval('hotelroom_seq'), 1, 'стандарт', 1800, 0, 1, null);
insert into hotelroom values (nextval('hotelroom_seq'), 2, 'стандарт 2-х комнатный', 2000, 0, 1,null); 
insert into hotelroom values (nextval('hotelroom_seq'), 3, 'люкс', 3500, 0, 1, null);
insert into hotelroom values (nextval('hotelroom_seq'), 5, 'евролюкс', 5500, 0, 1, null);
insert into hotelroom values (nextval('hotelroom_seq'), 1, 'эконом', 1500, 0, 1, null);
insert into hotelroom values (nextval('hotelroom_seq'), 1, 'эконом', 1500, 0, 1, null);


CREATE TABLE users (
	id int NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);


CREATE SEQUENCE user_seq START 1;

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('user_seq');
