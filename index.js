require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const PORT = process.env.NODE_PORT || 9000;
const DB_URL = process.env.MONGO_URL || 'http://localhost:27017';

const start = async () => {
    try {
        await mongoose.connect(
            DB_URL,
            {useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
};

start();