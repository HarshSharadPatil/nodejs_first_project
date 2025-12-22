 const { count } = require('console');
const express= require('express');
 const fs =require('fs');
const { join } = require('path');
 const app =express();
 const PORT= process.env.PORT  ||  3000;
 const dataFilePath=join(__dirname,'data','animal.data.json');


 const getdata=()=>{
    try {
        
    } catch (error) {
        console.error("error reading animal data=",error);
        return [];
    }
 };


 app.use(express.json);

  app.get('/api/animals',(req,res)=>{
    const animal = getdata();
    res.json({
        success:true,
        count:animal.length,
        data:animal
    });
  });

  app.get('/api/animals/:id',(req,res) =>{
    const animal=getdata();
    const id=parseInt(req.params.id);
    const animals=animal.find(a =>a.id === id);
    if (!animals){
      return  res.status(404).json({
            success:false,
            Message:"animal is not fount"

        });
    }
    res.json({
       success:true,
       data:animals
    });

    app.get('/api/animals/search',(req,res)=>{
        const {name}=req.query;
        if (!name) {
            return res.status(404).json({success:false,Message:"plize provide  name "});
        }
        const animal= getdata();
        const filterdata=animal.filter(a => a.name.toLowerCase().include(name.toLowerCase));
      
          res.json({
            success:true,
            count: filterdata.length,
            data: filterdata
          });


        

    });



    app.get('/', (req, res) => {
  res.send('<h1>Animal API is running! 🚀</h1><p>Try: <a href="/api/animals">/api/animals</a></p>');
});







        app.listen(PORT,()=>{
            console.log('server is running in this port ',PORT)
        });
                 
  });