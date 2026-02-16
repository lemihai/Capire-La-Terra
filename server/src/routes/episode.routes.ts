import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { verifyToken } from "./auth.middleware.js";

export const episodeRouter = Router();
episodeRouter.use(cors());

// --------------------------------------
// <|||||||||> Episode Routes <|||||||||>
// --------------------------------------

// GET

episodeRouter.get("/episodes", async (_req, res) => {
  try {
    // the episode variable awaits for all the objects in the collection episodes and then makes them an array.
    // Then the response is being sent to the client
    const episodes = await collections?.episodes?.find({}).toArray();
    // console.log(episodes);

    res.status(200).send(episodes);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown Error");
  }
});

// GET all posted episodes

episodeRouter.get("/postedEpisodes", async (_req, res) => {
  try {
    // the episode variable awaits for all the objects in the collection episodes and then makes them an array.
    // Then the response is being sent to the client
    const episodes = await collections?.episodes
      ?.find({ posted: true })
      .toArray();
    // console.log(episodes);

    res.status(200).send(episodes);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown Error");
  }
});

// GET : BY ID

episodeRouter.get("/episodes/:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const episode = await collections?.episodes?.findOne(query);

    if (episode) {
      res.status(200).send(episode);
    } else {
      res.status(404).send(`Failed to find an episode: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an episode: ID ${req?.params?.id}`);
  }
});

// GET : Last Episode

episodeRouter.get("/lastEpisode", async (req, res) => {
  try {
    // console.log(req);

    let highestSeason = await collections?.episodes
      ?.aggregate([{ $group: { _id: null, maxSeason: { $max: "$season" } } }])
      .toArray();
    // console.log(highestSeason);
    if (highestSeason) {
      highestSeason = highestSeason[0].maxSeason;
    }

    let highestEpisodeInSeason = await collections?.episodes
      ?.aggregate([
        { $match: { season: highestSeason } },
        { $group: { _id: null, maxEpisode: { $max: "$number" } } },
      ])
      .toArray();
    if (highestEpisodeInSeason) {
      highestEpisodeInSeason = highestEpisodeInSeason[0].maxEpisode;
    }

    const query = { season: highestSeason, number: highestEpisodeInSeason };
    const episode = await collections?.episodes?.findOne(query);

    if (episode) {
      res.status(200).send(episode);
    } else {
      res.status(404).send(`Failed to find the last episode ${episode}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find the last episode `);
  }
});

// POST
// Add one episode
episodeRouter.post("/episodes", verifyToken, async (req, res) => {
  try {
    const episode = req.body;
    const result = await collections?.episodes?.insertOne(episode);

    if (result?.acknowledged) {
      res.status(201).json({
        message: `Added a new episode: ID ${result.insertedId}`,
        success: true,
      });
    } else {
      res.status(500).json({
        message: `Failed to add an episode`,
        success: true,
      });
    }
  } catch (error) {
    // console.log(error);
    // res.status(400).json({
    //     message: error instanceof Error ? error.message : "Unknown Error",
    //     success: true,
    //   });
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown Error");
  }
});

// PUT

episodeRouter.put("/episodes/:id", verifyToken, (async (
  req: Request,
  res: Response,
) => {
  // ^^^ Cast the entire async function to RequestHandler ^^^
  try {
    const id = req?.params?.id;
    // Check if ID is a valid ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Invalid Article ID format: ${id}`,
        success: false,
      });
    }

    // The entire updated article object is in req.body
    const updatedEpisode = req.body;
    // Remove the _id from the body to prevent issues when setting the document
    delete updatedEpisode._id;

    const query = { _id: new ObjectId(id) };

    const result = await collections?.episodes?.replaceOne(
      query,
      updatedEpisode,
    );

    if (result && result.matchedCount) {
      res.status(200).json({
        message: `Successfully updated episode: ID ${id}`,
        success: true,
      });
    } else if (!result?.matchedCount) {
      res.status(404).json({
        message: `Failed to find an episode to update: ID ${id}`,
        success: false,
      });
    } else {
      res.status(304).json({
        message: `episode was found, but not modified: ID ${id}`,
        success: true,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error(message);
    res.status(500).json({
      success: false,
      message: message,
    });
  }
}) as RequestHandler);

// PATCH
episodeRouter.patch("/episodes/:id", verifyToken, (async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req?.params?.id;
    const { posted } = req.body;
    if (typeof posted !== "boolean") {
      return res.status(400).json({
        message: 'Invalid request body: "posted" must be a boolean',
        success: false,
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Invalid episode ID format: ${id}`,
        success: false,
      });
    }

    const query = { _id: new ObjectId(id) };
    const result = await collections?.episodes?.updateOne(query, {
      $set: { posted },
    });

    if (result && result.matchedCount) {
      res.status(200).json({
        message: `Updated the posted flag for episode: ID ${id}`,
        success: true,
      });
    } else if (!result?.matchedCount) {
      res.status(404).json({
        message: `Failed to find an episode: ID ${id}`,
        success: true,
      });
    } else {
      res.status(304).json({
        message: `Failed to update the episode: ID ${id}`,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}) as RequestHandler);

// DELETE

episodeRouter.delete("/episodes/:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.episodes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(200).json({
        message: `Episode ${id} has been deleted`,
        success: true,
      });
    } else if (!result) {
      res.status(400).send(`Failed to remove an episode: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    // console.log(message);
    res.status(400).send(message);
  }
});
