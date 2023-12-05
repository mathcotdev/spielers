
exports.Succes = (message, data)=>{
    return {
        message : message,
        data : data
    }
}
exports.idmax = (NB)=>{
    let max = NB.length
    let maxid = max + 1
    return maxid
}
/*
fcb.map(spieler => {
    fcbspielers.create({
      name : spieler.name,
      Nationalité : spieler.natilonalité,
      alt : spieler.Age,
      bild: "hdhhggs",
      nummer: spieler.num
    }).then((pedri)=>{console.log(pedri.toJSON())})
  })
*/
