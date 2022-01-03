import dotenv from 'dotenv';
import app from './src/app.js'

dotenv.config({path: './config/config.env'});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));