import pool from "../database";

const queries = {
  products: async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  },
  warehouses: async () => {
    const result = await pool.query("SELECT * FROM warehouses");
    return result.rows;
  },
  stockMovements: async (_, { warehouseId }) => {
    const result = await pool.query(
      "SELECT * FROM stock_movements WHERE warehouse_id = $1",
      [warehouseId]
    );
    return result.rows;
  },
  currentStock: async (_, { warehouseId }) => {
    const warehouseResult = await pool.query(
      "SELECT size FROM warehouses WHERE id = $1",
      [warehouseId]
    );
    const stockResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = $1",
      [warehouseId]
    );
    const warehouseSize = warehouseResult.rows[0].size;
    const currentStock = stockResult.rows[0].coalesce;
    return warehouseSize - currentStock;
  },
  remainingSpace: async (_, { warehouseId }) => {
    const warehouseResult = await pool.query(
      "SELECT size FROM warehouses WHERE id = $1",
      [warehouseId]
    );
    const stockResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = $1",
      [warehouseId]
    );
    const warehouseSize = warehouseResult.rows[0].size;
    const currentStock = stockResult.rows[0].coalesce;
    return warehouseSize - currentStock;
  },
};

export default queries;
