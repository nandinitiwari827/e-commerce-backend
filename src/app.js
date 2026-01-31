import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

let app=express()

let allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://e-commerce-website-self-kappa.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


app.use(express.json({limit: "500mb"}))
app.use(express.urlencoded({extended: true, limit: "500mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/wishlist", wishlistRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/orders", orderRouter)

export {app}

