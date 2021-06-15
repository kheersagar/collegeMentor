const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./user.js");
const Post = require("./PostSchema.js");
const Timetable = require("./TimetableSchema.js");


const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const multer = require("multer");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const post = require("./PostSchema.js");
const studyMaterial = require("./StudyMaterial");
const contactus = require("./contacts");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',

};
const fileUpload = multer({
    // limits:500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuidv4() + "." + ext);
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype];
            let error = isValid ? null : new Error('Invalid mime type');
            cb(error, isValid);
        }
    })
});

const pdfUpload = multer({
    // limits:500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/pdf');
        },
        filename: (req, file, cb) => {
            const ext = "pdf";
            cb(null, uuidv4() + "." + ext);
        }
    })
});
const jsonparser = bodyParser.json();
const app = express();


//-------Mongoose----------
mongoose.connect(`${process.env.MONGODB_HOST_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected");
});

app.use(jsonparser);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));

app.use(cookieParser());
app.use(session({
    key: `${process.env.KEY}`,
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000,
    }

}))

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/uploads/pdf", express.static(path.join("uploads", "pdf")));

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(process.env.PORT || 8080, () => {
    console.log(`server started on port ${process.env.PORT}`);
})


app.post("/register", (req, res) => {
    console.log("register post called");
    const { username, email, password } = req.body;
    try{
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                // console.log(username, email, salt, hash);
                const user = new User({ username: username, email: email, salt: salt, password: hash });
                await user.save();
                res.send({ status: "successfully registered" });
            });
        });
    }catch(err){
        console.log(err);
    }

})

app.post("/user_info", async (req, res) => {
    const value = req.body;
    const result = await User.updateOne({ _id: req.session.user }, value,(err,sucess)=>{
        if(!err){
            res.send(true);
        }else{
            res.send(false);
        }
    });
    console.log("result: ", result.nModified);
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const requestedUser = await User.findOne({ username: username })

    if (requestedUser) {
        bcrypt.compare(password, requestedUser.password).then((result) => {
            if (result == true) {
                // console.log(requestedUser)
                req.session.user = requestedUser._id;
                res.json({ state: "loggedIn", userName: requestedUser.username });
            }
            else {
                console.log("incorrect credentials");
            }
        })
    }
    else {
        console.log("No user found");
        // username or password is incorrect.
        res.send({state:false});

    }
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.send({ logOut: true });
})

app.post("/create-post", fileUpload.single('image'), async function (req, res) {
    let post;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const timestamp = req.body.timestamp;
    const userId = req.session.user;
    if (req.file) {
        post = new Post({
            Title: Title,
            Description: Description,
            image: req.file.path,
            timestamp: timestamp,
            userId: userId

        });
    }

    else {
        post = new Post({
            Title: Title,
            Description: Description,
            timestamp: timestamp,
            userId: userId
        });
    }

    await User.findByIdAndUpdate(req.session.user,{$push:{"postSearch":Title}},(err,result)=>{
      if(!err){
        console.log(result)
      }else{
        console.log(err)
      }
    })

   post.save(function (err, response) {
        if (err) {
            console.log(err);
            res.json({ uploaded: false });
        } else {
            console.log("succesfully saved");
            res.json({ uploaded: true });
        }
    });
});

app.get("/allPost", async function (req, res) {
    const check = req.headers.data;
    const page = parseInt(req.headers.page) ;
    const limit = parseInt(req.headers.limit);
    const skipIndex = (page - 1) * limit;
    console.log("page",page);
    console.log("limit",limit);
    if (check == "userProfileData") {
        Post.find({ userId: req.headers.id }).populate('userId').exec((err, posts) => {
            if (err) {
                console.log(err);
            } else {
                res.send(posts);
            }
        })
    } else {
        Post.find().populate('userId').
        limit(limit)
        .skip(skipIndex)
        .sort({"timestamp":-1})
        .exec((err, posts) => {
            if (err) {
                console.log(err);
            } else {
                res.send(posts);
            }
        })
    }


});

app.post("/time", function (req, res) {
    const userId = req.session.user;
    const time = new Timetable({
        userId: userId,
        time: {
            time1: req.body.values.t1,
            time2: req.body.values.t2,
            time3: req.body.values.t3,
            time4: req.body.values.t4,
            time5: req.body.values.t5,
            time6: req.body.values.t6,
            time7: req.body.values.t7,
            time8: req.body.values.t8,
            time9: req.body.values.t9,
            time10: req.body.values.t10
        },
        monday_class: {
            mondayClass1: req.body.values.m1,
            mondayClass2: req.body.values.m2,
            mondayClass3: req.body.values.m3,
            mondayClass4: req.body.values.m4,
            mondayClass5: req.body.values.m5,
            mondayClass6: req.body.values.m6,
            mondayClass7: req.body.values.m7,
            mondayClass8: req.body.values.m8,
            mondayClass9: req.body.values.m9,
            mondayClass10: req.body.values.m10
        },
        tuesday_class: {
            tuesdayClass1: req.body.values.tu1,
            tuesdayClass2: req.body.values.tu2,
            tuesdayClass3: req.body.values.tu3,
            tuesdayClass4: req.body.values.tu4,
            tuesdayClass5: req.body.values.tu5,
            tuesdayClass6: req.body.values.tu6,
            tuesdayClass7: req.body.values.tu7,
            tuesdayClass8: req.body.values.tu8,
            tuesdayClass9: req.body.values.tu9,
            tuesdayClass10: req.body.values.tu10
        },
        wednesday_class: {
            wednesdayClass1: req.body.values.w1,
            wednesdayClass2: req.body.values.w2,
            wednesdayClass3: req.body.values.w3,
            wednesdayClass4: req.body.values.w4,
            wednesdayClass5: req.body.values.w5,
            wednesdayClass6: req.body.values.w6,
            wednesdayClass7: req.body.values.w7,
            wednesdayClass8: req.body.values.w8,
            wednesdayClass9: req.body.values.w9,
            wednesdayClass10: req.body.values.w10
        },
        thrusday_class: {
            thrusdayClass1: req.body.values.th1,
            thrusdayClass2: req.body.values.th2,
            thrusdayClass3: req.body.values.th3,
            thrusdayClass4: req.body.values.th4,
            thrusdayClass5: req.body.values.th5,
            thrusdayClass6: req.body.values.th6,
            thrusdayClass7: req.body.values.th7,
            thrusdayClass8: req.body.values.th8,
            thrusdayClass9: req.body.values.th9,
            thrusdayClass10: req.body.values.th10
        },
        friday_class: {
            fridayClass1: req.body.values.f1,
            fridayClass2: req.body.values.f2,
            fridayClass3: req.body.values.f3,
            fridayClass4: req.body.values.f4,
            fridayClass5: req.body.values.f5,
            fridayClass6: req.body.values.f6,
            fridayClass7: req.body.values.f7,
            fridayClass8: req.body.values.f8,
            fridayClass9: req.body.values.f9,
            fridayClass10: req.body.values.f10
        },
        saturday_class: {
            saturdayClass1: req.body.values.s1,
            saturdayClass2: req.body.values.s2,
            saturdayClass3: req.body.values.s3,
            saturdayClass4: req.body.values.s4,
            saturdayClass5: req.body.values.s5,
            saturdayClass6: req.body.values.s6,
            saturdayClass7: req.body.values.s7,
            saturdayClass8: req.body.values.s8,
            saturdayClass9: req.body.values.s9,
            saturdayClass10: req.body.values.s10
        }

    });
    time.save();
});


app.get("/get-table", async (req, res) => {
    Timetable.find({ userId: req.session.user }).populate('userId').exec((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete("/delete-table/:id", async function (req, res) {
    await Timetable.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send("deleted successfully!!")
        }
    })
});

app.get("/userDetail", async (req, res) => {
    let allUserDetails;
    const userId = req.session.user;
    await User.findOne({ _id: userId }, (err, result) => {
        allUserDetails = result;
        res.send(allUserDetails);
    });

});

app.post("/all", async (req, res) => {
    const value = req.body.value;
    let users, posts;
    if (value) {
        await User.find({ username: { $regex: value, $options: "i" } }, (err, userResult) => {
            users = userResult;
        });
        await Post.find({ Title: { $regex: value, $options: "i" } }, (err, postResult) => {
            posts = postResult;
            res.send({ userSearchResult: users, postsSearchResult: posts });
        });
    }
})

app.post("/keyword",async (req,res)=>{
  await User.findByIdAndUpdate(req.session.user,{$push:{"userSearch":req.body.value}},(err,result)=>{
    if(!err){
      console.log(result)
    }else{
      console.log(err)
    }
  })
});

app.post("/recommend",async (req,res)=>{

    let postSearchKeyword ;
    var recommend = {
        user:[]
    };
    try{
        await User.findById(req.session.user,(err,result)=>{
                if(result){
                    postSearchKeyword = result.postSearch;
                    // to remove duplicate data in array
                    postSearchKeyword = postSearchKeyword.filter((c,index)=>{
                    return postSearchKeyword.indexOf(c) === index;
                });
                }
            }
            );
    }catch(Err){
        console.log(err);
    }

    try{
        if(postSearchKeyword){
            await postSearchKeyword.map(async(e,index)=>{
                Post.find({ Title: { $regex: e, $options: "i" } }).populate('userId').exec((err, posts) => {
                    posts.map((post) => {
                        recommend.user.push(post.userId);
                    });
        
                    if (index == (postSearchKeyword.length - 1)) {
                        res.send(recommend);
                    }
                });
            });
        }

    }catch(ex){
        console.log(ex);
    }

     
    
   
});

app.get("/study/:code", async (req, res) => {
    await studyMaterial.find({ code: req.params.code }, (err, result) => {
        res.send(result)
    })
});

app.post("/studyMaterial", pdfUpload.fields([
    {
        name: "file1", maxCount: 1
    },
    {
        name: "file2", maxCount: 1
    },
    {
        name: "file3", maxCount: 1
    },
    {
        name: "file4", maxCount: 1
    },
    {
        name: "file5", maxCount: 1
    },
    {
        name: "file6", maxCount: 1
    },
]),
    async (req, res) => {

        const { code, sub1, sub2, sub3, sub4, sub5, sub6 } = req.body;

        // to delete the previously uploaded file before updating the file
        await studyMaterial.find({ code: code }, (err, result) => {
            const addressArray = [];
            addressArray.push(result[0].subjects.sub1.materials.pdf);
            addressArray.push(result[0].subjects.sub2.materials.pdf);
            addressArray.push(result[0].subjects.sub3.materials.pdf);
            addressArray.push(result[0].subjects.sub4.materials.pdf);
            addressArray.push(result[0].subjects.sub5.materials.pdf);
            addressArray.push(result[0].subjects.sub6.materials.pdf);
            addressArray.map((e) => {
                if (e && req.files != null) {
                    return (

                        fs.unlink(e, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("deleted");
                            }
                        })
                    )
                }



            })
        })

        await studyMaterial.updateOne({ code: code }, {
            code: code,
            subjects: {
                sub1: {
                    value: sub1,
                    materials: {
                        notes: "String",
                        pdf: req.files.file1 != undefined ? req.files.file1[0].path : null
                    }
                },
                sub2: {
                    value: sub2,
                    materials: {
                        notes: "String",
                        pdf: req.files.file2 != undefined ? req.files.file2[0].path : null
                    }
                },
                sub3: {
                    value: sub3,
                    materials: {
                        notes: "String",
                        pdf: req.files.file3 != undefined ? req.files.file3[0].path : null
                    }
                },
                sub4: {
                    value: sub4,
                    materials: {
                        notes: "String",
                        pdf: req.files.file4 != undefined ? req.files.file4[0].path : null
                    }
                },
                sub5: {
                    value: sub5,
                    materials: {
                        notes: "String",
                        pdf: req.files.file5 != undefined ? req.files.file5[0].path : null
                    }
                },
                sub6: {
                    value: sub6,
                    materials: {
                        notes: "String",
                        pdf: req.files.file6 != undefined ? req.files.file6[0].path : null
                    }
                }
            }
        }, (err, response) => {
            if (err) {
                console.log(err)
            } else {
                console.log("updated one");
                res.send({ status: "updated" });
            }
        });
    });

app.post("/contact", async (req, res) => {
    const { firstname, lastname, email, number, subject } = req.body;

    const CONTACT = new contactus({
        firstname: firstname,
        lastname: lastname,
        Email: email,
        Phone: number,
        description: subject,

    });

    CONTACT.save((err, doc) => {
        if (err)
            res.send(false);
        else
            res.send(true);
    });
    

});
