import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(galaxies);
});

router.get("/:id", (req, res) => {
  const galaxy = galaxies.find((g) => g.id == req.params.id);
  if (galaxy) {
    res.json(galaxy);
  } else {
    res.status(404);
    res.send("Galaksi tidak ditemukan.");
  }
});

export default router;
