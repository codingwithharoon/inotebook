const Note = require('../models/notes'); // Assuming your user model is properly defined
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtsecret = "hahahahbro its secert :) shhhhhh"
const fetchuser = require('../middleware/fetchuser'); // Assuming your user model is properly defined

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description,tag } = req.body; // Destructure title and description directly
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
      const newNote = {};
      
      if (req.body.title) {
        newNote.title = req.body.title;
      }
      if (req.body.description) {
        newNote.description = req.body.description;
      }
      if (req.body.tag) {
        newNote.tag = req.body.tag;
      }

      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not allowed" });
      }

       let updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

      if (!updatedNote) {
        return res.status(500).json({ error: "Failed to update note" });
      }
      res.json(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

  //Route3 Update existin


//Delete a note of login user
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not allowed" });
      }

      await Note.findByIdAndDelete(req.params.id);

      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error Deleting note:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);
module.exports = router;
