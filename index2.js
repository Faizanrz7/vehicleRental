const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const db = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const path = require("path");
const session = require("express-session");

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./models/user");
// require("")
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cors());

db();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

authUser = async (user, password, done) => {
  // console.log(user);
  const User = await UserModel.findOne({ username: user });
  // console.log(User);
  if (User) {
    // const result = password === User.password;
    const result = await bcrypt.compareSync(password, User.password);
    if (result) {
      let authenticated_user = User._id;
      done(null, authenticated_user);
    } else {
      done(null, false);
    }
  } else {
    done(null, false);
  }
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((id, done) => {
  console.log(`--------> Serialize User`);
  console.log(id);

  done(null, id);
});

passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  done(null, id);
});

app.listen(3001, () => console.log(`Server started on port 3001...`));

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/signin.html"));
  // res.send(__dirname);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/siginFail",
  }),
  (req, res) => {
    console.log(req.body);
  }
);

app.get("/siginFail", (req, res) => {
  res.status(200).send({ message: "Failed", user: req.user });
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/signup.html"));
  // res.send(__dirname);
});
app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, Mobile } = req.body;
    const newUser = new UserModel({
      username: username,
      password: password,
      Mobile: Mobile,
    });
    await newUser.save();
    res
      .status(200)
      .send({ message: "User Registration Successful", data: newUser });
  } catch (error) {
    res
      .status(400)
      .send({ message: "User registration failed", error: error.message });
  }
});

const indexRouter = require("./routes/index");
const carRouter = require("./routes/carRoutes");
const bikeRouter = require("./routes/bikeRoute");

app.use("/", indexRouter);
app.use("/cars", carRouter);
app.use("/bikes", bikeRouter);

app.get("/dashboard", (req, res) => {
  //   res.render("dashboard.ejs", { name: req.user.name });
  // req.user will have the id of the user
  console.log(req.body);
  res.status(200).send({ message: "Success", user: req.user });
});

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.sendFile(path.join(__dirname + "/public/signin.html"));
};

app.get("/secret", checkAuthenticated, (req, res) => {
  console.log(req.user);
  res.status(200).send({ message: "Secret Revealed", id: req.user });
});

app.get("/rentNow/:id", checkAuthenticated, (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/rentnow.html"));
});

app.post("/rentNow/:id", checkAuthenticated, (req, res) => {
  const userId = req.user;
  const vehicleId = req.params.id;
  console.log(userId, vehicleId);
  res.status(200).send({ message: "Vehicle Staged For rent" });
});

app.get("/getUserDetails", async (req, res) => {
  console.log(req.user);
  try {
    const User = await UserModel.findById(req.user);
    // console.log(User);
    res.status(200).send({ data: User });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/order/:id", async (req, res) => {
  const vehicleId = req.params.id;
  const userId = req.user;

  try {
    const newOrder = new OrderedBulkOperation({
      vehicleId: vehicleId,
      userId: userId,
      cost: req.body.cost,
    });
    await newOrder.save();
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured during order", error: error.message });
  }
});

app.get("/isAuthenticated", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) return res.status(200).send({ message: "yes" });
  else return res.status(200).send({ message: "no" });
});

app.get("/logout", (req, res) => {
  console.log("Server logout");
  req.logOut((err) => {
    if (err) {
      res.status(200).send({ message: "logOut error", error: err.message });
    }
    res.status(200).send({ message: "User logged Out" });
  });
});
