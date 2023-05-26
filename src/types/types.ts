import { gql } from "apollo-server-express";

const graphType = gql`
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
export default graphType;
