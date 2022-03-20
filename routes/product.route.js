const container = require('../static.container');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    let allProducts = container.getAll();
    res.json(allProducts);
});

router.get('/:id', (req, res, next)=>{
    let product = container.getById(req.params.id);
    if (product.length == 0)
        res.status(404).json(({error: 'Product Not Found'}));
    else   
        res.json(product);
});

router.post('/', (req, res, next)=>{
    let {title, price, thumbnail} = req.body;
    if (!title || !price || !thumbnail){
        throw new Error("Los datos no con correctos")
    }
    let product = container.save({title, price, thumbnail});
    res.json(product);
});

router.put('/:id', (req, res, next)=>{
    let {title, price, thumbnail} = req.body;
    let response = container.modify({title, price, thumbnail}, req.params.id);
    res.send(response);
});

router.delete('/:id', (req, res, next)=>{
    let products = container.delete(req.params.id);
    if (products != undefined)
        res.send('Product has been deleted');
    else
        res.status(404).send('Product not found');
});

module.exports =  router;