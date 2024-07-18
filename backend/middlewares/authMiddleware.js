const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from Authorization header
      token =JSON.parse(req.headers.authorization.split(" ")[1])
      // console.log(token)
      // Verify token
      const decoded = await jwt.verify(token, "mysecret");
      console.log(decoded);
      // return res.send("success")
      // Check if decoded token has valid ID
      if (decoded._id) {
        // Fetch user from database using decoded ID
        const user = await User.findById({"_id":decoded._id});
        console.log(user);
        if (user) {
          // Attach user object to request
          req.user = user;
          console.log(req.user)
          next();
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Invalid token format");
      }
    } catch (error) {
      // Handle token verification errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "fail",
          message: "Not Authorized, token expired",
        });
      } else {
        return res.status(401).json({
          status: "fail",
          message: "Not Authorized, token invalid",
        });
      }
    }
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not Authorized, no token provided",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  
  
  // Check if user object exists on request (set by authMiddleware)
  if (req.user) {
    const { email } = req.user;
    // Query database to find user by email
    const adminUser = await User.findOne({ email });
    // Check if user is admin
    if (adminUser && adminUser.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not Authorized, no user found",
    });
  }
});

module.exports = { authMiddleware, isAdmin };
