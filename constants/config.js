


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    process.env.CLIENT_URL,
    "https://chatapp-frontend-rouge.vercel.app",
    "https://chatapp-frontend-nvbvomzfp-sameerkumar10-s-team.vercel.app",
  ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      
};
const SAMEER_TOKEN = "sameer-token";

export {corsOptions,SAMEER_TOKEN};