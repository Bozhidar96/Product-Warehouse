import pool from "../database/connection";

const warehouseQueries = {
  warehouses: async () => {
    const result = await pool.query("SELECT * FROM warehouses");
    return result.rows;
  },
};

export default warehouseQueries;
