import express from "express";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config();
app.use(cors());

function corsConfig(): void {
  const whiteList = [process.env.FRONTEND_URL];
  const corsOptions = {
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void
    ) => {
      if (whiteList.includes(origin)) {
        callback(null, true);
      } else {
        const error = new Error("Sin acceso por política de CORS");
        callback(error);
      }
    },
  };
  app.use(cors(corsOptions));
}

corsConfig();

const PORT = process.env.PORT ?? 4000;

app.get("/api", (req, res) => {
  res.json({
    deporte: "escalada",
    nivel: "6",
  });
});

app.listen(PORT, () => console.log(`App run on port: ${PORT} 🚀`));
