const user =require('../models/user')
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const JWT_SECRET='sfdqd';

const login =async (req,res)=>{
    const {email,password}=req.body
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!email || !email.match(mailformat)) {

		return res.json({ status: 'error', error: 'You have entered an invalid email address!' })
	}
    const user1 = await user.findOne({email}).lean()
    if(!user1){
        return res.json({status:'error',error:'Invalide Password or username'})
    }
    if(await bcrypt.compare(password,user1.password)){
        console.log(user1._id);
        const token = jwt.sign({//this information are visible in the browser
            id : user1._id,
            email:user1.email,
            username:user1.username,
        },JWT_SECRET)
        console.log(token)
        return   res.json({status:'ok',data:token})
    }


    res.json({status:'error',error:'Invalide Password or username'})
}


//create user
const createUser =async (req,res)=>{
    
    console.log(req.body)
    
    const {username,password: plainTextPassword,email,passwordconf}=req.body
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!email || !email.match(mailformat)) {

		return res.json({ status: 'error', error: 'You have entered an invalid email address!' })
	}

    if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
    
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}
    if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
    if(!passwordconf || plainTextPassword.localeCompare(passwordconf)!==0 ){
        return res.json({ status: 'error', error: 'Your password don\'t match' })
    }


    const password = await bcrypt.hash(plainTextPassword,10)
   
    try {
        const responde = await user.create({
            username,password,email
        })
        console.log('User is created successefuly '+responde);
    } catch (error) {
        
			return res.json({ status: 'error', error: 'Username or email already in use' })
		}
    
    res.json({status:'ok'})//status : 'ok' set the headears

}

module.exports ={
    createUser,login,
}