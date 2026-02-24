import app from "./app.js";
import connectDB from "./config/db.js";
import { startKeepAliveCron } from "./cron/keepAlive.cron.js";

const PORT = process.env.PORT || 5000;

connectDB();
startKeepAliveCron();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});