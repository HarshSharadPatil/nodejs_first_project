 const { count } = require('console');
const express= require('express');
const fs =require('fs');
const { join } = require('path');
const app =express();
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 3000;
const dataFilePath = join(__dirname,'data','animal.data.json');

const getdata=()=>{
    try {
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (error) {
        console.error("error reading animal data=",error);
        return [];
    }
};


app.use(express.json());

app.get('/api/animals',(req,res)=>{
    const animals = getdata();
    res.json({
        success:true,
        count:animals.length,
        data:animals
    });
});

app.get('/api/animals/:id',(req,res) =>{
    const animals=getdata();
    const id=parseInt(req.params.id);
    const animal=animals.find(a =>a.id === id);
    if (!animal){
        return  res.status(404).json({
            success:false,
            Message:"animal is not found"
        });
    }
    res.json({
        success:true,
        data:animal
    });
});

app.get('/api/animals/search',(req,res)=>{
    const {name}=req.query;
    if (!name) {
        return res.status(400).json({success:false,Message:"please provide a name"});
    }
    const animals= getdata();
    const filteredData=animals.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));

    res.json({
        success:true,
        count: filteredData.length,
        data: filteredData
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Animal API is running! 🚀</h1><p>Try: <a href="/api/animals">/api/animals</a></p>');
});

app.listen(PORT,()=>{
    console.log('server is running on port',PORT)
});