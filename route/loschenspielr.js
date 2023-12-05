const auth = require("../auth/auth")
const {fcbspielers} = require("../source/db/sequelize")
module.exports = (app) => {
    app.delete("/spielers/:id", auth, (req, res) =>{
        id = req.params.id
        fcbspielers.findByPk(id)
         .then(spl =>{
          fcbspielers.destroy({where : {id : id}})
            .then( ()=>{
             const message = "Der spieler "+ spl.name + " wurde mit erfolg geloschen"
             res.json({message, data: spl})
            })
            .catch(fehler =>{
              const message = "Der  spieler wurde nicht geloscht"
              res.status(500).json({message, data:fehler})
            })
         } )
         .catch(fehler =>{
          const message = "Der spieler wurde nicht gefunden"
          res.status(404).json({message, data:fehler})
         })
         })
}