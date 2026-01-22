const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//On import le module de bcrypt qui permet de hacher des expression
const bcrypt = require('bcrypt');

const User = new Schema({
  name:{
    type: String,
    trim  : true,
    required: [true, 'le nom est requis'],
  },
  firstname: {
    type: String,
    trim : true,
     required: [true, 'le nom est requis'],
  },
  email: {
    type: String,
    trim: true,
    required : [true, 'lemail est requis'],
    unique : true, // index unique
    lowercase: true,
  },   
  password: {
    type: String,
    trin : true,
     required : [true, 'password requis'],
  }
}, {
  // ajoute 2 champs au deocument createdAt et updateAt
  timestamps: true
});
//Hash le mot de passe quand il est modifié
User.pre('save', function(next){
    if (!this.isModified('password')){
        return next();
}
this.password = bcrypt.hashSync(this.password, 10);
next();
});
module.exports = mongoose.model('User', User);