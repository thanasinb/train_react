require("dotenv").config().parsed
const express = require("express")
const cores = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const db = require("mysql2")

const app = express()

app.use(cores({
    origin: ["http://localhost:3000"],
    credentials: true,
}))

app.use(session({
    secret: "app-test",
    cookie:{
        maxAge: null,
        sameSite: "strict"
    }
}))

app.use(express.json())
app.use(express.static(__dirname.replace("server", "build")))
app.use(cookieParser())

app.post("/api/login", (req, res)=>{
    const connect = db.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    })

    connect.connect((err)=>{
        if(err){
            console.log(err, process.env)
            return res.send({})
        }
        connect.query("SELECT * FROM user WHERE BINARY username=? AND password=SHA2(?, 256)",
            [req.body.username, req.body.password],
            (err, result)=>{
                if(err){
                    console.log(err)
                    return
                }
                connect.end()
                if(result.length){
                    // const {username, password} = result[0]
                    req.session.valid = "pass"
                    res.send({
                        result: "pass"
                    })
                }else{
                    req.session.valid = "fail"
                    res.send({
                        result: "fail"
                    })
                }
        })
    })
})

app.get("/api/check", (req, res)=>{
    console.log(req.session.valid)
    if(req.session.valid === "pass"){
        res.send({
            result: "pass"
        })
    }else{
        res.send({
            result: "fail"
        })
    }
})

app.get("/api/logout", (req, res)=>{
    req.session.destroy()
    res.send({
        result: "logout complete"
    })
})

app.get("/user/login", (req, res)=>{
    res.sendFile(__dirname.replace("server", "build/index.html"))
})

app.listen(3001, ()=>{
    console.log("start server")
})