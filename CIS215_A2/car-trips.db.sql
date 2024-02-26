BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Trips" (
	"trip_id"	INTEGER,
	"destination_address"	VARCHAR(255),
	"destination_zip"	VARCHAR(20),
	"to_date"	DATE,
	"to_start_time"	TIME,
	"to_arrival_time"	TIME,
	"back_date"	DATE,
	"back_start_time"	TIME,
	"back_arrival_time"	TIME,
	"vehicle_id"	INTEGER,
	"driver_id"	INTEGER,
	"passenger_id"	INTEGER,
	FOREIGN KEY("passenger_id") REFERENCES "Passengers"("passenger_id"),
	FOREIGN KEY("driver_id") REFERENCES "Drivers"("driver_id"),
	FOREIGN KEY("vehicle_id") REFERENCES "Vehicles"("vehicle_id"),
	PRIMARY KEY("trip_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Drivers" (
	"driver_id"	INTEGER,
	"first_name"	TEXT,
	"middle_name"	TEXT,
	"last_name"	TEXT,
	"dob"	DATE,
	"address_street"	VARCHAR(255),
	"address_zip"	VARCHAR(20),
	"license_number"	TEXT,
	PRIMARY KEY("driver_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Passengers" (
	"passenger_id"	INTEGER,
	"first_name"	TEXT,
	"middle_name"	TEXT,
	"last_name"	TEXT,
	"dob"	DATE,
	"address_street"	VARCHAR(255),
	"address_zip"	VARCHAR(20),
	PRIMARY KEY("passenger_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Vehicles" (
	"vehicle_id"	INTEGER,
	"start_miles"	INTEGER,
	"end_miles"	INTEGER,
	"start_fuel"	INTEGER,
	"end_fuel"	INTEGER,
	"start_condition"	TEXT,
	"end_condition"	TEXT,
	"issues"	TEXT,
	"reason_for_trip"	TEXT,
	"oil_change_needed"	BOOLEAN,
	PRIMARY KEY("vehicle_id" AUTOINCREMENT)
);
INSERT INTO "Trips" ("trip_id","destination_address","destination_zip","to_date","to_start_time","to_arrival_time","back_date","back_start_time","back_arrival_time","vehicle_id","driver_id","passenger_id") VALUES (1,'10403 Grand Canyon','29856','01/01/2000','08:00:AM','08:01:AM','02/01/2000','08:03:AM','08:04:AM',1,1,2),
 (2,'911 Police Station','24680','02/01/1996','07:30:AM','08:30:PM','03/25/2000','06:00:PM','07:02:PM',2,3,2);
INSERT INTO "Drivers" ("driver_id","first_name","middle_name","last_name","dob","address_street","address_zip","license_number") VALUES (1,'William','Randolph','Hircsh','01/09/1905','125 Mulberry St','49706','123-456-789'),
 (2,'John','Phillip','Seusah','01/15/1827','10956 Lane Lane','49736','A12345678'),
 (3,'Mike','Fern','Wazowski','07/27/2001','289 Monster Drive','98765','A113');
INSERT INTO "Passengers" ("passenger_id","first_name","middle_name","last_name","dob","address_street","address_zip") VALUES (1,'Eric','Middle','Cartman','08/13/1997','950 Main St','98123'),
 (2,'Peter','Middle','Griffin','01/27/1999','90210 Spooner Street','10947');
INSERT INTO "Vehicles" ("vehicle_id","start_miles","end_miles","start_fuel","end_fuel","start_condition","end_condition","issues","reason_for_trip","oil_change_needed") VALUES (1,0,100,12,10,'New','Good','Non-Functioning AC','Grand Canyon Trip',NULL),
 (2,100000,100050,15,10,'Fair','Fair','Broken Windshield','Arresting Criminal',NULL);
CREATE TRIGGER oil_change AFTER UPDATE ON Vehicles
WHEN NEW.end_miles - OLD.end_miles >= 4000
BEGIN
    UPDATE Vehicles SET oil_change_needed = TRUE WHERE vehicle_id = NEW.vehicle_id;
END;
COMMIT;
