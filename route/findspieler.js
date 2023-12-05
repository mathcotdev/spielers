
const {fcbspielers} = require("../source/db/sequelize")
const auth = require("../auth/auth")

module.exports = (app) => {
    app.get("/spielers/:id", auth, (req, res)=>{
       const id = req.params.id
       fcbspielers.findByPk(id)
         .then(fcbspieler => {
            const message = "Der spieler "+ fcbspieler.name+" von FCB wurde gut gefunden, der "+ id + " als id hat"
            var datum = new Date((Date.now()) - fcbspieler.erstellung)
            res.json({message, data: fcbspieler, publizieren : datum.getSeconds() })
         })
         .catch(Erreur => {
            const message = "Der wurde nicht gefunden"
            res.status(500).json({message, data:Erreur})
         })
    })
}