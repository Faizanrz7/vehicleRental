const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./config/dbConnect");
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
const multer = require("multer");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(req.body);
    res.status(200).send("Hello");
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

authUser = (user, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${user}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will popuplate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  let authenticated_user = { id: 123, name: "Kyle" };
  //Let's assume that DB search that user found and password matched for Kyle

  return done(null, authenticated_user);
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  done(null, { name: "Kyle", id: 123 });

  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

const indexRouter = require("./routes/index");
const carRouter = require("./routes/carRoutes");
const userRouter = require("./routes/userRouter");
const index2Router = require("./index2");
// mongoose.connect(process.env.MONGO_URL).then(console.log("DB Connected"));
db();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/cars", carRouter);
app.use("/user", userRouter);
app.use("/userNew", index2Router);

app.use(
  session({
    secret: "Faizan",
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, async () => {
  console.log(`Server Listening on ${PORT}`);
});
