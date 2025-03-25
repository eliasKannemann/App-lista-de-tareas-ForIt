
import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    // Add other configuration settings as needed
};