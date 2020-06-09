const express=require('express');
const app = express();
const routes=require('./routes')
const cors = require('cors')
const PORT=3000;
app.use(cors())
app.use(routes);







app.listen(process.env.PORT|PORT,()=>{
    console.log(`server is up on port ${PORT} `)
})