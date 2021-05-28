require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../models/index.js');

exports.protect = (async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      res.status(401).json({message:'You are not logged in! Please log in to get access.'})
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await db.User.findById(decoded.id);
  if (!currentUser) {
    return next(
      res.status(401).json({message:'The user belonging to this token no longer exist.'})
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.currentUser = currentUser;
  res.locals.role = currentUser.role;
  next();
});

