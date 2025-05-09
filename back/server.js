require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const { status } = require('http-status');
const { jwtStrategy } = require('./config/passport');
const ApiError = require('./utils/ApiError');
const routes = require('./routes')
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require('./config/db');
const { startReminderJob } = require("./services/reminder.service")
const { seedAdmin } = require("./services/user.service");
const PORT = process.env.PORT || 5000;


const startServer = async () => {
    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser()); 

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // sanitize request data
    app.use(xss());
    app.use(mongoSanitize());

    // gzip compression
    app.use(compression());

    // enable cors
    app.use(cors({origin: "https://task-manager-app-eosin-nine.vercel.app", credentials: true }));
    app.options('*', cors());
    // jwt authentication
    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    // Routes
    app.use('/', routes);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
      next(new ApiError(status.NOT_FOUND, 'Not found'));
    });

    // Connect to the mongoose
    await connectDB();
    await seedAdmin();
    startReminderJob();
    

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();