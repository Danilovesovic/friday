const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('xxx',['todos']);
const ObjectId = mongojs.ObjectId;
const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/api',function (req,res) {
  db.todos.find({},function (err,docs) {
    if (err) {
      throw err;
    }
    res.send(docs);
  })
})

app.post('/delete',function (req,res) {
  console.log(req.body.id);
  db.todos.remove({_id : ObjectId(req.body.id)},function (err,docs) {
    db.todos.find({},function (err,docs) {
      res.send(docs);
    })
  })
})


app.post('/add',function (req,res) {
  db.todos.insert({msg:req.body.msg,done:false},function (err,docs) {
    db.todos.find({},function (err,docs) {
      res.send(docs);
    })
  })
})



app.listen(3000,function () {
  console.log('Listening on port 3000');
})
