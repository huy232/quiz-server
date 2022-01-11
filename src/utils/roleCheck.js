const { sign, verify } = require("../utils/jwt");
module.exports = async function (req, res, next) {
	let { token } = req.session;
	if (!token) return res.send({ message: "You do not have enough privilege" });
	let checkRole = await verify(token);

	if (checkRole.data.role != 1 && checkRole.data.role != 100)
		return res.send({ message: "sucess" });
	next();
};
