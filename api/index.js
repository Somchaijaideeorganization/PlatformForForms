// server.ts
import express from "express";
import { getXataClient } from "./xata.js";
import cors from "cors";

const xata = getXataClient();

const app = express();

app.use(express.json({ limit: "250kb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h3>Hello World! This is API of Vyrnal </h3><hr/>`);
});

app.get("/getForms/all", async (req, res) => {
  const records = await xata.db.Forms.getMany();
  res.json(records);
});

app.get("/getForms/byID", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ error: "ID is required in request" });

    const record = await xata.db.Forms.read(id);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/getForms/randomly", async (req, res) => {
  try {
    const { selectedIDs, limit } = req.body;

    if (!limit) {
      return res.status(400).json({ error: "Limit are required" });
    }

    const rawRecords = await xata.db.Forms.getPaginated({
      select: ["id", "author", "data"],
      filter: { id: { $not: { $any: selectedIDs || [] } } },
      sort: { "*": "random" },
      pagination: { size: parseInt(limit) },
    });

    res.status(200).json(rawRecords.records);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/getForms/byAuthor", async (req, res) => {
  try {
    const { author } = req.query;
    if (!author)
      return res.status(400).json({ error: "Author is required in request" });

    const rawRecords = await xata.db.Forms.getPaginated({
      filter: {
        author: author,
      },
      select: ["id", "author", "data"],
    });

    res.status(200).json(rawRecords.records);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/addForm", async (req, res) => {
  try {
    const { author, data, tags } = req.body;

    // Validate input
    if (!author || !data) {
      return res
        .status(400)
        .json({ error: "Missing author or data in request" });
    }

    const record = await xata.db.Forms.create({
      author,
      data,
      tags,
    });

    res.status(201).json({ message: "User added successfully", record });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/deleteForm", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ error: "ID is required in request" });

    const record = await xata.db.Forms.delete(id);

    res.status(200).json({ message: "Form deleted successfully", record });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default app;
