const express = require("express");
const app = express();
// const session = require("express-session");
const passport = require("passport");

const LocalStartegy = require("passport-local");
const router = express.Router();
const UserModel = require("../models/user");
app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: "Faizan",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

authUser = async (user, password, done) => {
  console.log(user);
  const User = await UserModel.findOne({ username: user });
  console.log(User);
  if (User) {
    const result = password === User.password;
    if (result) {
      let authenticated_user = User;
      done(null, authenticated_user);
    } else {
      done(null, false);
    }
  } else {
    //   res.status(400).send({ message: "User doesn't exist" });
    done(null, false);
  }
};

passport.use(new LocalStartegy(authUser));
passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  done(null, user);
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  try {
    const { username, password, Mobile } = req.body;
    const newUser = new UserModel({
      username: username,
      password: password,
      Mobile: Mobile,
    });
    newUser.save();
    res
      .status(200)
      .send({ message: "User Registration Successful", data: newUser });
  } catch (error) {
    res
      .status(400)
      .send({ message: "User registration failed", error: error.message });
  }
});

// router.get("/signin", async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ Username: req.body.Username });
//     if (user) {
//       const result = req.body.Password === user.Password;
//       if (result) {
//       }
//     } else {
//       res.status(400).send({ message: "User doesn't exist" });
//     }
//   } catch (error) {
//     res.status(400).send({ message: "Error in signin", error: error.message });
//   }
// });

router.post(
  "/signin",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    res
      .status(200)
      .send({ message: "User successfully loggedin", data: req.user });
  }
);

router.get("/getUserDetails", (req, res) => {
  res.send(req.user);
});

module.exports = router;
