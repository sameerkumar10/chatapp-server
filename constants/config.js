


const corsOptions = {
        origin: [
          "http://localhost:5173",
          "http://localhost:4173",
          process.env.CLIENT_URL || "https://chatapp-frontend-mocha.vercel.app", 
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      
};
const SAMEER_TOKEN = "sameer-token";

export {corsOptions,SAMEER_TOKEN};