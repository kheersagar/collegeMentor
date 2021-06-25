function Auth(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.send("<h1>Not Authenticated </h1>");
  }
}

module.exports = Auth;