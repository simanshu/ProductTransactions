const express = require('express');
const Routes = require('./router/index');
const {connection,connectToDatabase}=require('./config/MySql')
const PORT =8090;

const app = express();

app.use('/api', Routes);
connectToDatabase().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})

