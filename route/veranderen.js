const { ValidationError } = require("sequelize")
const {fcbspielers} = require("../source/db/sequelize")
const auth = require("../auth/auth")

module.exports = (app) => {
    app.put("/spielers/:id", auth, (req, res)=>{
       const id = req.params.id
       fcbspielers.update(req.body, {where : {id : id}})
         .then(() => {
            fcbspielers.findByPk(id)
              .then(fcbspieler => {
                const message = "Der spieler "+ fcbspieler.name+" von FCB wurde gut verändert, der "+ id + " als id hat"
                res.json({message, data: fcbspieler})
              })
              .catch(fehler =>{
                const message = "Der wurde nicht gefunden, also nicht verandert"
                res.status(404).json({message, data:fehler})
              })
         })
         .catch(fehler =>{
          if(fehler instanceof ValidationError){
            return res.status(400).json({message: fehler.message, data: fehler})
         }
         if(fehler instanceof UniqueConstraintError){
          return res.status(400).json({message: fehler.message, data:fehler})
       }
          const message = "Der wurde nicht verandert"
          res.status(500).json({message, data:fehler})
         })
    })
}