require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateToken: (user) => {
    // token => header.payload.signature
    const payload = {
      id: user.id,
      email: user.email,
    };
    let result = {
      accessToken: sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d", // 1일간 유효한 토큰을 발행합니다.
      }),
    };
    // result에 토큰을 담아서 리턴을 할거다.
    // 토큰이 access , refresh
    // access는 세션 쿠키 => 브라우저 닫으면 없어져
    // 로그인 유지하고 싶으면 refresh => persistent 쿠키 겠죠? 유효기간 설정된 쿠키
    // if (checkedKeepLogin) {
    //   result.refreshToken = sign(payload, process.env.REFRESH_SECRET, {
    //     expiresIn: "7d", // 일주일간 유효한 토큰을 발행합니다.
    //   });
    // }

    return result;
  },
  verifyToken: (type, token) => {
    let secretKey, decoded;
    switch (type) {
      case "access":
        secretKey = process.env.ACCESS_SECRET;
        break;
      case "refresh":
        secretKey = process.env.REFRESH_SECRET;
        break;
      default:
        return null;
    }

    try {
      // 통과가 됐다 => payload가 반환된다.
      decoded = verify(token, secretKey);
    } catch (err) {
      console.log(`JWT Error: ${err.message}`);
      return null;
    }
    return decoded;
  },
};
