import { ProductsRouter } from "./routes.products.js";
import { SessionRouter } from "./routes.session.js";
import { UserRouter } from "./routes.user.js";

export const routes = {
  session: SessionRouter,
  user: UserRouter,
  products: ProductsRouter,
};
