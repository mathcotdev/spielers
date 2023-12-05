const {Sequelize, DataTypes} = require("sequelize")
const fcb = require("./fcb")
const pg = require("pg")
const modelbenutzer = require("../models/benutzer")
const modelspieler = require("../models/spieler")
const benutzer = require("../models/benutzer")
const bcrypt = require("bcrypt")
const basefcb = new Sequelize(
  "verceldb",
  "default",
  "7vaVObwEgt6I",
  {
    host : "ep-holy-leaf-55070040-pooler.us-east-1.postgres.vercel-storage.com",
    dialect : "mysql",
    dialectObtions: {
      timezone: "Etc/GMT-2"
    },
    logging: false

  }
)
const benutzers = modelbenutzer(basefcb, DataTypes)
const fcbspielers = modelspieler(basefcb, DataTypes)
const sp = ()=>{
  basefcb.sync()
   .then(()=>{ 
     console.log("FIN SYNC")
     fcb.forEach((spieler)=>{
       fcbspielers.create({
         name : spieler.name,
         Nationalité : spieler.nationalité,
         alt : spieler.Age,
         bild: "hdhhggs",
         nummer: spieler.num
    }).then((spieler)=>{console.log("Der spieler " + spieler.name +"  wird gute angemelden")})
  })
  bcrypt.hash("11910", 10)
   .then(hash =>{
    benutzers.create({
      benutzer : "Alfred",
      mail : "alfred@gmail.com",
      passwort : hash
    }
    ).then((benutzer)=>{console.log("Der benutzer "+ benutzer.benutzer + " wird gut angemelden")})  
   })
})
}
module.exports = {sp, fcbspielers, benutzers}