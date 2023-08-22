import express from "express";
import conn from "../db.js";

const router = express.Router();

// simpan semua
router.post("/all", async (_req, res) => {
  for await (const planet of planets) {
    const prepare = await conn.prepare(
      "INSERT INTO planets (name, diameter, description) VALUES (?, ?, ?)"
    );
    await prepare.execute([planet.name, planet.diameter, planet.description]);
  }
  res.send("Semua planet berhasil disimpan.");
});

// tampilkan semua
router.get("/", async (_req, res) => {
  const planets = await conn.query("SELECT * FROM planets");
  res.json(planets);
});

// tampilkan satu berdasarkan ID
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM planets WHERE id = ?");
  const planet = (await prepare.execute([req.params.id]))[0];
  res.json(planet);
});

// buat
router.post("/", async (req, res) => {
  try {
    const prepare = await conn.prepare(
      "INSERT INTO planets (name, diameter, description) VALUES (?, ?, ?)"
    );
    await prepare.execute([
      req.body.name,
      req.body.diameter,
      req.body.description,
    ]);
    res.send("Planet berhasil disimpan.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// edit
router.put("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare(
      "UPDATE planets SET name = ?, diameter = ?, description = ? WHERE id = ?"
    );
    await prepare.execute([
      req.body.name,
      req.body.diameter,
      req.body.description,
      req.params.id,
    ]);
    res.send("Planet berhasil disimpan.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// hapus berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare("DELETE FROM planets WHERE id = ?");
    await prepare.execute([req.params.id]);
    res.send("Planet berhasil dihapus.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// hapus semua

export default router;
