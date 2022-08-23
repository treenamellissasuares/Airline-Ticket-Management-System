const express = require("express");
const router = express.Router()
const authmiddleware = require("../../controller/Auth/authmiddleware");
const flightdetails  = require("../../controller/Flight/flightcontroller");


router.post("/create", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);
        await flightdetails.create(req, res);
        console.log(req.body);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post("/schedule", async (req, res) => {
    try {
        const pro = await authmiddleware.auth(req, res);
        await flightdetails.schedule(req, res);
        console.log(req.body);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get("/", async(req, res) => {
  const f=  await flightdetails.fetch(req, res);
    res.render("home.ejs", { layout: false,flight:f })
})

router.get("/fetch", async (req, res) => {
    const f = await flightdetails.fetchflight(req, res);
    
    res.render("flight.ejs", { layout: false, flight: f })
})

module.exports = router;