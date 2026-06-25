const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/candidates", (req, res) => {
  const { name, role } = req.body;

  db.run(
    "INSERT INTO candidates(name,role) VALUES(?,?)",
    [name, role],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error inserting candidate");
      }
      res.json({
        id: this.lastID,
        name,
        role,
      });
    },
  );
});

app.get("/candidates", (req, res) => {
  db.all("SELECT * FROM candidates", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving candidates");
    }
    res.json(rows);
  });
});

app.get("/candidates/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM candidates WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error retrieving candidate");
    }
    if (!row) {
      return res.status(404).send("Candidate not found");
    }
    res.json(row);
  });
});

app.post("/candidates/:id/notes", (req, res) => {
  const candidateId = req.params.id;
  const { content } = req.body;

  db.run(
    "INSERT INTO notes(candidate_id,note) VALUES(?,?)",
    [candidateId, content],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error inserting note");
      }
      res.json({
        id: this.lastID,
        content,
      });
    },
  );
});

app.get("/candidates/:id/notes", (req, res) => {
  const candidateId = req.params.id;

  db.all(
    "SELECT id, candidate_id, note AS content FROM notes WHERE candidate_id=?",
    [candidateId],
    (err, rows) => {
      if (err) {
        return res.status(500).send("Error retrieving notes");
      }
      res.json(rows);
    },
  );
});

app.delete("/candidates/:id", (req, res) => {
  const candidateId = req.params.id;

  db.run(
    "DELETE FROM notes WHERE candidate_id = ?",
    [candidateId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.run(
        "DELETE FROM candidates WHERE id = ?",
        [candidateId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.json({
            message: "Candidate deleted successfully",
          });
        }
      );
    }
  );
}); 

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
