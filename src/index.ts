import { app } from "./app";
import "dotenv/config";

async function startApp() {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Server started at port ${port}`));
}

startApp();
