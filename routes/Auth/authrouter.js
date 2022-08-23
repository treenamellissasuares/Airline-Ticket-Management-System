const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const autocontroller=require("../../controller/Auth/authcontroller")

router.get("/",(req,res)=>res.render("index.ejs",{layout:false}))
router.post("/register", async (req, res) => {
    try {
        console.log(22222)
        await autocontroller.register(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/login', (req, res) => res.render('login', { layout: false }));

router.get('/adminlogin', (req, res) => res.render('adminlogin', { layout: false }));

router.get('/register', (req, res) => res.render('registration', { layout: false }));


router.post("/login", async (req, res) => {
    try {
        await autocontroller.login(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get("/logout", async (req, res) => {
    await autocontroller.logout(req, res);


})

module.exports = router;
