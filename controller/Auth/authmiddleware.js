const JWT = require('jsonwebtoken');

module.exports.auth = async (req, res) => {
    let token = req.cookies.token;
    console.log(123, token)
    if (!token) {
        res.redirect('/')
        return res.status(403).json({
            auth: 'No token sent'
        });
    }
    try {
        var result = JWT.verify(token, process.env.JWT_SECRET || 'somesecret');
        console.log(result);
        req.body.cid = result.cid;
        req.body.email = result.email;
        // req.body.type = result.type;
        req.body.fname = result.fname;
        req.body.lname = result.lname;
        console.log(req.body.cid)
        console.log(req.body.email)

        if (!result) {
            return res.status(403).json("Invalid users.....")
        }




        return;
    } catch (err) {
        console.log(result);
        console.log(err);
        return res.status(500).json({
            server: 'Token info invalid'
        });
    }
}