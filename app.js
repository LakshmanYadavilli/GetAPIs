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
//GET aLL Details
app.get("/players/", async (request, response) => {
  const query = `SELECT * FROM cricket_team `;
  const playersArray = await db.all(query);

  response.send(playersArray);
});
//Get for specified Student_Id
app.get("/players/:playerId/", async (request, response) => {
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
  response.send("Succesfully Created...");
});

//put Method
app.put("/players/:playerId/", async (request, response) => {
  let body = request.body;
  const { playerName, jerseyN } = body;
  let { player_Id } = request.params;
  let Q = `UPDATE cricket_team SET player_name='${playerName}',jersey_number=${jerseyN} WHERE player_id=${player_Id} `;
  await db.run(Q);
  response.send("Succesfully Updated...");
});

//DELETE method
app.delete("/players/:playerId/", async (request, response) => {
  let { player_Id } = request.params;
  let Q = `DELETE FROM cricket_team WHERE player_id=${player_Id}`;
  await db.run(Q);
  response.send("Succesfully Delete....");
});
