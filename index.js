const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { incomingRequestLogger } = require("./middleware/index.js");
const authRoutes = require('./routes/user_routes');
const folderRoutes = require('./routes/folder_routes');


const errorHandler = require('./middleware/errorhandler.js');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(incomingRequestLogger);

// Routes
app.use('/api/user', authRoutes);
app.use('/api/folders', folderRoutes);


// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT;
mongoose
    .connect(process.env.MONGOOSE_URI_STRING, {
       
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });
