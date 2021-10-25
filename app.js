const express = require("express");

const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "cricketTeam.db");
let db = null;
const initializeAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server http://localhost:3000/ running...");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeAndServer();
app.get("/players/", async (request, response) => {
  const query = `SELECT * FROM cricket_team `;
  const playersArray = await db.all(query);
  response.send(playersArray);
});
app.get("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const query = `SELECT * FROM cricket_team WHERE player_id=${playerId}
  `;
  const playersArray = await db.get(query);
  response.send(playersArray);
});
//post Method
app.post("/players/", async (request, response) => {
  const body = request.body;
  const { playerName, jerseyNumber, Role } = body;
  const query = `INSERT INTO cricket_team(player_name,jersey_number,role) VALUES('${playerName}',${jerseyNumber},'${Role}')`;
  const dBarray = await db.run(query);
  const player_Id = dBarray.lastID;
  app.send("Succesfully Created...");
});
