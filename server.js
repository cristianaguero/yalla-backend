console.log('starting server building...')

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRotues.js';
import cors from 'cors';

const app = express();
app.use(express.json());

dotenv.config();


const allowedOrigins = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS - from index.js'));
        }
    }
}
app.use(cors(corsOptions));


app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});