import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database";

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

    res.status(200).send(episodes);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown Error");
  }
});

// GET : BY ID

episodeRouter.get("/episodes/:id", async (req, res) => {
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

// POST
// Add one episode
episodeRouter.post("/episodes", async (req, res) => {
  try {
    const episode = req.body;
    const result = await collections?.episodes?.insertOne(episode);

    // how to add an episode
    /*
    collection.insertOne({
        title: 'My Audio Clip',
        description: 'A short audio clip',
        audio: BinData(0, base64AudioData)
    }, (err, result) => {
        if (err) throw err;
        console.log('Audio file inserted successfully');
        client.close();
    });

  */

    if (result?.acknowledged) {
      res.status(201).send(`Added a new episode: ID ${result.insertedId}`);
    } else {
      res.status(500).send(`Failed to add an episode`);
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown Error");
  }
});

// PUT

episodeRouter.put("/episodes/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const episode = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.episodes?.updateOne(query, {
      $set: episode,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an episode: ID ${id}`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an episode: ID ${id}`);
    } else {
      res.status(304).send(`Failed to updgate and employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});

// DELETE

episodeRouter.delete("/episodes/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.episodes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an episode: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an episode: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});
