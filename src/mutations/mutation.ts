import { getRepository } from "typeorm";
import { Product } from "../models/Product";
import { Warehouse } from "../models/Warehouse";
import { Stock } from "../models/Stock";

const mutations = {
  addProduct: async (_, { name, size, isHazardous }) => {
    const productRepository = getRepository(Product);
    const product = new Product();
    product.name = name;
    product.size = size;
    product.isHazardous = isHazardous;
    const newProduct = await productRepository.save(product);
    return newProduct;
  },
  addWarehouse: async (_, { name, size }) => {
    const warehouseRepository = getRepository(Warehouse);
    const warehouse = new Warehouse();
    warehouse.name = name;
    warehouse.size = size;
    const newWarehouse = await warehouseRepository.save(warehouse);
    return newWarehouse;
  },
  addStockMovement: async (_, { input }) => {
    const { productId, warehouseId, amount, date } = input;
    const stockMovementRepository = getRepository(Stock);
    const stockMovement = new Stock();
    stockMovement.productId = productId;
    stockMovement.warehouseId = warehouseId;
    stockMovement.amount = amount;
    stockMovement.date = date;
    const newStockMovement = await stockMovementRepository.save(stockMovement);
    return newStockMovement;
  },
};

export default mutations;
