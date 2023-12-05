const {Sequelize, DataTypes} = require("sequelize")
const fcb = require("./fcb")
const modelbenutzer = require("../models/benutzer")
const modelspieler = require("../models/spieler")
const benutzer = require("../models/benutzer")
const bcrypt = require("bcrypt")
const basefcb = new Sequelize(
  "fcb",
  "root",
  "",
  {
    host : "localhost",
    dialect : "mariadb",
    dialectObtions: {
      timezone: "Etc/GMT-2"
    },
    logging: false

  }
)
const benutzers = modelbenutzer(basefcb, DataTypes)
const fcbspielers = modelspieler(basefcb, DataTypes)
const sp = ()=>{
  basefcb.sync({force: true})
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