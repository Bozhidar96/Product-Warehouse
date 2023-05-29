import { IResolvers } from "@graphql-tools/utils";
import mutations from "../mutations/mutation";
import productQueries from "../queries/productQueries";
import stockQueries from "../queries/stockQueries";
import warehouseQueries from "../queries/warehouseQueries";

export const resolvers: IResolvers = {
  Query: {
    ...productQueries,
    ...warehouseQueries,
    ...stockQueries,
  },
  Mutation: mutations,
};
