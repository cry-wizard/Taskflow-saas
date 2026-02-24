import cron from "node-cron";

const HEALTH_URL =
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:3000/api/v1/health";

export const startKeepAliveCron = () => {
  // every 14 minutes 30 seconds
  cron.schedule("*/14 * * * *", async () => {
    try {
      console.log("Cron pinging health endpoint...");

      await fetch(`${HEALTH_URL}`);
    } catch (err) {
      console.error("Health ping failed:", err);
    }
  });
};