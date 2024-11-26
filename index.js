const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { incomingRequestLogger } = require("./middleware/index.js");
const userRouter = require("./routes/user.js");
const cartRouter = require("./routes/cart.js");
const paymentRouter = require("./routes/payment.js");
const restaurantRouter = require("./routes/restaurant.js");
const menuRouter = require("./routes/menu.js");
const addressRouter = require("./routes/deliveryAddress.js");
const reviewRouter = require("./routes/review.js");
const imageRouter = require("./routes/otherImg.js");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(incomingRequestLogger);

// Routes
app.use("/api/fd/user", userRouter);
app.use("/api/fd/cart", cartRouter);
app.use("/api/fd/payment", paymentRouter);
app.use("/api/fd/restaurant", restaurantRouter);
app.use("/api/fd/menu", menuRouter);
app.use("/api/fd/address", addressRouter);
app.use("/api/fd/review", reviewRouter);
app.use("/api/fd/image", imageRouter);

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
