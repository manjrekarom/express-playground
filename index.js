const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials/');

//middleware
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let date = new Date().toString();
    console.log(`${date} ${req.method} ${req.url}`);
    let data = `${date} ${req.method} ${req.url} \n`;
    fs.appendFile('server-log.txt', data, (err)=>{
        if(err)
            throw err;
        console.log('Log saved');
    });
    next();
});



hbs.registerHelper('getCurrentYear', ()=>{
    return 'Copyright ' + new Date().getFullYear();
});

hbs.registerHelper('capitalise', (text)=>{
    return text.toUpperCase();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance',
//     });
//     next();
// });

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to hbs tutorial!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad request!'
    });
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.listen(3000, ()=>{
    console.log('App running on port:3000');
});