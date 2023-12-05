const express = require("express")
const {Succes, idmax} = require("./res")
const app = express()
const favicon = require("serve-favicon")
const morgan = require("morgan")
const body_parser = require("body-parser")
const {sp, fcbspielers} = require("./source/db/sequelize")
const findAllJS = require("./route/findAll")
app.get("/", (req,res)=>{res.send("Hallo")})
app
  .use(favicon(__dirname = "./fcb.ico"))
  .use(morgan("dev"))
  .use(body_parser.json())


app.listen(3000, ()=>{console.log("http://Localhost:"+3000);})

findAllJS(app)
require("./route/findspieler")(app)
require("./route/spielreanmelden")(app)
require("./route/veranderen")(app)
require("./route/loschenspielr")(app)
require("./route/anmelden")(app)

app.use((res) => {
  const message = "Die bitende Seite wurde nicht gefunden. versuchen Sie ein anderes URL bitte"
  res.status(404).json(message)
})