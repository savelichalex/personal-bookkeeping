import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'PersonalBookkeeping.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'PersonalBookkeeping Database';
const databaseSize = 200000;

let db;

const prepareDB = (instance) => {
  db = instance;

  db.executeSql(
    `CREATE TABLE IF NOT EXIST Categories (
       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
       name VARCHAR(255) NOT NULL,
       use_in_balance INTEGER NOT NULL,
       icon VARCHAR(55),
    )`,
  );

  db.executeSql(
    `CREATE TABLE IF NOT EXIST Records (
       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
       type VARCHAR(5) NOT NULL,
       amount INTEGER NOT NULL,
       note VARCHAR(255),
       created DATETIME CURRENT_TIMESTAMP,
       category INTEGER NOT NULL,
       FOREIGN KEY ( category ) REFERENCES Categories ( id );
    )`,
  );

  db.executeSql(
    `CREATE TABLE IF NOT EXIST Settings (
       option VARCHAR(255) NOT NULL,
       value VARCHAR(255) NOT NULL,
    )`,
  );
};

const openDB = () => (
  SQLite
    .echoTest()
    .then(() => SQLite.openDatabase({ name: databaseName }))
    .then()
);
