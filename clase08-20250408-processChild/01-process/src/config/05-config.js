import dotenv from "dotenv"
const mode="dev"
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