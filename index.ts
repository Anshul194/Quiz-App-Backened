import app from "./app";
import dotenv from "dotenv";
import connectDatabase from "./connectDatabase";

connectDatabase();
dotenv.config();

const port = process.env.PORT || 8032;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err: any) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled rejection`);
});
