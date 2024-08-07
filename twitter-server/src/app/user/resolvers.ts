import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "../services/jwt";

interface GoogleTokenInfo {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    nbf: string;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
} 

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOAuthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenInfo>(googleOAuthURL.toString(), {
      responseType: "json",
    });
  
    // console.log(data);
    const user = await prismaClient.user.findUnique({ where: { email: data.email } });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });
    }
    
    const userInDB = await prismaClient.user.findUnique({ where: { email: data.email }, });

    if (!userInDB) return new Error(`User with email not found`);
      
    const userToken = JWTService.generateTokenForUser(userInDB);

  return userToken;
  },
};

export const resolvers = { queries };