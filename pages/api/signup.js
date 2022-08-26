import dbConnect from "../../lib/dbConnect";
import Users from "../../models/users";
import bcrypt from "bcryptjs";

// TODO Validations --------------------------------------------------------------------

import { signUpValidator } from "../../utils/validators/validations";
import { jwt_make } from "../../lib/jwt/jwt";
// use Validations
const validation = {
  signup: signUpValidator
};
/** @description validation handler */
const handleValidation = async (body, type, validation) => {
  await validation[type](body).catch((e) => {
    throw e;
  });
  return null;
};

// --------------------------------------------------------------------

const passwordToHash = (password) => {
  return bcrypt.hashSync(password, 10);
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { password } = req.body;
        await handleValidation(req.body, "signup", validation);

        // Cryptographically secure password hashing
        req.body.password = passwordToHash(password);

        const user = await Users.create(req.body);
        req.body.password = null;


        user.password = null;
        const token = jwt_make(user);

        return res.status(200).json({
          success: true,
          message: "User created successfully.",
          token,
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
