import { Router } from "express";

// Import the routers
import { episodeRouter } from "./routes/episode.routes.js";
import { articleRouter } from "./routes/article.routes.js";
import { newsWebsitesRouter } from "./routes/news.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { logInRouter } from "./routes/auth.js";

// Initializing the global router
// also making the main router use all of the other routers.
// Later: make them

export const router = Router();
router.use("/", logInRouter)
router.use("/", articleRouter);
router.use("/scrape", articleRouter);
router.use("/", episodeRouter);
router.use("/", newsWebsitesRouter);
router.use("/", userRouter);

// secure the user's access. allow the people to access all the episodes. but keep the news, articles and episodes writing behind the user's login
