const Session = require('../../models/sessionModel')
const { v4:uuidv4 } = require('uuid')
const createSession = async(name, ttl, sessionID)=>{
    if(!name){
        return console.log('name not provided')
    }
    if(!ttl){
        return console.log('ttl not provided')
    }
    if(!sessionID){
        return console.log('SessionID not provided')
    }
    try{
    const expires = Math.floor(Date.now() / 1000) + ttl;
    const session = new Session({
        name,
        expires,
        sessionID
    })
    
    await session.save();
    console.log(`Session for ${name} created, expires on ${expires}. Session Data ${JSON.stringify(session)} `)
    return session
}catch(error){
    console.log(`failed to create session: ${error.message}`)
}
}
module.exports = createSession;

