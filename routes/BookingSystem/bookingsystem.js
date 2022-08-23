const express = require("express");
const router = express.Router()
const authmiddleware = require("../../controller/Auth/authmiddleware");
const book=require("../../controller/BookingSystem/bookingsystemcontroller")


router.get("/find", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);
        await book.find(req,res);
        
     
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
})


router.get("/", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);
        
      const flight=  await book.find(req, res);
        res.render('dashboard', { layout: false ,flight:flight});


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
})


router.post("/ticket", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);

        const flight = await book.bookticket(req, res);
        


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
})


router.get("/bookings", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);

        const flight = await book.bookings(req, res);
        
        res.render('booking.ejs', { layout: false, flight: flight});   


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
})

router.get("/ticket", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);

        const flight = await book.ticket(req, res);
        console.log(444,flight[0].fid)
        const flightdetail = await book.flightdetails(flight[0].fid);
        res.render('ticket.ejs', { layout: false, flight: flight, flightdetail: flightdetail});


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
})


module.exports = router;