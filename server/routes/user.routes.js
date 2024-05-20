const express=require('express');
const router=express.Router();
const {getUsers,createUser, deleteUser, updateUser, getUser}=require('../controller/user.controller.js')


router.get('/',getUsers);
router.get('/:id',getUser);
router.post('/',createUser);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);



module.exports=router;