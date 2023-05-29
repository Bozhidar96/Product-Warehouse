import pool from "../database/connection";

const stockQueries = {
  stockMovements: async (_, { warehouseId }) => {
    const result = await pool.query(
      `SELECT * FROM stock_movements WHERE warehouse_id = ${warehouseId}`
    );
    return result.rows;
  },
  currentStock: async (_, { warehouseId }) => {
    const warehouseResult = await pool.query(
      `SELECT size FROM warehouses WHERE id = ${warehouseId}`
    );
    const stockResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = ${warehouseId}`
    );
    const warehouseSize = warehouseResult.rows[0].size;
    const currentStock = stockResult.rows[0].coalesce;
    return warehouseSize - currentStock;
  },
  remainingSpace: async (_, { warehouseId }) => {
    const warehouseResult = await pool.query(
      `SELECT size FROM warehouses WHERE id = ${warehouseId}`
    );
    const stockResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = ${warehouseId}`
    );
    const warehouseSize = warehouseResult.rows[0].size;
    const currentStock = stockResult.rows[0].coalesce;
    return warehouseSize - currentStock;
  },
};

export default stockQueries;
