const pwdValidator = require("password-validator");

//  checkPwd(): function to check password requirements
const pwdSchema = new pwdValidator();

pwdSchema
    .is().min(8)
    .is().max(64)
    .has().lowercase()
    .has().uppercase()
    .has().digits(2)
    .has().symbols(1)
    .has().not().spaces()

exports.checkPwd = (req, res, next) => {
    if (pwdSchema.validate(req.body.password)) {
        next();
    } else {
        const invalidPwd = pwdSchema.validate(req.body.password, { list: true });
        return res.status(400).json(invalidPwd);
    }
}

//  function to check password inputs on sign-up view
exports.confirmPwd = (req, res, next) => {
    if (req.body.password == req.body.passwordConfirm) {
        next()        
    } else {
        return res.status(400).json("Password inputs are not equal")
    }
}