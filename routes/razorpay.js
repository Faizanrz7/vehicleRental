const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_000cuqNrRU3FwQ",
  key_secret: "2yfLxey8GDhFjabcTHehyxwf",
});

var options = {
  amount: 50000, // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
};

instance.orders.create(options, function (err, order) {
  console.log(order);
});
