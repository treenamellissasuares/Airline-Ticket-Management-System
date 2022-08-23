const pool = require("../../utils/database.config");

module.exports.find = async (req, res) => {
    try {
        console.log(22);
        
        const query = req.query;
        console.log(111,req.query)
       
        
        console.log(123,req.query.fromloc);

        if (query.fromloc!= "" && query.toloc != "" && query.depdate=='' ) {
            let floc = query.fromloc.toLowerCase();
            let tloc = query.toloc.toLowerCase();
            
            console.log(floc)
            console.log(tloc);

            const date = new Date();
            
            const flight = await pool.query("Select f.fid,f.fromloc,f.toloc,f.airlinename,fd.depdate,fd.arrdate from flight f,flight_details fd where fromloc=$1 and toloc=$2 and fd.fid=f.fid and fd.depdate>$3 ", [floc, tloc,date])
            console.log(flight.rows);
            return flight.rows;
        }

        if (query.depdate != "" && query.arrdate != "" && query.fromloc == '') {
            

            // console.log(floc)
            // console.log(tloc);

            const date = new Date();

            const flight = await pool.query("Select f.fid,f.fromloc,f.toloc,f.airlinename,fd.depdate from flight f,flight_details fd where depdate>=$1 and arrdate<=$2 and fd.fid=f.fid  ", [query.depdate,query.arrdate])
            console.log(flight.rows);
            return flight.rows;
        }




        const flight = await pool.query("select f.fid,f.fromloc,f.toloc,f.airlinename,fd.depdate,fd.arrdate from flight f,flight_details fd where f.fid=fd.fid and fd.depdate>$1", [new Date()]);

        console.log(flight.rows);

        return flight.rows;




        
    } catch (e) {
        console.log(e);
      
    }
}


module.exports.bookticket = async (req, res) => {
    try {
       
        const body = req.body;
        console.log(3333,body);
        const date = new Date(body.fdate);
        var flightdet = await pool.query("select * from flight_details where depdate=$1 and fid=$2", [date, req.body.fid]);

        const flight = await pool.query("select * from flight where fid=$1", [req.body.fid]);
        console.log(flightdet.rowCount, body.book.length, flight.rowCount)
        if (flightdet.rowCount + body.book.length > flight.rows[0].totalseat) {
            res.status(403).json();
            return;
        }
        
        body.book.forEach(async(element) => {
            console.log(123, element)
            console.log(body.cid, body.fid, date, element.name, element.age)
            const books = await pool.query("insert into ticket_info (cid,fid,fdate,name,age) values ($1,$2,$3,$4,$5) returning *", [body.cid, flightdet.rows[0].fid, flightdet.rows[0].depdate, element.name, element.age]);
        console.log(222,books.rows)
        });

        res.status(200).json();






    } catch (e) {
        console.log(e);

    }
}



module.exports.bookings = async (req, res) => {
    try {

        const flight = await pool.query("select * from flight f ,flight_details fd where f.fid in ( select distinct fid from ticket_info  where cid =$1) and f.fid=fd.fid  ", [req.body.cid])
        console.log(444, flight.rows)
       
       
        return flight.rows;






    } catch (e) {
        console.log(e);

    }
}


module.exports.ticket = async (req, res) => {
    try {
        const date = new Date(req.query.date);
        console.log(123, req.body.cid, req.query.date)
        console.log(date);
        
        const flight = await pool.query("select * from ticket_info where  cid=$1 and fid=$2 ", [req.body.cid,req.query.fid])
        // console.log(11, (flight.rows));

        // const d = date.getTime();
        // const d2 = flight.rows[0].fdate.getTime();
        // console.log(d, d2);
        // console.log(222, d == d2);

        // console.log(d - d2);

        var task = [];
        for (var i = 0; i < flight.rowCount; i++) {
            if (date.getFullYear() == flight.rows[i].fdate.getFullYear() && date.getMonth() == flight.rows[i].fdate.getMonth() && date.getDate() == flight.rows[i].fdate.getDate()) {
                console.log(111, date.getFullYear() == flight.rows[0].fdate.getFullYear() && date.getMonth() == flight.rows[0].fdate.getMonth() && date.getDate() == flight.rows[0].fdate.getDate())
                task.push(flight.rows[i]);
            }
        }
        
        console.log(222, task);
        

        // const task = flight.rows.map(e => e.fdate.toLocaleDateString() == date.toLocaleDateString());
        
        // console.log(111111, task);
        return flight.rows;






    } catch (e) {
        console.log(e);

    }
}

module.exports.flightdetails = async (fid) => {
    try {
       
        const flight = await pool.query("select * from flight f ,flight_details fd  where  f.fid=fd.fid and f.fid=$1", [fid])
        console.log(flight.rows)
        return flight.rows;






    } catch (e) {
        console.log(e);

    }
}


// module.exports.bookings = async (req, res) => {
//     try {

//         const flight = await pool.query("select * from ticket_info t,flight f where t.fid=f.fid and  t.cid=$1", [req.body.cid])
//         console.log(flight.rows)
//         return flight.rows;






//     } catch (e) {
//         console.log(e);

//     }
// }


module.exports.ticketinfo = async (req, res) => {
    try {
        const date = new Date(req.query.date);
        const flight = await pool.query("select * from ticket_info t where  t.cid=$1 and t.fdate=$2  ", [req.query.cid, date])
        console.log(flight.rows)
        return flight.rows;






    } catch (e) {
        console.log(e);

    }
}
