const db = require("../db/database");

//Fetch data from YarnMaster Table 
const getYarnDetails = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * From yarn_master");
        res.json({ success: true, data: results});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

module.exports = {
    getYarnDetails,
}
