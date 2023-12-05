const { Op } = require("sequelize")
const {fcbspielers} = require("../source/db/sequelize")
const auth = require("../auth/auth")

module.exports = (app) => {
    app.get("/spielers", auth, (req, res)=>{
      if(req.query.limit)
      {
         var limite = parseInt(req.query.limit)
         console.log("Ok")
      }
      else{var limite = 3; console.log("Non")}
      if(req.query.name)
      {
         const name = req.query.name
         var nom = name.split("")
         if(nom.length > 1)
         {
            fcbspielers.findAndCountAll({where : {
               name : {
                  [Op.like] : '%'+name+'%'
               },
            },
            limit : limite,
            order : [["name", 'DESC']]
         })
             .then(({count, rows}) => {
               const message = count+" spieler von FCB wurde gut gefunden"
               res.json({message, data: rows})
            })
            .catch(erreur =>{
               const message = "Die liste der spieler wurde nicht gefunden. Versuchen Sie später"
               res.status(500).json({message, data: erreur})
            })
         }
         else
         {
            const message = "Der term von deiner suche muss mindestens 2 Buchstaben enthalten"
            res.status(400).json({message})
         }
        
      }
      else
      {
         fcbspielers.findAll({limit : limite, order : [["name", 'ASC']]})
         .then(fcbspieler => {
            const message = "Die spieler von FCB wurde gut gefunden "
            res.status(200).json({message, data: fcbspieler})
         })
         .catch(erreur =>{
            const message = "Die liste der spieler wurde nicht gefunden. Versuchen Sie später"
            res.status(500).json({message, data: erreur})
         })
      }
    })
}