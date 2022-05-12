const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(object) {
        let id = 1
        let data
        try {
            data = await fs.promises.readFile(this.fileName)
            data = JSON.parse(data)
        } catch(err) {
            console.error(`save: Hubo un error (${err}).`)
            data = []
        }
        if (data[data.length - 1]) {
            id = data[data.length - 1].id + 1
        }
        object.id = id
        data.push(object)
        fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2))

        return object.id
    }

    async getById(id) {
        let data
        try {
            data = await fs.promises.readFile(this.fileName)
            data = JSON.parse(data)
        } catch(err) {
            console.error(`getById: Hubo un error (${err}).`)
            data = []
        }

        return data.find(item => item.id === id)
    }

    async getAll() {
        let data
        try {
            data = await fs.promises.readFile(this.fileName)
            data = JSON.parse(data)
        } catch (err) {
            console.error(`getAll: Hubo un error (${err}).`)
            data = []
        }
        return data
    }

    async deleteById(id) {
        let data
        try {
            data = await fs.promises.readFile(this.fileName)
            data = JSON.parse(data)
            let targetIndex = data.findIndex(item => item.id === id)
            data.splice(targetIndex, 1)
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2))
            console.log('Datos eliminados')
        } catch(err) {
            console.error(`deleteById: Hubo un error (${err}).`)
            data = []
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, '')
            console.log('Todos los datos eliminados')
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports = Contenedor

// const productos = new Contenedor('./productos.txt')

// const producto1 = {
//     title: 'Joystick',
//     price: 1000,
//     thumbnail: 'https://m.media-amazon.com/images/I/41zsSwW7nnL._AC_.jpg'
// }

// const producto2 = {
//     title: 'Auriculares',
//     price: 800,
//     thumbnail: 'https://cf.shopee.com.ar/file/ff61886300b3e9e2dfe2b1005bfd07fe'
// }

// async function prueba() {
//     // await productos.save(producto1)
//     // await productos.save(producto2)

//     // let itemPrueba = await productos.getById(3)
//     // console.log(itemPrueba)

//     let itemsPrueba = await productos.getAll()
//     console.log(itemsPrueba)

//     // await productos.deleteById(1)
//     // await productos.deleteAll()
// }

// prueba()