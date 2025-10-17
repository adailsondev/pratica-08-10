import { Router } from "express";
import {cart} from "./carrinho";// ./acessa a mesma pasta, carrinho simula um banco de dados

const route=Router();

route.get('/nome',(req,res)=>
{
    res.send("adailson");
});

route.get('/2recebenumero/:numero',(req,res)=>
{
    //dessa forma pego na url asssim:http://localhost:3000/2recebenumero/9,porque temos o params
    const numero=parseInt(req.params.numero);
    res.send(numero*2);
});

//4 questao 
route.get('/pares',(req,res)=>
{
    //dessa froma nao pego na url asssim: ?numero=valor
    const numero=Number(req.query.numero);
    let valor=[];
    for(let i=0; i<=numero; i++)
    {
        if(i%2==0)
        {
            valor.push(i);
        }    
    }    
    res.send(valor);
});  

//5 questao
route.get('/conversao',(req,res)=>
{
    //dessa froma nao pego na url asssim: http://localhost:3000/conversao?numero=10,porque temos o query
    const numero=Number(req.query.numero);
    res.send(numero*5.2);
});



//2 forma de pegar valor get:http://localhost:3000/2recebenumero?valor=9
route.get('/2recebenumero',(req,res)=>
{
    //dessa froma nao pego na url asssim: ?nome=valor
    const numero=Number(req.query.valor);
    res.send(numero*2);
});

route.get('/2recebenumero',(req,res)=>
{
    //dessa froma nao pego na url asssim: ?nome=valor
    const numero=Number(req.query.valor);
    res.send(numero*2);
});


//3 questao
route.post('/primo',(req,res)=>
{
    
    const numero2=req.body.numero;
     let teste=0;

     //console.log("consulta em rota primo");

    for(let i=1; i<=numero2; i++)
     {
        if(numero2%i==0)
        {
             teste++;
        }    
     }    
     if(teste>2)
     {
        res.send("nao é primo");
         //console.log("nao é primo");
     }    
    else
     {
        res.send("é primo");
        //
         //console.log("é primo");
     }    

    //console.log(numero2);
});

//7 questao
    // Faça um endpoint que receba um JSON de um carrinho de compras e retorne o total
    // da compra.
route.post('/carrinho',(req,res)=>
{
    const dados=req.body.items;//acessando o array de objeto
    //maneira de pegar cada valor do json
        const valor1=dados[0].valor;
        const valor2=dados[1].valor;
        const nome1=dados[0].nome;
        const nome2=dados[1].nome;
    
    //calculando o valor total de itens no array com reduce
    const total=dados.reduce((soma: any,item: { valor: any; })=>soma+item.valor,0);
    res.send(total);
});

//QUESTOES COM O CARRINHO

//9->deletar um item do carrinho pelo ID.
route.delete('/carrinho/:indice', (req, res) => 
{
    const id = Number(req.params.indice);
    const itensAntes = cart.itens.length;
    //console.log(itensAntes);
    
    cart.itens = cart.itens.filter(item => item.id !== id);
    
    if (cart.itens.length < itensAntes) 
    {
        res.send({ message: "Item deletado com sucesso",itensRestantes: cart.itens.length });
    } 
    else 
    {
        res.status(404).send({ message: "Item não encontrado" });
    }
});

//10->adicione um endpoint post que permita adicionar um item ao carrinho.
route.post('/adicionaitem',(req,res)=>
{
    const novoItem=req.body;
    console.log(novoItem);
    cart.itens.push(novoItem);
    res.send(cart);
});

//12->Crie um endpoint get que traga a lista de itens do carrinho.
    //simulando acesso a um banco de dados
route.get('/todositens',(req,res)=>
{
    res.send(cart);
});

//13 item mais caro do carrinho
route.get('/itemmaiscaro',(req,res)=>
{
    //res.send(cart);
    //usando reduce pra pegar o maior valor do array
    const maiscaro=cart.itens.reduce((anterior,atual)=>(anterior.preco>atual.preco)?anterior:atual);
    res.send(maiscaro);
});

//14 item mais barato do carrinho
route.get('/itemmaisbarato',(req,res)=>
{
    //res.send(cart);
    //usando reduce pra pegar o maior valor do array
    const maiscaro=cart.itens.reduce((anterior,atual)=>(anterior.preco<atual.preco)?anterior:atual);
    res.send(maiscaro);
});

//15->Crie um endpoint que retorne um item do carrinho pelo ID.
route.get('/item',(req,res)=>
{
    const id=Number(req.query.id);//converte o id pego na url para number
    const item=cart.itens.find((item)=>item.id===id);//find procura o item que tenha o id igual ao id pego na url

    //se item existir retorna o item, senao retorna a mensagem de erro 404
    if(item)
    {
        res.send(item);
    }
    else
    {
        res.status(404).send({message:"Item não encontrado"});
    }
});

//16->buscar item pelo nome
route.get('/buscanome',(req,res)=>
{
    const nome=(req.query.nome);//converte o id pego na url para number
    const item=cart.itens.find((item)=>item.nome===nome);//find procura o item que tenha o id igual ao id pego na url

    //se item existir retorna o item, senao retorna a mensagem de erro 404
    if(item)
    {
        res.send(item);
    }
    else
    {
        res.status(404).send({message:"Item não encontrado"});
    }
});

//17->atualizar o item do carrinho pelo ID.
route.put('/atualizaitem',(req,res)=>
{
    const id=Number(req.query.id);//converte o id pego na url para number
    //console.log(typeof(id));
    const itemIndex=cart.itens.findIndex((item)=>item.id===id);//findIndex procura o index do item que tenha o id igual ao id pego na url
    console.log(itemIndex);
     if(itemIndex!==-1)
     {
         const itemAtualizado={...cart.itens[itemIndex],...req.body};
         cart.itens[itemIndex]=itemAtualizado;
         res.send(itemAtualizado);
     }
     else
     {
         res.status(404).send({message:"Item não encontrado"});
     }
});

export default route; //tem que exporta a constante pra ficar visivel nos outros codigos

