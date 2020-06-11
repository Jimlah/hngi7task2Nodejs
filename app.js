const express=require('express');
const app = express();
const routes=require('./routes')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT=process.env.PORT||3000;
app.use(cors())
app.use('/v1', routes);

// Index route should render the swagger full documentation 
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT,()=>{
    console.log(`server is up on port ${PORT} `)
})