import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../../interfaces";

const JWT_SECRET = "&uper@1234.";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
  //The generated token can be sent to the client, where it is stored (e.g., in localStorage) and used for subsequent authenticated requests.

  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, JWT_SECRET) as JWTUser;
    } catch {
      return null;
    }
  }
}

export default JWTService;