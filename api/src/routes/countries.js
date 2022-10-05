const {Router}= require('express');
const { Country } = require('../db.js');
const router = Router();
const axios = require('axios');

const axiosHandler = async function (){
    try{
        const axi = await axios.get('https://restcountries.com/v3/all')
        const paises = axi.data;
        const pais = [];
        paises.map(function (e) {
            pais.push({ky: e.cca3, name: e.name.common, img: e.flags[1], continent: typeof e.continents === 'object' ? e.continents[0] : e.contintents, capital: e.capital ? typeof e.capital === 'object' ? e.capital[0] : e.capital : 'No tiene capital', subregion: e.subregion, area: e.area, population: e.population})
        })
        for(let i = 0; i < pais.length; i++){
            await Country.create(pais[i]);
        }
    }catch(e){
        console.log(e);
    }
}

router.get('/countries', async function(req, res){
    const countr = req.query
    const check = await Country.findAll();
    if(check.length === 0){
        await axiosHandler();
    }
    if(Object.entries(countr).length === 0){
        try{
            const paises = await Country.findAll();
            if(paises.length === 0){
                res.send('No hay paises disponibles')
            } else {
                res.send(paises)
            }
        }catch(e){
            res.send('Error: ' + e);
        }
    } else {
        try{
            const pais = await Country.findOne({where: {name: countr.name}})
            if(!pais){
                res.send([{err: 'No se encontró'}])
            } else {
                res.send(pais);
            }
        }catch(e){
            res.send('Error: ' + e)
        }
    }
})

router.get('/countries/:id', async function(req, res){
    const { id } = req.params;
    console.log(id);
    try{
        const country = await Country.findOne({where: {ky: id}});
        console.log(country)
        if(country == null){
            res.send('No se encontró el país')
        } else {
            res.send(country);
        }
    }catch(e){
        res.send(e)
    }
})

module.exports = router;