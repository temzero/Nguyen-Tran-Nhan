import express from 'express';  
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';

const stockRouter = require('./stockRouters')

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use('/', stockRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})

// connect to MongoDB
const MONGO_URI = 'mongodb+srv://temzero:temzero@backenddb.stzwv.mongodb.net/99Tech';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Unable to connect to MongoDB', error));