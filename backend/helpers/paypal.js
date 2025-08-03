const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AbGyRcE3IYpbfeKhwmbs7VXhSQbn9TEnwE5XrP1kOMXXUWue00j10_UBNkBDyjfQ3oekXZytrX815xt0",
  client_secret:
    "EBEHIMp3gb1n5oycNYc7n4iAZ0vo4LhJpH7fH6fTUp-P1p76Bp7jLl5XdF_F1iI-Jr6BtDZtOVwZwMml",
});

module.exports = paypal;
