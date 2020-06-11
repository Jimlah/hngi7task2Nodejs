const express=require('express');
const app = express();
const routes=require('./routes')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT=process.env.PORT||3000;
app.use(cors())
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Send swagger documentation as json
app.use('/v1/documentation', (_, res) => res.send(swaggerDocument));

app.listen(PORT,()=>{
    console.log(`server is up on port ${PORT} `)
})