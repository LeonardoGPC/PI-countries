const { Router } = require('express');
const countries = require('./countries.js');
const { Activity, Country } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', countries);

router.get('/cxa', async function(req, res){
    try{
        const cxa = await Country.findAll({
        include: Activity
        })
        res.json(cxa)
    }catch(e){
        res.json(e);
    }
})

router.get('/cxa/:key', async function(req, res){
    const { key } = req.params;
    const all = await Country.findOne({
        where: {ky: key},
        include: Activity
    })
    res.json(all);
})

router.get('/getActivities', async function(req, res){
    try{
        const activities = await Activity.findAll()
        res.json(activities);
    }catch(e){
        res.json(e);
    }
})

router.post('/activities', async function(req, res){
    const { name, difficult, duration, season, countries} = req.body;
    try{
        const newActivity = await Activity.create({name, difficult, duration, season});
        const activity = await Activity.findOne({where: {name: name}});
        await activity.addCountry(countries);
        res.json(newActivity);
    }catch(e){  
        res.json({});
    }
})

//Falta conectar las dos tablas

module.exports = router;
