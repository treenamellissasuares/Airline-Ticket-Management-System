const express = require('express');

const app = express();
const path = require("path");
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const auth = require("./routes/Auth/authrouter")
const flight = require("./routes/Flight/flightrouter");
const book = require("./routes/BookingSystem/bookingsystem");
app.use(expressLayouts);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));


//cookie parser
app.use(cookieParser())
//Body Parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.use("/", auth);
app.use("/flight", flight);
app.use("/book", book);


const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server connected to port ${port}`)
})