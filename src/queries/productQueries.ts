import pool from "../database/connection";

const productQueries = {
  products: async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  },
};

export default productQueries;
