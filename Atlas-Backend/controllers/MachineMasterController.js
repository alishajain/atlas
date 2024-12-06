const db = require("../db/database");

//Fetch data from machine_master table
const getMachineDetails = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * From machine_master");
        res.json({ success: true, data: results });
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMachineDetails,
}