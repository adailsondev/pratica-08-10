import { Router } from "express";
//OLHAR COMO FAZE A IMPORTACAO
const route=Router();

route.get('/sistema',(req,res)=>
{
    res.send("foi");
    //console.log('foi');
});



export default route;