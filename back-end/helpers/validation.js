function ValidateEmail(email) {
  // console.log(email)
  const regex = new RegExp(/^([\w\.\-]+)@([\w\.\-]+)((.(\w){2,4})+)$/);
  return regex.test(email);
}

function ValidatePriviledge(req, key = '') {
  return key === req.caller || req.privilege === 'admin'
}

module.exports = {
  ValidateEmail: ValidateEmail,
  ValidatePriviledge: ValidatePriviledge
};
