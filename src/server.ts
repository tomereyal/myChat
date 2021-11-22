import express from "express";
import cors from "cors";
import path from "path";
import expressJwt from "express-jwt";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middleware/error.middleware";
import { config } from "dotenv";
import { uploadRouter } from "./routers/uploads.router";
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 4000;

const { JWT_SECRET = "secret" } = process.env;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//===================
//   expressJwt()  "The first gate against unauthorized clients"
//===================
// comment out this line if you want to bypass JWT check during development
// When client attaches "bearer token" , expressJwt verifies it and if it is authenticated it will
// additionally make the tokens claims (whatever I configured them to be) available under user property of req=> req.user

// app.use(
//   expressJwt({ secret: JWT_SECRET }).unless({
//     path: [
//       "/api/users/register",
//       "/api/users/login",
//       "/api/users/logout",
//       "/api/users",
//     ],
//   })
// );

app.use(express.static("uploads"));


app.use("/api/uploads", uploadRouter);

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(PORT, () => console.log(`Server is up at ${PORT}`));

app.use(errorMiddleware);

//under the hood what expressJwt does=>
