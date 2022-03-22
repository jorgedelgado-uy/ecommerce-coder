const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const container = require('./static.container');
const { render } = require('express/lib/response');

//PUG
const pug = require('pug');

//EJS
const ejs = require('ejs');

//Global variables
app.set('port', process.env.port || 8080);
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//PUG
//app.set('view engine', 'pug');

//EJS
//app.set('view engine', 'ejs');

//Routes
app.use('/api/products', require('./routes/product.route'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), error =>{
    if (error)
        throw new Error(`${error.message}`);
    else
        console.log(`Listening through port ${app.get('port')}`);
});

//noREST routes
app.get('/', (req, res, next)=>{
    res.render('register');
});

app.get('/products', (req, res, next)=> {
    let products = container.getAll();
    if (products.length > 0)
        res.render('products', {products});
    else
        res.render('products', {error: 'No items available'});
})

app.post('/products', (req, res, next)=>{
    let {title, price, thumbnail} = req.body;
    if (!title || !price || !thumbnail){
        let error = "All field must be completed";
        res.render('register', {error, title, price, thumbnail});
    }
    else {
        container.save({title, price, thumbnail});
        res.render('register');
    }   
});