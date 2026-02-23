import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // trustedOrigins: ["https://frontend-foodhub-mrashed21.vercel.app"],

  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");

    const allowedOrigins = [
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
      "https://frontend-foodhub-mrashed21.vercel.app",
      "https://backend-foodhub-mrashed21.vercel.app",
    ].filter(Boolean);

    // Check if origin matches allowed origins or Vercel pattern
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)
    ) {
      return [origin];
    }

    return [];
  },

  basePath: "/api/auth",

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      providerName: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "activate",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      try {
        const verifyURL = `${process.env.APP_ORIGIN}/auth/verify-email?token=${token}`;

        await transporter.sendMail({
          from: '"Food Hub" <no-reply@foodhub.com>',
          to: user.email,
          subject: "Food Hub – Verify your email address",
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #ff6b35;
      padding: 24px;
      text-align: center;
      color: #ffffff;
    }
    .header h2 {
      margin: 0;
    }
    .content {
      padding: 32px;
      line-height: 1.7;
    }
    .button {
      display: inline-block;
      margin: 28px 0;
      padding: 14px 28px;
      background-color: #ff6b35;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      padding: 20px;
      font-size: 13px;
      color: #777777;
      background-color: #f4f6f8;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Food Hub 🍔</h2>
    </div>

    <div class="content">
      <p>Hi <strong>${user.name ?? "there"}</strong>,</p>

      <p>
        Thank you for joining <strong>Food Hub</strong>!
        To start ordering your favorite meals and enjoy our services,
        please confirm your email address by clicking the button below.
      </p>

      <p style="text-align: center;">
        <a href="${verifyURL}" class="button">Verify Email Address</a>
      </p>

      <p>
        If the button above does not work, copy and paste the following link into your browser:
      </p>

      <p style="word-break: break-all;">
        <a href="${verifyURL}">${verifyURL}</a>
      </p>

      <p>
        This verification link will expire for security reasons.
        If you did not create a Food Hub account, you can safely ignore this email.
      </p>

      <p>
        Hungry already? 😄<br />
        <strong>Food Hub Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>
        © ${new Date().getFullYear()} Food Hub. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
        `,
        });
      } catch (error) {
        throw new Error("Failed to send verification email");
      }
    },
  },

  // advanced: {
  //   defaultCookieAttributes: {
  //     sameSite: "none",
  //     secure: true,
  //     httpOnly: true,
  //     //extra
  //     path: "/",
  //   },
  //   trustProxy: true,
  //   cookies: {
  //     state: {
  //       attributes: {
  //         sameSite: "none",
  //         secure: true,
  //         // extra
  //         path: "/",
  //       },
  //     },
  //   },
  // },

  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
        },
      },
    },
  },

  // advanced: {
  //   defaultCookieAttributes: {
  //     sameSite: "none",
  //     secure: true,
  //     httpOnly: true,
  //     path: "/",
  //   },
  //   trustProxy: true,
  //   cookies: {
  //     state: {
  //       attributes: {
  //         sameSite: "none",
  //         secure: true,
  //         path: "/",
  //         ...(process.env.NODE_ENV === "production" && {
  //           domain: ".vercel.app",
  //         }),
  //       },
  //     },
  //   },
  // },
});
