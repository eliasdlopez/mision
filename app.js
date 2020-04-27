const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mision', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', function(error) {
    console.error(error);
});

const UserSchema = new mongoose.Schema({
    user: {type: String},
    email: {type: String},
    password: {type: String}
});

const Users = mongoose.model('Users', UserSchema);

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post('/register', async (req,res) => { //registra el usuario en la base de datos
    const user = req.body.user;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 6);

    console.log(req.body);

    const userReg = new Users ({ 
        user: user, 
        email: email, 
        password: password 
    });
    await userReg.save();

    res.send(console.log('Usuario registrado en la DB'));
  });

  app.get('/', async (req, res) => { // muestra todos los documentos
      const user = await Users.find();
         res.send(JSON.stringify(user)); 
  });

  app.listen(3000, () => console.log('Listening on port 3000!'));
