import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'PersonalBookkeeping.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'PersonalBookkeeping Database';
const databaseSize = 200000;

let db;

const prepareDB = (instance) => {
  db = instance;

  return db.transaction(tx => {
    tx.executeSql('PRAGMA foreign_keys = ON;');

    tx.executeSql('DROP TABLE IF EXISTS Categories;');
    tx.executeSql('DROP TABLE IF EXISTS Records;');
    tx.executeSql('DROP TABLE IF EXISTS Settings;');

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Categories (
         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
         name TEXT NOT NULL,
         use_in_balance INTEGER NOT NULL,
         icon TEXT
      )`,
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Records (
         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
         type TEXT NOT NULL,
         amount INTEGER NOT NULL,
         note TEXT,
         created INTEGER NOT NULL,
         category INTEGER NOT NULL,
         FOREIGN KEY ( category ) REFERENCES Categories ( id ) ON DELETE CASCADE
      )`,
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Settings (
         option VARCHAR(255) NOT NULL,
         value VARCHAR(255) NOT NULL
      )`,
    );

    tx.executeSql('INSERT INTO Categories (name, use_in_balance, icon) VALUES ("test", 1, "star")');

    tx.executeSql('INSERT INTO Records (type, amount, created, category) VALUES ("income", 50000, 0, 1)');
    tx.executeSql('INSERT INTO Records (type, amount, created, category) VALUES ("cost", 40000, 0, 1)');
  });
};

const openDB = () => (
  SQLite
    .echoTest()
    .then(() => SQLite.openDatabase({ name: databaseName }))
    .then(prepareDB)
    .catch(err => console.error(err))
);

class Tables {
  constructor() {
    this.id = 0;
    this.listeners = {};

    this.isOpenedDb = false;
    openDB().then(() => {
      this.isOpenedDb = true;
      this.runListeners();
    });
  }

  addListener(executor) {
    this.id = this.id + 1;
    this.listeners[this.id] = executor;

    return this.id;
  }

  removeListener(id) {
    this.listeners[id] = null;
  }

  runListeners = () => {
    if (!this.isOpenedDb) {
      return false;
    }
    db.transaction(tx => {

      Object.keys(this.listeners)
        .map(id => this.listeners[id])
        .forEach(executor => {
          if (executor == null) {
            return;
          }
          executor(tx.executeSql.bind(tx));
        });
    });
  }

  update(query) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(query)
          .then(this.runListeners)
          .then(resolve)
          .catch(reject);
      });
    });
  }
}

const tables = new Tables();

export const runQuery = (query) => tables.update(query)

export const connect = (queries, toState) => ConnectedComponent => (
  class extends Component {
    constructor() {
      super();

      this.state = toState();
      this.id = null;
    }

    componentDidMount() {
      this.id = tables.addListener(this.executor);
      tables.runListeners();
    }

    componentWillUnmount() {
      tables.removeListener(this.id);
    }

    executor = (exec) => (
      Promise.all(
        queries.map(query => exec(query()))
      )
        .then((results) => (
          this.setState(toState(...results.map(([_, result]) => result)))))
        .catch(e => console.error(e))
    )

    render() {
      return (
        <ConnectedComponent
          {...this.props}
          {...this.state}
        />
      );
    }
  }
);

export const mapRows = (rows) => {
  const result = new Array(rows.length);

  for(var x = 0; x < rows.length; x++) {
    result[x] = rows.item(x);
  }

  return result;
};
