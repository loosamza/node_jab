var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/horoscope";
var ObjectID = require('mongodb').ObjectID;
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.engine('mustache', mustacheExpress());

app.set('view engine','mustache');
app.set('views', __dirname+'/views');


function addStudent(student, callback){
  MongoClient.connect(dbUrl, function(err, db){
    if(err) callback(err);
    var id = new ObjectID();

    student["_id"] = id.toHexString();
    db.collection('student').insertOne(student, function(err, result){
      db.close();
      if(err) callback(err);
      callback(result);
    });
  });
}

function getStudent(student, callback){
   MongoClient.connect(dbUrl, function(err, db){
    if(err) callback(err);
    db.collection('student').find(student).toArray(function(err, result){
        db.close();
        if(err) callback(err);
        callback(result);
        console.log(result);
      });
    });
}

app.get('/', function(req, res){
  res.send('Hello Nodejs');
})

app.get('/horoscope', function(req, res){
  var sexes = [{ sex: "M", text: "ชาย"}, { sex: "F", text: "หญิง"}]
  res.render('horoscope', {sexes: sexes});
})

app.get('/index', function(req, res){
  res.render('index', {
    name: "sittisuk",
    surname : "chartrasse"
  });
})
app.get('/login', function(req, res){
  res.render('login', {
    name: "sittisuk",
    surname : "chartrasse"
  });
})

app.post('/login_success', function(req, res){
  var tty = {
    email : req.body.email,
    pass : req.body.pass
  }
  res.render('login_success', {
    email : tty.email,
    pass : tty.pass
  });
})

app.post('/register', function(req, res){
  /*console.log(req.body);
  addStudent(req.body, function(result){
    res.send(result);
  });*/

  if(req.body.pass == req.body.confirm_pass){
    var data = {email : req.body.email, pass : req.body.pass, con_firm : req.body.confirm_pass};
    addStudent(data, function(result){
      res.render('register',result);
    });

    /*getStudent({}, function(student){
      console.log('student',student);
      res.render('register',{student:student})
    })
    /*res.render('register', {data : data});
    console.log('Password Your Success!');
    console.log('Email:'+tty.email+' pass:'+tty.pass+' confirmPassword:'+tty.con_firm)*/
  }else{
    console.log('Password not same');
    res.render('login');
  }

})
app.listen(3000);

console.log('Server running..');
