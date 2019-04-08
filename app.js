const express = require('express')
const met = require('./met.js')
const app = express()

const port = process.env.PORT || 3000

app.get('/students/:id', function(req, res) {
    if (req.params.id == "A01020690") {
        res.send({
            "id": req.params.id,
            "fullname": "Ariel Mendez Santillan",
            "nickname": "Artie",
            "age": 22
        });
    } else {
        res.send({
            "error": "La matricula es incorrecta."
        })
    }
})

app.get('/met', function(req, res) {
    if( !req.query.search ) {
        return res.send({
          error: 'Definir query search.'
        })
    }
    met.metRequest(req.query.search, function(error, response) {
        if (error) {
            return res.send(error)
        }
        met.objectRequest(response.id, function(error, response) {
            if (error) {
                return res.send(error)
            }
            response.searchTerm = req.query.search
            res.send(response)
        })
    })
})

app.get('*', function(req, res) {
    res.send({
      error: 'Esta ruta no existe.'
    })
  })

app.listen(port, function() {
    console.log('up and running')
})