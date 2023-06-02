import { getRepository } from "typeorm";
import { Product } from "../models/Product";

const productQueries = {
  products: async () => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  },
};

export default productQueries;
