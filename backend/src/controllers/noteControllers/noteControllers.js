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
module.exports = {
    createNote
}