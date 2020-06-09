const express=require('express');
const app = express();
const routes=require('./routes')

const PORT=3000;

app.use(routes);


app.listen(process.env.PORT||PORT,()=>{
    console.log(`server is up on port ${PORT} `)
})