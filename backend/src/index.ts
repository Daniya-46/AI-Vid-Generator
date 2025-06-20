import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import suplimaxRoutes from "./routes/suplimaxRoutes";
import realEstateRoutes from "./routes/realEstateRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

//suplimax route
app.use("/api/suplimax", suplimaxRoutes);

// Real Estate route
app.use("/api/real-estate", realEstateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
