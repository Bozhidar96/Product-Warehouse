import { getRepository } from "typeorm";
import { Stock } from "../models/Stock";
import { Warehouse } from "../models/Warehouse";

const stockQueries = {
  stockMovements: async (_, { warehouseId }) => {
    const stockRepository = getRepository(Stock);
    const stockMovements = await stockRepository.find({
      where: { warehouse: { id: warehouseId } },
    });
    return stockMovements;
  },
  currentStock: async (_, { warehouseId }) => {
    const warehouseRepository = getRepository(Warehouse);
    const warehouse = await warehouseRepository.findOne(warehouseId);

    const stockRepository = getRepository(Stock);
    const stockResult = await stockRepository
      .createQueryBuilder("stock")
      .select("COALESCE(SUM(stock.amount), 0)", "totalAmount")
      .where("stock.warehouse = :warehouseId", { warehouseId })
      .getRawOne();

    const warehouseSize = warehouse.size;
    const currentStock = stockResult.totalAmount;

    return warehouseSize - currentStock;
  },
  remainingSpace: async (_, { warehouseId }) => {
    const warehouseRepository = getRepository(Warehouse);
    const warehouse = await warehouseRepository.findOne(warehouseId);

    const stockRepository = getRepository(Stock);
    const stockResult = await stockRepository
      .createQueryBuilder("stock")
      .select("COALESCE(SUM(stock.amount), 0)", "totalAmount")
      .where("stock.warehouse = :warehouseId", { warehouseId })
      .getRawOne();

    const warehouseSize = warehouse.size;
    const currentStock = stockResult.totalAmount;

    return warehouseSize - currentStock;
  },
};

export default stockQueries;
