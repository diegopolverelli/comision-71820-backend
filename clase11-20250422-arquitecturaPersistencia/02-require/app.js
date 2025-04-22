let dao
const persistence="MONGO"
if(persistence=="FS"){
    dao=require("./fs.js").daoFS
}else{
    dao=require("./mongo.js").daoMONGO
}

console.log(dao)