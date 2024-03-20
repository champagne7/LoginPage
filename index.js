import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from 'dotenv';
import path from "path";
dotenv.config();

const app = express();
const port =  3000;
const __dirname = dirname(fileURLToPath(import.meta.url));



const db = new pg.Client({
    user: "postgres",
    host: "logindb2.cvvlpecj6cf4.us-east-1.rds.amazonaws.com",
    database: "login_details",
    password: "bubbleboy970",
    port: 5432
});

// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "login_details",
//     password: "bubbleboy970",
//     port: 5432
// });

db.connect();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});


app.post("/submit", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    await db.query("INSERT INTO login_details (name, email, phone) values ($1, $2, $3)", [name, email, phone]);
    res.send(`<h1>Thank You for registering with us!</h1>`);
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});