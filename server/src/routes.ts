import { Router } from "express";

// Import the routers
import { episodeRouter } from "./routes/episode.routes.js";
import { newsRouter } from "./routes/news.routes.js";
import { newsWebsitesRouter } from "./routes/newsWebsites.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { logInRouter } from "./routes/auth.js";
import { articlesRouter } from "./routes/articles.js";

// Initializing the global router
// also making the main router use all of the other routers.
// Later: make them

export const router = Router();
router.use("/api", logInRouter);
router.use("/api", newsRouter);
router.use("/api", articlesRouter);
router.use("/api/scrape", newsRouter);
router.use("/api", episodeRouter);
router.use("/api", newsWebsitesRouter);
router.use("/api", userRouter);

// secure the user's access. allow the people to access all the episodes. but keep the news, articles and episodes writing behind the user's login
