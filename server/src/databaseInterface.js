import path from "path";
import mysql from "mysql";
import config from "../config/sqlconfig.js";

class SQLInterface {
  constructor() {}

  static test() {
    const con = mysql.createConnection(config);
    con.query("SHOW TABLES;", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows[0]);
    });
  }

  static getUserByOauthID(id) {
    const con = mysql.createConnection(config);
    con.query(
      "SELECT * FROM users WHERE OauthId LIKE ?",
      [id], // by default user is standart user
      (err, rows) => {
        if (err) throw err;
        console.log("Data received from Db:");
        console.log("Funguje je: " + rows[0].id);
        return rows[0];
      }
    );
  }

  /*
   * adds new user do database
   *
   */
  static addNewUserToDatabase(user) {
    const con = mysql.createConnection(config);
    console.log("Added new user");
    con.query(
      "INSERT INTO users (id, OauthId, email, given_name, family_name, role) VALUES (NULL,?,?,?,?,?);",
      [
        user.id,
        user.emails[0].value,
        user.name.givenName,
        user.name.familyName,
        0,
      ], // by default user is standart user
      (err, rows) => {
        if ((err.code = "ER_DUP_ENTRY")) {
          console.log("User is already stored in DB");
        } else if (err) {
          throw err;
        }
        console.log("Data received from Db:");
        console.log(rows);
      }
    );
  }
}

export { SQLInterface };
