import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "./routes/signin.tsx"),
  route("/signup", "./routes/signup.tsx"),
  route("/farmer", "./routes/farmer.tsx"),
  route("/buyer", "./routes/buyer.tsx"),
  route("/orders", "./routes/orders.tsx"),
] satisfies RouteConfig;
