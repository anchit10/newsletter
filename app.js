const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const { options } = require("request");
const { dirname } = require("path");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const FirstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:FirstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const url="https://us21.api.mailchimp.com/3.0/lists/300b817a70";
    const jsonData=JSON.stringify(data);
    const options={
        method:"POST",
        auth:"anchit:8b54b9e93348ee1227e6e2178cb14020-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })
});
// request.write(jsonData);
request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("server 3000 is running");
});

// API key
// 8b54b9e93348ee1227e6e2178cb14020-us21
// list Id
// 300b817a70