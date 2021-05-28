const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        unique: true
      },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 1
      },
      token:{type:String},
    
    categorys:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
            }]
        },
    {
        timestamps:true
    })
    userSchema.pre('save', async function(next) {
        try {
          if (!this.isModified('password')) {
            return next();
          }
          this.password = await bcrypt.hash(this.password, 12);
          return next();
        } catch (err) {
          return next(new AppError(err, 400));
        }
      });

      userSchema.methods.correctPassword = async function(
        candidatePassword,
        userPassword
      ) {
        return await bcrypt.compare(candidatePassword, userPassword);
      };

      userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
        if (this.passwordChangedAt) {
          const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10,
          );
      
          return JWTTimestamp < changedTimestamp;
        }
      
        // False means NOT changed
        return false;
      };

      const User = mongoose.model('User', userSchema);
  
      module.exports = User;