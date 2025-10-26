import { Router } from "express";
import {cart} from "./carrinho";// ./acessa a mesma pasta, carrinho simula um banco de dados

const route=Router();

//1) Faça um endpoint com método get que retorne seu nome.
    route.get('/nome',(req,res)=>
    {
        res.send("adailson");
    });

//2) Faça um endpoint com método get que receba um número e retorne seu valor dobrado.
    route.get('/valordobrado/:numero',(req,res)=>
    {
        const numero=parseInt(req.params.numero);
        res.send(numero*2);
    });

//3) Faça um endpoint com método post que receba um número por body e retorne se ele é primo ou não.
    route.post('/primo',(req,res)=>
    {
        
        const numero2=req.body.numero;
        let teste=0;

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

//4) Faça um endpoint com método get que receba um número por params e retorne todos os números pares até ele
    route.get('/pares',(req,res)=>
    {
        //dessa forma  pego na url asssim: ?numero=valor
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

//5) Faça um endpoint que receba um valor em dólar e retorne seu valor em real.
    route.get('/dolarreal',(req,res)=>
    {
        //dessa froma nao pego na url asssim: http://localhost:3000/conversao?numero=10,porque temos o query
        const numero=Number(req.query.numero);
        res.send(numero*5.39);
    });

//6) Faça um endpoint que receba um valor em celsius e retorne em fahrenheit.
    route.get('/celsiusfahrenheit',(req,res)=>
    {
        const numero=Number(req.query.numero);
        res.send((numero*9/5)+32);
    });

//7 questao Faça um endpoint que receba um JSON de um carrinho de compras e retorne o totalda compra.
//o json vem do postman que esta no exercicio 7
    route.post('/carrinho',(req,res)=>
    {
        const dados=req.body.items;//acessando o array de objetos dentro do json recebido

        //calculando o valor total de itens no array com reduce
        const total=dados.reduce((soma: any,item: { valor: any; })=>soma+item.valor,0);
        res.send(total);
    });

                            //QUESTOES COM O CARRINHO

//9) Crie um endpoint delete que remova um produto do carrinho pelo ID.
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
            res.send({ message: "Item não encontrado" });
        }
    });

//10)Crie um endpoint post que adicione um item ao carrinho.
    route.post('/carrinhoadd',(req,res)=>
    {
        const novoItem=req.body;
        cart.itens.push(novoItem);
        res.send(cart);
    });

//11)Crie um endpoint put que atualize um item do carrinho pelo ID.
    route.put('/carrinho/:id',(req,res)=>
    {
        const id=Number(req.params.id);
        const itemIndex=cart.itens.findIndex((item)=>item.id===id);//findIndex procura o index do item que tenha o id igual ao id pego na url

        if(itemIndex!==-1)
        {
            //preciso pegar o objeto em json e atualizar com os novos dados de forma mais legivel item por item
            const itemAtualizado={...cart.itens[itemIndex],...req.body};
            cart.itens[itemIndex]=itemAtualizado;
            res.send(itemAtualizado);
        }
        else
        {
            res.send({message:"Item não encontrado"});
        }
    });

//12)Crie um endpoint get que traga a lista de itens do carrinho.
    route.get('/todositens',(req,res)=>
    {
        res.send(cart);
    });

//13)Crie um endpoint que retorne o item mais caro da lista.
    route.get('/maiscaro',(req,res)=>
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

//15)Crie um endpoint que retorne um item do carrinho pelo ID.
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

//16)Crie um endpoint que faça uma busca no carrinho pelo nome.
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

export default route; //tem que exporta a constante pra ficar visivel nos outros codigos

