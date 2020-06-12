const express=require('express');
const app = express();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT=process.env.PORT||3000;
const mongoose = require('mongoose');
const {register, verifyToken, authenticate} = require('./controller/auth')


//Parsing Json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Moved routes to allow for json parsing
const routes=require('./routes')

//Use verifyToken middleware to secure routes
app.use('/v1', verifyToken, routes);
app.use(cors());

//Register a User
app.use('/register', register)

//Authenticate a registered User
app.use('/auth', authenticate);

// Index route should render the swagger full documentation 
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
//Database config
const db = require('./controller/keys').uri; 

//connect to database
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.listen(PORT,()=>{
    console.log(`server is up on port ${PORT} `)
})