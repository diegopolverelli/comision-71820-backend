import mongoose from "mongoose";
import { config } from "../config/config.js";

const persistence=config.PERSISTENCE
export let DAO

switch (persistence) {
    case "FS":
        // import fs from "fs"
        DAO=(await import("./usuariosFsDAO.js")).usuariosFsDAO
        break;
    case "MONGO":
        await mongoose.connect(config.MONGO_URL, {dbName: config.DB_NAME})
        console.log(`DB online!`)
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO
        break;

    default:
        throw new Error(`Configure la persistencia en las variables de entorno...!!!`)
        // break;
}


