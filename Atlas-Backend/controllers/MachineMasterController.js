const db = require('../db/database'); // Assuming db is configured to interact with the MySQL database

// Add new machine
const addMachine = async (req, res) => {
  const { MachineNo, ModelNo, MachineType, Category, CountPeriod, MachineSystem, MachineStatus, Remarks } = req.body;

  if (!MachineNo || !ModelNo || !MachineType || !Category || !CountPeriod || !MachineSystem || !MachineStatus) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO machine_master (MachineNo, ModelNo, MachineType, Category, CountPeriod, MachineSystem, MachineStatus, Remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [MachineNo, ModelNo, MachineType, Category, CountPeriod, MachineSystem, MachineStatus, Remarks]
    );
    return res.json({ success: true, message: 'Machine added successfully', data: result });
  } catch (error) {
    console.error('Error adding machine:', error);
    return res.status(500).json({ success: false, message: 'Error adding machine' });
  }
};

// Show all machines
const showAllMachines = async (req, res) => {
  try {
    const [machines] = await db.query('SELECT * FROM machine_master');
    return res.json({ success: true, data: machines });
  } catch (error) {
    console.error('Error fetching machines:', error);
    return res.status(500).json({ success: false, message: 'Error fetching machines' });
  }
};

// Search machine by MachineNo
const searchMachine = async (req, res) => {
  const { MachineNo } = req.params;

  try {
    const [machine] = await db.query('SELECT * FROM machine_master WHERE MachineNo = ?', [MachineNo]);

    if (machine.length > 0) {
      return res.json({ success: true, data: machine });
    } else {
      return res.status(404).json({ success: false, message: 'Machine not found' });
    }
  } catch (error) {
    console.error('Error searching machine:', error);
    return res.status(500).json({ success: false, message: 'Error searching machine' });
  }
};

// Delete machine by MachineNo
const deleteMachine = async (req, res) => {
  const { MachineNo } = req.params;

  try {
    const result = await db.query('DELETE FROM machine_master WHERE MachineNo = ?', [MachineNo]);

    if (result.affectedRows > 0) {
      return res.json({ success: true, message: 'Machine deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Machine not found' });
    }
  } catch (error) {
    console.error('Error deleting machine:', error);
    return res.status(500).json({ success: false, message: 'Error deleting machine' });
  }
};

// Update machine by MachineNo
const updateMachine = async (req, res) => {
  const { MachineNo } = req.params;
  const { ModelNo, MachineType, Category, CountPeriod, MachineSystem, MachineStatus, Remarks } = req.body;

  if (!ModelNo || !MachineType || !Category || !CountPeriod || !MachineSystem || !MachineStatus) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'UPDATE machine_master SET ModelNo = ?, MachineType = ?, Category = ?, CountPeriod = ?, MachineSystem = ?, MachineStatus = ?, Remarks = ? WHERE MachineNo = ?',
      [ModelNo, MachineType, Category, CountPeriod, MachineSystem, MachineStatus, Remarks, MachineNo]
    );

    if (result.affectedRows > 0) {
      return res.json({ success: true, message: 'Machine updated successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Machine not found' });
    }
  } catch (error) {
    console.error('Error updating machine:', error);
    return res.status(500).json({ success: false, message: 'Error updating machine' });
  }
};

module.exports = {
  addMachine,
  showAllMachines,
  searchMachine,
  deleteMachine,
  updateMachine,
};
