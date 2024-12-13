const newNote = require('../../models/notesModel')
const createNote = async (req, res)=>{

    const noteData = req.body
    if(noteData.length === 0){
        console.log("Empty Note")
        return res.status(404).json({
            success:false,
            error:"Unable to save empty note"
        })
    }
    
    try{
        const createdNote = await newNote.create({
            title:noteData.title,
            note:noteData.note,
            belongsTo:noteData.belongsTo,
            createdOn:noteData.createdOn,
            at:noteData.at
        })
        await createdNote.save()
        
        console.log(createdNote)
        return res.status(200).json({
            success:true,
            message:"Note Created",
            data:noteData
        })

    }catch(err){
        console.error(err.message)
        return res.status(500).json({
            success:false,
            message:err.message
        })}
}

const getAllNotes = async (req, res) => {
    // Extract user from query params
    const user = req.params.user; 
    console.log(`User in session: ${user}`);
  
    if (!user) {
      console.log("No user in session");
      return res.status(404).json({
        success: false,
        message: "User not found in session",
      });
    }
  
    try {
      const userNotes = await newNote.scan("belongsTo").eq(user).exec();
  
      if (!userNotes || userNotes.length === 0) {
        console.log(`No notes found for user: ${user}`);
        return res.status(404).json({
          success: false,
          message: `No notes found for user ${user}`,
        });
      }
  
      console.log(`User Notes: ${JSON.stringify(userNotes)}`);
      return res.status(200).json({
        success: true,
        notes: userNotes,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };
  
module.exports = {
    createNote,
    getAllNotes
}