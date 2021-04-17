const { resolve } = require('path');
const USER_COLL= require('../database/user');
const ObjectID = require('mongoose').Types.ObjectId;

const { hash, compare} = require('bcrypt');
const { sign, verify } = require('../utils/jwt');
const { profile } = require('console');

/*
    INSERT NEW INFOMATION USER TO DATABASE 
*/
module.exports = class user extends USER_COLL{
    
/*
    INSERT NEW INFOMATION USER TO DATABASE 
*/

   
/*
        GET LIST INFORMATION USER FROM DATABASE IN TABLE USER
*/
    static getList(){
        return new Promise(async resolve =>{
         try {
                let listUser = await USER_COLL.find();
                if( !listUser ) 
                {
                    return resolve({ error : true, message : "List not Exist"});
                }
                return resolve({ error : false, data : listUser})
         } catch ( error ) {
             return resolve({ error : true, message : error.message})
         }
        })
    }
 /*
        GET ONE OBJECT  INFOMATION USER IN DATABASE
*/
    static getID( id )
    {
        return new Promise(async resolve =>{
        try {
                let inforUser = await USER_COLL.findById({ _id : id });
                if( !inforUser ) return resolve({erro : true , message : 'can not find'});
                return resolve({ error : true, data : inforUser})
        } catch ( error ) {
            return resolve({error : true, message : error.message})
        }
    })
}
 /*
        UPDATE INFORMATION USER TO DATABASES
*/

static update({ id, name, phone, email, sex }) {
    return new Promise(async resolve => {
        try {
            
                if( !ObjectID.isValid( id )){
                    return resolve({ error : true , message : 'params_invalid' });
                }
                let listUser = await USER_COLL.findByIdAndUpdate( id, {
                    name, phone, email, sex
                }
                ,{
                    new: true
                });
                
                if(!listUser){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listUser});


        } catch (error) {
            return resolve({ error: true, message: error.message });
        }
    })
}

 /*
        REMOVE ONE INFOMATION USER IN DATABASE OF TABLE USER 
*/
static remove( id )
    {
        return new Promise(async resolve =>{
            let checkExit = await USER_COLL.findById({_id:id});
            if(!checkExit)
                return resolve({error: true, message:'id not exist'});
            let removeUser= await USER_COLL.findByIdAndDelete(id);
            
        })
    }

}