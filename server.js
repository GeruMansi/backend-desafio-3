const express = require('express')
const Contenedor = require('./index')

const productos = new Contenedor('./productos.txt')

const app = express()

app.get('/productos', async (req, res) => {
    let listaProductos = await productos.getAll().then(res => res)
    res.send(listaProductos)
})

app.get('/productoRandom', async (req, res) => {
    let listaProductos = await productos.getAll().then(res => res)
    let productoRandom = listaProductos[Math.floor(Math.random() * listaProductos.length)]
    res.send(productoRandom)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})