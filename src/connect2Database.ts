#!/usr/bin/env ts-node-script
import {MongoClient} from 'mongodb';
var url = "mongodb://localhost:27017";
 
MongoClient.connect(url, function(err, db) {
    debugger
  if (err) throw err;
  console.log("数据库已创建!");
//   var dbo = db.db("runoob");
//     var myobj = { name: "菜鸟教程", url: "www.runoob5" };
//     dbo.collection("site").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
    var dbo = db.db("runoob");
    dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        debugger
        db.close();
    });
    // var dbo = db.db("runoob");
    // var whereStr = {"name":'菜鸟教程'};  // 查询条件
    // dbo.collection("site").deleteMany(whereStr, function(err, obj) {
    //     if (err) throw err;
    //     console.log("文档删除成功");
    //     db.close();
    // });
});