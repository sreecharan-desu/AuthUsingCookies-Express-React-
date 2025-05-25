import express from "express"; import bcrypt from "bcrypt";import cors from "cors";
import cookieParser from "cookie-parser"; import jwt from "jsonwebtoken"
import { User } from "./db/db"; import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin : "https://auth-using-cookies-express-react.vercel.app",
    credentials : true
}))


app.get('/', (req, res) => {
    res.json({
        msg: "Hello from express auth"
    })
})

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 4)
        const user = await User.create({
            email: email,
            password: hashedPw,
            username: email.split("@")[0]
        })

        console.log(user);

        res.json({
            user,
            msg: "User created successfully",
            success: true
        })

    } catch (e) {
        console.log(e)
        res.json({
            error: e,
            msg: "Failed to create user",
            success: false
        })
    }

})

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email
        })

        console.log(user);

        if (user && user.password) {
            if (await bcrypt.compare(password, user.password)) {

                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "")
                res.cookie("___express_auth_token_", token)
                res.json({
                    user,
                    msg: "User created successfully",
                    success: true
                })

            } else {
                res.json({
                    msg: "Invalid credentials",
                    success: false
                })
            }
        }else{
                  res.json({
                    msg: "Invalid credentials",
                    success: false
                })
        }


    } catch (e) {
        console.log(e)
        res.json({
            error: e,
            msg: "Failed to signin",
            success: false
        })
    }
})

app.post('/logout', (req, res) => {
    try {
        res.clearCookie("___express_auth_token_"),
            res.json({
                msg: "Successfully logged out",
                success: true
            })
    } catch (e) {
        res.json({
            msg: "Failed logged out",
            success: false
        })
    }

})

app.get('/user', async (req, res) => {
    try {
        const ___express_auth_token_ = req.cookies.___express_auth_token_;
        const isVerified = jwt.verify(___express_auth_token_, process.env.JWT_SECRET || "")

        if (isVerified) {
            const object: any = jwt.decode(___express_auth_token_);
            if (object) {
                const user = await User.findOne({
                    email: object.email
                })

                res.json({
                    user,
                    success: true,
                })
            }

        } else {
            res.json({
                success: false,
                msg: "Auth failed"
            })
        }
    } catch (e) {
        res.json({
            error: e,
            success: false
        })
    }

})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})