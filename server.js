const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (request, response) => {  /*võtab vastu päringu ning on valmis vastama */
    response.render('index', {resultToRender:''});  /*indeks faili väljastamine kasutajale*/
});

app.post('/bmi', (request, response) => {   /*andmete mahalugemine ja arvutamine*/
    let height = Number(request.body.height)/100;
    let weight = Number(request.body.weight);
    let bmi = (weight/(height*height)).toFixed(2);
    let userResult = '';

    if (bmi < 19) {
        userResult = 'alakaal';
    }
    else if (bmi >= 19 && bmi <= 24.9){
        userResult = 'normaalkaal';
    }
    else if (bmi >= 25 && bmi <= 29.9){
        userResult = 'ylekaal';
    }
    else {
        userResult = 'rasvumine';
    }

    let result = { /*salvestab tulemused muutujatesse */
        userBMI: bmi,
        result: userResult
    }

    response.render('index', {resultToRender: result});

});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running ${port}.`)
});
