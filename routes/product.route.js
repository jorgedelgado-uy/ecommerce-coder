const container = require('../static.container');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    let allProducts = container.getAll();
    res.json(allProducts);
});

router.get('/:id', (req, res, next)=>{
    let product = container.getById(req.params.id);
    if (product == null)
        res.status(404).json(({error: 'Product Not Found'}));
    else   
        res.json(product);
});

router.post('/', (req, res, next)=>{
    let {tittle, price, thumbnail} = req.body;
    let product = container.save({tittle, price, thumbnail});
    res.json(product);
});

router.put('/:id', (req, res, next)=>{
    let {tittle, price, thumbnail} = req.body;
    container.modify({tittle, price, thumbnail}, req.params.id);
    res.send('Product has been changed');
});

router.delete('/:id', (req, res, next)=>{
    let products = container.delete(req.params.id);
    if (products.lengh > 0)
        res.send('Product has been deleted');
    else
        res.status(404).send('Product not found');
});

module.exports =  router;