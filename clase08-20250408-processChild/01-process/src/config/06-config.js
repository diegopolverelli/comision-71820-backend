import {Command, Option} from "commander"
import dotenv from "dotenv"

const programa=new Command()

programa.addOption(new Option("-m, --mode <MODE>", "Mode de ejecución del script").choices(["dev", "prod"]).default("dev"))

programa.parse()

// let opciones=programa.opts()
// opciones.mode

const {mode} = programa.opts()

dotenv.config({
    path:mode=="dev"?"./src/.env.dev":"./src/.env.prod",
    override: true
})

export const config={
    PORT: process.env.PORT || 3009, 
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME, 
    SECRET: process.env.SECRET
}