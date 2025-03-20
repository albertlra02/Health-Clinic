const express = require('express');
const app = express();
const port = 3000;
const indexRouter=require('./routes/indexRouter.js');

//Aviso de que voy a usar la carpeta public para archivos estaticos
app.use(express.static('public'));

//Carpeta views para vistas y ejs para motor de plantillas
app.set('views', 'views');
app.set('view engine', 'ejs');

//Carpeta routes
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});