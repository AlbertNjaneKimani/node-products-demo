const client = require('./connection.js')
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
client.connect();
app.get('/products', (req, res) => {
    client.query(`Select * from products`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/products/:id', (req, res) => {
    client.query(`Select * from products where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/products', (req, res) => {
    const product = req.body;
    let insertQuery = `INSERT INTO public.products(
        id, "Name", "Price", "Description", "Category")
                       values(${product.id}, '${product.name}', '${product.Price}',
                        '${product.Description}','${product.Category}')
                        
                        `


    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log("application running on port" + port);
