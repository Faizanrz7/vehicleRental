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
const OrderModel = require("./models/order");
const CarModel = require("./models/cars");
const BikeModel = require("./models/bikes");
const BusModel = require("./models/buses");
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

const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_nSXJj85corDzDt",
  key_secret: "70mT1FHBO7ZNPx3eACRC32H1",
});

app.post("/createOrder", async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.user);

    const User = await UserModel.find({ _id: req.user });
    console.log("USer", User.Name === undefined);
    if (User.Name === undefined) {
      console.log("finda and update");
      try {
        const updateUser = await UserModel.findOneAndUpdate(
          { _id: req.user },
          {
            Aadhar: req.body.Aadhar,
            Pan: req.body.Pan,
            Address: {
              Street: req.body.Street,
              StreetNumber: req.body.StreetNumber,
              PostCode: req.body.PostCode,
              City: req.body.City,
              Country: req.body.Country,
            },
          },
          {
            new: true,
          }
        );
        // await updateUser.save();
        console.log(updateUser);
      } catch (error) {
        console.log("Update User", error.message);
      }
    }
    var options = {
      amount: parseInt(req.body.Cost) * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, async function (err, order) {
      // console.log(order);
      const newOrder = new OrderModel({
        userId: req.user,
        vehicleId: req.body.vehicleId,
        cost: req.body.Cost,
        razorPayId: order.id,
        Status: "Failed",
      });
      await newOrder.save();
      res.status(200).send({ order: order, orderDb: newOrder });
    });
  } catch (error) {
    res.send({ message: "Creating Order failed", err: error.message });
  }
});
app.get("/getMyOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user })
      .populate({ path: "vehicleId" })
      .populate({ path: "userId" })
      .exec();

    console.log(orders);
    res.status(200).send({ orders: orders });
  } catch (error) {
    res
      .status(200)
      .send({ message: "Order fetching error", err: error.message });
  }
});

app.post("/updateOrderStatus/:orderId", async (req, res) => {
  try {
    const updateOrder = await OrderModel.findOneAndUpdate(
      { _id: req.params.orderId },
      {
        Status: "Success",
      },
      {
        new: true,
      }
    );
    res.sendFile(path.join(__dirname + "/public/success.html"));
  } catch (error) {
    console.log("Update Order Status", error.message);
  }
});

app.get("/getDetails/:vehicleId", async (req, res) => {
  try {
    let vehicleData = await CarModel.findOne({ _id: req.params.vehicleId });
    console.log(vehicleData === null);
    if (vehicleData === null)
      vehicleData = await BikeModel.findOne({ _id: req.params.vehicleId });
    if (vehicleData === null)
      vehicleData = await BusModel.findOne({ _id: req.params.vehicleId });

    const userData = await UserModel.findOne({ _id: req.user });
    // console.log(userData);
    res.status(200).json({ vehicleData: vehicleData, userData: userData });
  } catch (error) {
    console.log(error.message);
  }
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


// const favicon = require('serve-favicon');
// const express = require('express')
// const app = express()
  
// Returns a middleware to serve favicon
// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use (favicon (path.join(__dirname, '/public', 'favicon.ico')));
  
// API endpoint to serve index 
// app.get('/', (_, res)=> res.sendFile(__dirname + '/index.html'));


// var favicon = require('serve-favicon');

// app.use(favicon(__dirname + '/public/images/favicon.ico'));

// var express = require ('express');
// var app = express ();
// var favicon = require('serve-favicon');
// var path = require ('path');
// app.use (favicon (path.join(__dirname, '/public', 'favicon.ico')));
// app.get('/', (req, res)=>{
// res.send ('hello express');
// });
// app2.listen (3001);