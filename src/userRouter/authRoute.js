import {Router} from 'express'
import UserSchema from '../model/userRegisterModel.js'
import loginValidation from './loginValidation.js'
import userValidationRegister from './registerValidation.js'
import jwt from 'jsonwebtoken'
const userRoute = Router()
// usr route 

userRoute.post('/register' ,async (req , res)=>{
    try {
        await userValidationRegister.validateAsync(req.body)
    } catch (error) {
        return res.status(400).send(error.message + ' error happen')
    }
    UserSchema.findOne({username: req.body.username}).then((newUser) => {
        if(newUser){
            res.status(400).send('user already exist')
        }else{
            const userRegisterSave = new UserSchema(req.body)
            userRegisterSave.save()
            res.send('user registerd succesfuly')
        
        }
    })

})



userRoute.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const loginCredential = await loginValidation.validateAsync({
      username,
      password,
    });


    UserSchema.findOne({ username: loginCredential.username }).then((user) => {
      if (user) {
        if (user.password === loginCredential.password) {
          const sentUser = {
            id: user._id,
            email: user.email,
            age: user.age,
            username: user.username,
            role: user.role,
          };
          const acces_token = jwt.sign(sentUser, process.env.JWT_KEY);
          res.status(200).json({ user: sentUser, token: acces_token });
        } else {
          res.status(400).json({ message: "wrong email or password" });
        }
      } else {
        res.status(400).json({ message: "wrong email or password" });
      }
    });
  });
  
userRoute.get('/doctors',   async (req , res)=>{

    UserSchema.find({role: 'doctor'}).then(data => res.json(data)).catch((err)=>{err.message+' doctor not found'})

})
userRoute.get('/doctors/:id', async (req , res)=>{
    const id = req.params.id
    UserSchema.findById(id, {} , {role: 'doctor'}).then(data => res.json(data)).catch((err)=>{res.send('no  doctor found ')})

})
export default userRoute;