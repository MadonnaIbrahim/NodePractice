const express= require('express');
const chalk= require('chalk');
const debug=require('debug')('app');
const morgan=require('morgan');
const path=require('path');
const PORT=process.env.PORT || 3000;
const app=express();
const productsRouter=require('./src/routers/productsRouter');
const adminRouter=require('./src/routers/adminRouter');
const authRouter=require('./src/routers/authRouter');
const bodyParser = require('body-parser');

app.use(morgan('tiny'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'/public/')));

app.use('/products',productsRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.set('views','./src/views');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{title:'home page',data:['a','b','c']});
})

app.listen(PORT, ()=>{
   debug(`listening to port ${chalk.green(PORT)}`);
});