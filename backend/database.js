const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./candidate.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the sqlite database.");
  }
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS candidates(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL
    )
 `);

db.run(`
    CREATE TABLE IF NOT EXISTS notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER,
    note TEXT NOT NULL,
    FOREIGN KEY(candidate_id) REFERENCES candidates(id)
    )
    `);

});

module.exports = db;
