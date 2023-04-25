const supabase = require("../model/supabaseClient");
const crypto = require("crypto");
const { generateToken, verifyToken } = require("./helper/tokenFunctions");

const TABLE = "users";

const makeHashed = (a) => crypto.createHash("sha256").update(a).digest("hex");

// const cookieOptions = {
//   domain: "ec2-54-180-116-211.ap-northeast-2.compute.amazonaws.com",
//   path: "/",
//   httpOnly: true,
// };

module.exports = {
  logIn: async (req, res) => {
    const { data, error } = await supabase.from(TABLE).select("*");
    if (error) {
      return res.status(500).send("Cannot get data from db");
    }
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).send("invalid user data");
    // const hashedPassword = makeHashed(password);
    const user = {
      ...data.find((a) => a.email === email && a.password === password),
    };

    if (!user) return res.status(401).send("user not found");

    const result = generateToken({ id: user.id, email });

    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Authorization", `Bearer ${result.accessToken}`);
    res.send("ok");
  },
  signUp: async (req, res) => {
    const { name, email, password } = req.body;
    // const hashedPassword = makeHashed(password);

    const { data, error } = await supabase
      .from(TABLE)
      .insert({ name, email, password })
      .select();

    if (error) {
      return res.status(500).send("Cannot create user to db");
    }
    res.status(201).send("ok");
  },
  logOut: (req, res) => {
    // res.clearCookie("userId", cookieOptions);
    res.status(205).send("cookie deleted - log out");
  },
  getUserInfo: async (req, res) => {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization");
    const accessTokenPayload = verifyToken("access", token);

    if (!accessTokenPayload) return res.status(401).send("Not Authorized");
    const email = accessTokenPayload.email;
    const { data, error } = await supabase.from(TABLE).select("*");
    console.log(data);
    const user = { ...data.find((a) => a.email === email) };

    if (!email || !user.email) {
      console.log(email, user.email);
      return res.status(401).send("Not Authorized");
    } else {
      delete user.password;
      res.status(200).json({
        success: true,
        ...user,
      });
    }
  },
};
