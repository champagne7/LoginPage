import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from 'dotenv';
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

db.connect();



app.use(bodyParser.urlencoded({extended: true}));

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

// app.post("/submit", async (req, res) => {
//     console.log("submit clicked");
//     console.log(req.body);
//     let a = [
//         {
//           id: 1,
//           name: 'Tanya',
//           email: 'rishiavinash01@gmail.com',
//           phone: '9515178983'
//         }
//       ];
//     const result = await db.query("SELECT * from login_details2");
//     console.log(result.rows);
//     a = result.rows;
//     res.send(a);
// });


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});