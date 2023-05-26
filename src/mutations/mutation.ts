import pool from "../database";

const mutations = {
  addProduct: async (_, { name, size, isHazardous }) => {
    const result = await pool.query(
      "INSERT INTO products (name, size, is_hazardous) VALUES ($1, $2, $3) RETURNING *",
      [name, size, isHazardous]
    );
    return result.rows[0];
  },
  addWarehouse: async (_, { name, size }) => {
    const result = await pool.query(
      "INSERT INTO warehouses (name, size) VALUES ($1, $2) RETURNING *",
      [name, size]
    );
    return result.rows[0];
  },
  addStockMovement: async (_, { input }) => {
    const { productId, warehouseId, amount, date } = input;
    const result = await pool.query(
      "INSERT INTO stock_movements (product_id, warehouse_id, amount, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [productId, warehouseId, amount, date]
    );
    return result.rows[0];
  },
};

export default mutations;
