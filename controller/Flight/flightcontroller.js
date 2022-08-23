const pool = require("../../utils/database.config");


module.exports.create = async (req, res) => {
    try {
        const body = req.body;
        const value = 1;

        await pool.query('insert into flight (airlinename,fromloc,toloc,totalseat,adminid) values ($1,$2,$3,$4,$5)',[body.aname,body.fromloc,body.toloc,body.totalseat,value])


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}

module.exports.schedule = async (req, res) => {
    try {
        const body = req.body;
        

        await pool.query('insert into flight_details (fid,depdate,arrdate) values ($1,$2,$3)', [body.fid, body.depdate, body.arrdate])


    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}
module.exports.fetch = async (req, res) => {
    try {
        if (req.query.fid) {
            const flight = await pool.query("select * from flight_details where fid=$1", [req.query.fid]);
            return flight.rows;
        }
        const flight = await pool.query("select * from flight");
        return flight.rows;

    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}

module.exports.fetchflight = async (req, res) => {
    try {
        if (req.query.fid) {
            const flight = await pool.query("select fd.fid,fd.depdate,fd.arrdate,f.airlinename from flight_details fd,flight f where fd.fid=$1 and depdate>=$2 and f.fid=fd.fid", [req.query.fid,new Date()]);
            return flight.rows;
        }
        

    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}