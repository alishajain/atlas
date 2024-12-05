const db = require("../db/database");

//Fetch data from YarnMaster Table 
const getYarnStockDetails = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * From yarn_inventory");
        res.json({ success: true, data: results});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

module.exports = {
    getYarnStockDetails,
}
