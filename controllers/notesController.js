import Note from "../models/Notes.js";

const getAllNotes = async (req, res) => {
  const { name, type } = req.query;
  let note;

  if (name) {
    note = await Note.find({
      name: { $regex: name, $options: "i" },
    }).sort("name");
  } else if (type) {
    note = await Note.find({
      type,
    }).sort("type");
  } else {
    note = await Note.find({}).sort("createAt");
  }

  res.status(200).json(note);
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ _id: id });
  if (!note) {
    return res.status(404).json({ msg: `No note with id: ${id}.` });
  }
  res.status(200).json(note);
};

const addNote = async (req, res) => {
  const { name, type, country, age, description, rating } = req.body;
  const note = await Note.create({
    name,
    type,
    country,
    age,
    description,
    rating,
    author: req.session.user.id,
  });
  res.status(201).json(note);
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ _id: id });
  if (!note) {
    return res.status(404).json({ msg: `No note with id: ${id}.` });
  }
  if (note.author.toString() !== req.session.user.id) {
    return res.status(401).json({ msg: "You cannot edit this note" });
  }

  await Note.findOneAndUpdate({ _id: id }, req.body);
  res.status(201).json({ msg: "The note has been updated." });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ _id: id });

  if (!note) {
    return res.status(404).json({ msg: `No note with id: ${id}.` });
  }

  if (note.author.toString() !== req.session.user.id) {
    return res.status(401).json({ msg: "You cannot delete this note." });
  }

  await Note.findOneAndDelete({ _id: id });
  res.status(204).json({ msg: `Note with id: ${id} has been deleted.` });
};

export { getAllNotes, getSingleNote, addNote, updateNote, deleteNote };
