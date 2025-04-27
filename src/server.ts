import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js'

const server = async () => {
    
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes);
    
    
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    })
}

server();