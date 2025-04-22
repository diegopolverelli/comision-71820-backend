process.loadEnvFile("./.env")  // solo para versiones de Node superiores 21

// node --env-file ./.env app.js

export const config={
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    PERSISTENCE: process.env.PERSISTENCE
}