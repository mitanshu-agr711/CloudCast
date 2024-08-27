import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url ke liye
        require: true
    },
    coverImage: {
        type: String,//cloudinary url

    },
    watchHistory: [{//ise hum ne object banaya hai kyu ki
        //hum isme data store karte jayenge
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String
    }

}, {
    timestamps: true
})
//pre use kar te hai kisi kam se phele hum kya kam karana chate hai
//pre hum save mai use kar rhe becz save se phele data hum bcrypt karenge
userSchema.pre("save", async function (next) {

    //ab ye har bar password ko bcrypt karenga but hum chate hai ki jab password change ho jabhi kare
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)//10 represent kitana round/salt dalna hai
    next()//for call back
});

//ab hum password ko checvk karenge

userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)//it return ans in true or false
}

userSchema.methods.generateAccessToken = function () {
    console.log("bhai mai to tokken banaraha hon")
    return jwt.sign(

        {
            _id: this._id,
            email: this.email,
            username: this.username//this is use to access data from mongodb
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username//this is use to access data from mongodb
        },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    }
    )
}


export const User = mongoose.model("User", userSchema);



