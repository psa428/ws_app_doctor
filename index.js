const express = require('express');
// const chalk = require('chalk');const path = require('path');
const { addAppointment, loginUser , getAppointments, getAppointmentsPage} = require('./appointment.controller');

const LIMIT_STR = 3;
let cntRecords = 0;


// ветка edit
const port = 3000;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { title } = require('process');


app.set('views', 'pages');
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({
    extended:   true
}));

app.use(express.json());

//  Login
app.get('/login', function(req, res){
    res.render('login', {
        title:  'Login',
        error:  false
    })
});

app.post('/login', async (req, res) => {
    try {
        
        await loginUser(req.body.email, req.body.password)

        res.redirect('/applst');
    } catch (e) {
        res.render('login', {
            title:  'Login',
            error:  e.message
        })
    }
})

    //  Запись к врачу

app.get('/', async (req, res) => {
    
    
    res.render('index', {
        title:  'Запись к врачу',
        // notes:  await getNotes(), 
        created:    false,
        error:  false
    })
});

app.post('/', async (req, res) => {
    
    try {
        await addAppointment(req.body.name, req.body.phone, req.body.problem);
        // res.sendFile(path.join(basePath, 'index.html'));  
        res.render('index', {
            title:  'Запись к врачу',
            created:    true,
            error:  false
        })
       
        
    } catch(e) {
        console.error('Creation error', e);
        res.render('index', {
            title:  'Запись к врачу',
            // notes: await getNotes(),
            created:    false,
            error:    true
        })
    }
    
})

    //  Таблица заявок

app.get('/applst', async(req, res) => {
    let arr = await getAppointments();
    cntRecords = arr.length;
    res.render('applst', {
        title:  'Перечень заявок',
        appointments:  arr,
        currpage:   1,
        limit:  LIMIT_STR,
        cntRecords: cntRecords,
        error:  false
    })
    
});

    // Таблица заявок. Пагинация
    app.get('/applst/:numpage/:limit', async(req, res) => {
        let param1 = req.params.numpage;
        let param2 = req.params.limit;
        let numpage = Number(param1);
        let limit = Number(param2);
        
        
        res.render('applst', {
            title:  'Перечень заявок',
            appointments:  await getAppointmentsPage(numpage, limit),
            currpage:  numpage,
            limit:  LIMIT_STR,
            cntRecords: cntRecords,
            error:  false
        })
        
    });


mongoose.connect(
    'mongodb+srv://andrewsitnikov428:chuck_428@cluster0.wrudc.mongodb.net/appointment?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
    
    app.listen(port, () => {   
        console.log(`Server has been started on port ${port}... `);
    })
});

