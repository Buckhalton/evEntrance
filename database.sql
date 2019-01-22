CREATE TABLE "users" (
	"id" serial NOT NULL,
	"first_name" varchar(35) NOT NULL,
	"last_name" varchar(35) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(16) NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(30) NOT NULL,
	"username" varchar(20) UNIQUE NOT NULL,
	"password" varchar(200) NOT NULL,
	"authenticated" BOOLEAN NOT NULL,
	"code" varchar(100) NOT NULL,
	"role_id" serial NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "events" (
	"id" serial NOT NULL,
	"event_name" varchar(55) NOT NULL,
	"event_date" varchar(30) NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_events" (
	"user_events_id" serial NOT NULL,
	"users_id" int NOT NULL,
	"events_id" int NOT NULL,
	"attended" BOOLEAN NOT NULL);



CREATE TABLE "role" (
	"id" serial NOT NULL,
	"role_name" varchar(50) NOT NULL,
	CONSTRAINT role_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE users
ADD UNIQUE (username);

ALTER TABLE events 
ALTER COLUMN event_date TYPE DATE USING to_date(event_date, 'YYYY-MM-DD');
