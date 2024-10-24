const redis = require("redis");
const dotenvConfig = require("dotenv").config();

// Create a new Redis client
console.log("This is ca_cert", process.env.REDIS_CA_CERT);

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  tls: {
    ca: [process.env.REDIS_CA_CERT], // Add the CA certificate for verification
    rejectUnauthorized: false,
  },
  // socket: {
  //   reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
  //   connectTimeout: 10000, // Set connection timeout to 10 seconds
  // },
});

// Connect to Redis
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
    return client.ping(); // Ping after successful connection
  })
  .then((result) => {
    console.log("Ping response:", result); // Should log 'PONG'
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err); // Log any errors
  })
  .finally(() => {
    client.quit(); // Close the connection when done
  });
