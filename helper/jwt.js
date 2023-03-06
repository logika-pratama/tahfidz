const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
          return parted[1];
      }
  }
  return undefined;
};

function getDataToken(){
  let cekToken = getToken(req.headers);
  if(!cekToken){
    return res.status(401).json({
      status: 'failed',
      message: 'Token is not Found'
    });
  }
}
function decodejwt(data){
  try{
    let decoded = jwt.verify(data, process.env.TOKEN_SECRET);
    return decoded;
  }catch(err){
    return err;
  }
}

const verify = async(req, res, next) =>{
  try{  
    let cekToken = getToken(req.headers);
    if(!cekToken){
      return res.status(401).json({
        status: 'failed',
        message: 'Token is not Found'
      });
    }
    
    const decoded = decodejwt(cekToken);

    if(decoded.name == 'JsonWebTokenError'){
      return res.status(401).json({
        status: 'failed',
        message: 'Token is not valid'
      });
    } 
  
    req.kode_user = decoded.kode_user;
    req.email = decoded.email;
    req.username = decoded.username;
    req.hakakses_user = decoded.hakakses_user;
    req.id_account = decoded.id_account;
    next();    
  }catch(error){
    return res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }
}

function generate(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

const basic_auth = async(req, res, next) =>{
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(403).send({message:'Forbidden'});
  }

  const encode = authorization.substring(6);
  const decoded = Buffer.from(encode,'base64').toString('ascii');
  const [username,password] = decoded.split(':');
  if(username != process.env.BASIC_AUTH_USER){
    return res.status(403).send({message:'Forbidden'});
  }
  if(password != process.env.BASIC_AUTH_PW){
    return res.status(403).send({message:'Forbidden'});
  }
  next();
}

module.exports = {verify, generate, basic_auth }
