import dbConnect from "../../lib/dbConnect";
import Users from "../../models/users";
import bcrypt from "bcryptjs";
import { jwt_make } from "../../lib/jwt/jwt";
// TODO Validations --------------------------------------------------------------------

import { loginValidator } from "../../utils/validators/validations";
// use Validations
const validation = {
  login: loginValidator
};
/** @description validation handler */
const handleValidation = async (body, type, validation) => {
  await validation[type](body).catch((e) => {
    throw e;
  });
  return null;
};

// --------------------------------------------------------------------
// https://www.tabnine.com/code/javascript/functions/bcrypt/compare

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { username, password } = req.body;
        await handleValidation(req.body, "login", validation);

        const user = await Users.findOne({ username });
        if (!user)
          return res
            .status(404)
            .json({ success: false, message: "User not found" });

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          return res
            .status(401)
            .json({ success: false, message: "Password is incorrect" });
        }

        user.password = null;

        const token = jwt_make(user);

        return res.status(201).json({
          success: true,
          token,
          message: "You are logged In",
          timestamp: Date.now()
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case "GET":
      res.status(200).json({ success: true, message: "Hello John Doe" });
      break;

    default:
      res.status(400).json({ success: false, message: "You are a John Doe" });
      break;
  }
}
