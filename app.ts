const express = require('express');
import { ApolloServer, gql } from "apollo-server-express";
import { Pool } from "pg";

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432, // Change port if necessary
});

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    size: Float!
    isHazardous: Boolean!
  }

  type Warehouse {
    id: ID!
    name: String!
    size: Float!
  }

  type StockMovement {
    id: ID!
    product: Product!
    warehouse: Warehouse!
    amount: Int!
    date: String!
  }

  input StockMovementInput {
    productId: ID!
    warehouseId: ID!
    amount: Int!
    date: String!
  }

  type Query {
    products: [Product!]!
    warehouses: [Warehouse!]!
    stockMovements(warehouseId: ID!): [StockMovement!]!
    currentStock(warehouseId: ID!): Float!
    remainingSpace(warehouseId: ID!): Float!
  }

  type Mutation {
    addProduct(name: String!, size: Float!, isHazardous: Boolean!): Product
    addWarehouse(name: String!, size: Float!): Warehouse
    addStockMovement(input: StockMovementInput!): StockMovement
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    },
    warehouses: async () => {
      const result = await pool.query('SELECT * FROM warehouses');
      return result.rows;
    },
    stockMovements: async (_, { warehouseId }) => {
      const result = await pool.query('SELECT * FROM stock_movements WHERE warehouse_id = $1', [warehouseId]);
      return result.rows;
    },
    currentStock: async (_, { warehouseId }) => {
      const result = await pool.query(
        'SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = $1',
        [warehouseId]
      );
      return result.rows[0].coalesce;
    },
    remainingSpace: async (_, { warehouseId }) => {
      const warehouseResult = await pool.query('SELECT size FROM warehouses WHERE id = $1', [warehouseId]);
      const stockResult = await pool.query(
        'SELECT COALESCE(SUM(amount), 0) FROM stock_movements WHERE warehouse_id = $1',
        [warehouseId]
      );
      const warehouseSize = warehouseResult.rows[0].size;
      const currentStock = stockResult.rows[0].coalesce;
      return warehouseSize - currentStock;
    },
  },
  Mutation: {
    addProduct: async (_, { name, size, isHazardous }) => {
        const result = await pool.query(
          'INSERT INTO products (name, size, is_hazardous) VALUES ($1, $2, $3) RETURNING *',
          [name, size, isHazardous]
        );
        return result.rows[0];
      },
      addWarehouse: async (_, { name, size }) => {
        const result = await pool.query('INSERT INTO warehouses (name, size) VALUES ($1, $2) RETURNING *', [name, size]);
        return result.rows[0];
      },
      addStockMovement: async (_, { input }) => {
        const { productId, warehouseId, amount, date } = input;
        const result = await pool.query(
          'INSERT INTO stock_movements (product_id, warehouse_id, amount, date) VALUES ($1, $2, $3, $4) RETURNING *',
          [productId, warehouseId, amount, date]
        );
        return result.rows[0];
      },
    },
  };
  
  const server = new ApolloServer({ typeDefs, resolvers });
  
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });