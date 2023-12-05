module.exports = (sequelize, DataTypes)=>{
    return  sequelize.define("spieler",
        {
            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false,
                validate: {
                    notNull : {nachrichte : "Der name muss ausgefullt werden"},
                    notEmpty : {nachrichte : "Der name des spielers muss keine null sein"}

                }
            },
            Nationalité : {
                type : DataTypes.STRING,
                allowNull : false,
                validate: {
                    notNull : {nachrichte : "Die nationalität muss ausgefullt werden"},
                    notEmpty : {nachrichte : "Die nationalität des spielers muss keine null sein"},
                    maxletter(value){
                        if(value.split("").length  > 10)
                          throw new Error("langer name");
                    }
                    
                }
            },
            alt : {
                type : DataTypes.INTEGER,
                allowNull : false,
                validate: {
                    notNull : {nachrichte : "Der spieler muss die Alte haben"},
                    isInt : {nachrichte : "Das Alter des spielers muss zahl sein"},
                    max : {args : [30], nachrichte: "Das Alter muss größer als 10 sein"},
                    min : {args : [10], nachrichte: "Das Alter muss größer als 10 sein"},
                }
            },
            bild : {
                type : DataTypes.STRING,
                allowNull : false
            },
            nummer : {
                type : DataTypes.INTEGER,
                allowNull : false,
                unique:{msg :"die nummer wird schon zugeordnet"},
                validate: {
                    notNull : {nachrichte : "Der spieler muss die nummer haben"},
                    isInt : {nachrichte : "Die nummer des spielers muss zahl sein"},
                }
            },
        },
        {
            timestamps : true,
            createdAt : "erstellung",
            updatedAt : "veranderung"
        }
    )
}