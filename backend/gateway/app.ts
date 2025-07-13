import express, { Application, Request, Response } from "express";
import expressProxy from "express-http-proxy";

const app: Application = express();

app.use("/auth", expressProxy("http://localhost:3001"));
app.use("/product", expressProxy("http://localhost:3002"));
app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to the Gateway");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Gateway server listening on port ${PORT}`);
});
