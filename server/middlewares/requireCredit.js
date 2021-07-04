module.exports = (req, res, next) => {
    if (req.user.credits < 1){
        return res.status(403).send({error: 'Must have at least 1 credit!'});
    }

    next();
}; // next = next middleware