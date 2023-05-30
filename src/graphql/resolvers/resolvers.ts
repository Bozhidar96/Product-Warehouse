import { IResolvers } from "@graphql-tools/utils";
import mutations from "../../mutations/mutations";
import productQueries from "../../queries/productQueries";
import stockQueries from "../../queries/stockQueries";
import warehouseQueries from "../../queries/warehouseQueries";

const resolvers: IResolvers = {
  Query: {
    ...productQueries,
    ...warehouseQueries,
    ...stockQueries,
  },
  Mutation: mutations,
};

export default resolvers;
