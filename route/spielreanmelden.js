const { ValidationError, UniqueConstraintError } = require("sequelize")
const {fcbspielers} = require("../source/db/sequelize")
const auth = require("../auth/auth")

module.exports = (app) => {
    app.post("/spielers", auth, (req, res)=>{
       fcbspielers.create(req.body)
         .then(fcbspieler => {
            const message = "Der spieler" + fcbspieler.name +" von FCB wurde gut angemelden"
            res.json({message, data: fcbspieler})
         })
         .catch(fehler => {
            if(fehler instanceof ValidationError){
               return res.status(400).json({message: fehler.message, data: fehler})
            }
            if(fehler instanceof UniqueConstraintError){
               return res.status(400).json({message: fehler.message, data:fehler})
            }
            const message = "Der spieler wurde nicht angemelden"
            res.status(500).json({message, data:fehler}) 
         })
    })
}