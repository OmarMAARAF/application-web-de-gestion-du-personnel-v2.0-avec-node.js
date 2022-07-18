const jwt = require("jsonwebtoken");
const path = require("path");
const JWT_SECRET = "sfdqd";
const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.token = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    console.log(path.join(__dirname, "../public/templates/admin/login.html"));
    /* return res.redirect(307,"/login.html"); */
    /* res.send("/") */
    return res.json({status:'Not Auth'})
  }
};
module.exports = { cookieJwtAuth };
