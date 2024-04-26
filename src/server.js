import "dotenv/config";
import app from "./app.js";
import config from "./config/dev.js";

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Playmakers Server listening on port: ${PORT}`);
});
