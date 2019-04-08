const request = require('request')

const metRequest = function(param, callback) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${param}`
    request({url, json: true}, function(error, res) {
        if (error) {
            callback({"error": "No hay conexion."}, undefined)
        } else if ( res.body.Response == 'False' ) {
            callback({"error": "No hay respuesta."}, undefined)
        } else {
            if (res.body.total == 0) {
                callback({"error": "El total de elementos es 0."}, undefined)
            } else {
                let obj = {"id": res.body.objectIDs[0]}
                callback(undefined, obj)
            }
        }
    })
}

const objectRequest = function(objectID, callback) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    request({url, json: true}, function(error, res) {
        if (error) {
            callback({"error": "No hay conexion."}, undefined)
        } else if ( res.body.Response == 'False' ) {
            callback({"error": "No hay respuesta."}, undefined)
        } else {
            let result = {
                artist: res.body.constituents[0].name,
                title: res.body.title,
                year: res.body.objectEndDate,
                technique: res.body.medium,
                metUrl: res.body.objectURL,
            }
            callback(undefined, result)
        }
    })
}

module.exports = {
    metRequest:metRequest,
    objectRequest:objectRequest
}