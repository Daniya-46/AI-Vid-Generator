import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import suplimaxRoutes from "./routes/suplimaxRoutes";
import realEstateRoutes from "./routes/realEstateRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ai-vid-gen-frontend.vercel.app"],
  })
);
app.use(express.json());

// Routes
app.use("/api/suplimax", suplimaxRoutes);
app.use("/api/real-estate", realEstateRoutes);

app.get("/", (req, res) => {
  res.send("Development Server Running");
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
});
