var express = require('express')

var app = express()

// get method to fetch data

app.get('/get', function (req, res) {
    res.send("Server Get")
})

// get method by id

app.get('/get/:id', function (req, res) {
    let id = req.params.id;
    res.send("Server Get ID: " + id)
})

// post method to insert data

app.post('/post', function (req, res) {
    let name = req.query.name;
    let email = req.query.email;
    res.send("Name: \'" + name + "\' Email: \'" + email + "\'")
})

// put method to update data

app.put('/put', function (req, res) {
    let name = req.query.name;
    let email = req.query.email;
    let id = req.query.id;
    res.send("Name: \'" + name + "\' Email: \'" + email + "\' ID: \'" + id + "\'")
})

// delete method to delete data

app.delete('/delete', function (req, res) {
    let id = req.query.id;
    res.send("Your Data is Deleted. ID: " + id)
})

// http://localhost:5000

app.listen('5000', (err) => {

    if (err) {
        console.log("something went wrong", error)
    }

})