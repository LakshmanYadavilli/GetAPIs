const express = require("express");

const app = express();
app.use(express.json())
const{open}=require('sqlite');
const sqlite3=require('sqlite3');
const path=require('path');
const dbpath=path.join(__dirname,'cricketTeam.db');
let db=null;
const initializeAndServer=async()=>{
    try{
        db=await open({
        filename:dbpath,
        driver:sqlite3.Database
    });app.listen(3000,()=>{
        console.log("Server http://localhost:3000/ running...")
    });
}catch(e){
    console.log(`DB Error:${e.message}`)
    process.exit(1);
}

}
initializeAndServer();
app.all("/players/", async(request, response) =
  const query=`SELECT * FROM cricket_team`
  const playersArray=await db.all(query);
  response.send(playersArray);
});


