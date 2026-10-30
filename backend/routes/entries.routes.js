const router = require("express").Router();
const verifyToken=require('../middleware/verifyToken')
const Entry=require('../models/Entry')

router.post('/',verifyToken,async(req,res)=>{
    try{
        const newEntry=await Entry.create({
            title:req.body.title,
            entryBody:req.body.entryBody,
            isPublic:req.body.isPublic,
            owner:req.user._id
        })
        res.status(201).json(newEntry)

    }
    catch(err){
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const entries = await Entry.find({ isPublic: true })

        res.status(200).json(entries)

    }catch (err) {
        console.log(err)
    }
})

router.get("/my-entries", verifyToken, async (req, res) => {
    try {
        const entries = await Entry.find({owner: req.user._id})

        res.status(200).json(entries)

    } catch (err) {
        console.log(err)
    }
})


router.put('/:entryId',async(req,res)=>{
    try{
        const entry= await Entry.findByIdAndUpdate(req.params.entryId,req.body,{new:true})
        res.json(entry)
    }
    
    catch(err){
        console.log(err)
    }

})

router.delete('/:entryId',async(req,res)=>{
    try{
        const entry= await Entry.findByIdAndDelete(req.params.entryId)
        res.json(entry)
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router;

