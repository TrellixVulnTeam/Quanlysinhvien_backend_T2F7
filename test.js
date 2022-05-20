const res = require('express/lib/response');
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Test_server');
        console.log("ket noi database thanh cong")
    } catch (error) {
        console.log("fail")
    }

}

connect()

const role = ['admin','student']

    

const User = new Schema({
    userid: {type: String , required: true, unique: true},
    password: {type: String , required: true},
    name: {type: String , required: true},
    role:{type: String , enum: role, required: true},
    dob: {type: Date},
    address:{type: String},
    classid:{type: String,required: true}
  }, {
    collection : 'users'
  });

const Usermodel = mongoose.model('User', User)


const Class = new Schema({
    classid: {type:String, unique : true, required:true},
    classname:{type:String, unique : true, required:true},
    departmentid:{type:String, required:true}
})

const Classmodel = mongoose.model('Class', Class)


testobj = {
    userid : 1861030013
}

// Usermodel.find(testobj)
// .then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })

// Usermodel.create({
//     userid: 1861030013,
//     password: 1,
//     name: 'Lê Sỹ Nhật Linh',
//     role: "admin",
//     dob: '1997-04-19',
//     address: 'Thahh Hoá',
//     classid: '186103A'
//   })


// .then(data=>{
//     console.log(data)
//     console.log(role[1])
// })
// .catch(err=>{
//     console.log(err)
// })



function ConvertUser(userid){
    return new Promise (function(resolve){
        Usermodel.findOne ({
            userid : userid
        },function(err, obj) {
            if(!err && obj){
                resolve(obj._id)
            }
        })
    })
}

// ConvertUser(1861030013).then(data =>{
//     Usermodel.findById(data).then(data =>{
//         console.log(data)
//     }

//     )
// })
// .catch(err =>{
//     console.log(err)
// })

// const Course = new Schema({
//     courseid: {type:String, unique : true, required:true},
//     coursename:{type:String, required:true},
//     students_id:[{
//         type: ObjectId,
//         ref : "users"
//     }]
    
// })

// const CourseModel = mongoose.model('Course', Course)

// CourseModel.create({
//     courseid:"186103A",
//     coursename:"CNTT",
//     students_id:["627e8cfe5ffb2c7c19692901", ]
// }).then(data => {
//     console.log(data)
// })


const studentsid =["1861030013","1861030012","1861030010","1861030011"]
var ssid = []
async function convert_ssid (){
    for(var i =0 ; i< studentsid.length;i ++){
         ssid.push(
             new Promise((data) => {
                ConvertUser(studentsid[i])
             })
         )
    }
    return Promise.all(ssid)
} 

console.log(convert_ssid())

var today = new Date()
const testDate = new Schema({
    Date : Date
})
const testDateModel = mongoose.model('testDate', testDate)

testDateModel.create({
    Date : "2022-05-30"
})

testDateModel.findOne({
    Date : "2022-05-30"
}).then(data =>{
    console.log(data)
})