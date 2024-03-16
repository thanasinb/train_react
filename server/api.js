const express = require("express")
const cores = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")

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
app.use(cookieParser())

app.post("/api/login", (req, res)=>{
    console.log(req.body)
    req.session.valid = "pass"
    res.send({
        result: "pass"
    })
})

app.get("/api/check", (req, res)=>{
    console.log(req.body)
    if(req.session.vlid === "pass"){
        res.send({
            result: "pass"
        })
    }else{
        res.send({
            result: "fail"
        })
    }
})

app.listen(3001, ()=>{
    console.log("start server")
})