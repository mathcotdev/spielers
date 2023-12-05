module.exports = (base, DataType) => {
    return base.define("benutzer",
    {
        id : {
            type : DataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        benutzer : {
            type : DataType.STRING,
            allowNull : false
        },
        mail:
        {
            type : DataType.STRING,
            allowNull : false,
            unique : {nachrichte : "Diese Mail wird schon zugeordnet"}
        },
        passwort : 
        {
            type : DataType.STRING,
            allowNull : false
        }

    },
    {
        timestamps : true,
        createdAt : "erstellung",
        updatedAt : "veranderung"
    }
    )

}


