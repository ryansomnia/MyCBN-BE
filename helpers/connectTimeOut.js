exports.errorFilter = function(err, req, res, next){
    let ress = {
      ResponseCode: '01',
      ResponseDescription: "Error",
      ResponseException: "Request time out!"
    }
    //logger.warn(err.stack); //the stack is actually not going to be helpful in a timeout
    if(!res.headersSent){ //just because of your current problem, no need to exacerbate it.
        errcode = err.status || 500; //err has status not statusCode
        // msg = err.message || 'server error!';
        res.status(errcode).send(ress); //the future of send(status,msg) is hotly debated
    };
}

exports.haltOnTimedout = function (req, res, next){

    if (!req.timedout) next();
  }
  



