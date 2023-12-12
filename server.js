console.log('starting server building...')

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRotues.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import groupsRoutes from './routes/groupsRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();

const allowedOrigins = [process.env.FRONTEND_URL]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS - from server.js'));
//         }
//     }
// }
const corsOptions = {
    origin: allowedOrigins
}
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/groups', groupsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});