const asyncHandler=require('express-async-handler');
const Note=require('../models/noteModel')

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user: req.user._id});
  res.json(notes);
});
const createNote=asyncHandler(
    async(req,res)=>
    {
        const {title,content,category}=req.body;
        if (!title || !content || !category) {
            res.status(400);
            throw new Error("Please Fill all the feilds");
            return;
          } else {
            const note = new Note({ user: req.user._id, title, content, category });
        
            const createdNote = await note.save();
        
            res.status(201).json(createdNote);
          }

    }
)
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  
    res.json(note);
  });
  const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
  
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });
  const DeleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
   
    
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
  
    if (note){
        await note.deleteOne({ _id: req.params.id });
        res.json({ message: "Note removed successfully" });
      } else {
        console.error(error);
        res.status(404).json({ message: "Failed to delete note" });
      }
    
  }); 
module.exports ={  getNotes,createNote,getNoteById,updateNote,DeleteNote};