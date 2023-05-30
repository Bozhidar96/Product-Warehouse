import { Warehouse } from "../models/Warehouse";
import { getRepository } from "typeorm";

const warehouseQueries = {
  warehouses: async () => {
    const warehouseRepository = getRepository(Warehouse);
    const warehouses = await warehouseRepository.find();
    return warehouses;
  },
};

export default warehouseQueries;
