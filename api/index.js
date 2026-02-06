var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express8 from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";

// prisma/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id @default(uuid())\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  providerName  String?\n  role          UserRole   @default(customer)\n  phone         String?\n  status        UserStatus @default(activate)\n  categories    Category[]\n  order         Order[]\n  provider      Provider?\n  reviews       Review[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  admin\n  customer\n  provider\n}\n\nenum UserStatus {\n  activate\n  suspend\n}\n\nmodel Category {\n  id            String   @id @default(uuid())\n  name          String   @unique\n  slug          String   @unique\n  categoryImage String?\n  isActive      Boolean  @default(true)\n  publishedBy   String\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  user          User     @relation(fields: [publishedBy], references: [id])\n  menus         Menu[]\n\n  @@map("category")\n}\n\nmodel Menu {\n  id         String   @id @default(uuid())\n  providerId String\n  provider   Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)\n\n  name        String\n  description String\n  price       Float\n  image       String?\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  cuisine String[]\n\n  isAvailable Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  orderItems OrderItem[]\n  reviews    Review[]\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  providerId String\n  provider   Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)\n\n  phone   String\n  address String\n\n  totalAmount Float\n  status      OrderStatus @default(placed)\n  invoice     String?     @unique\n  orderItems  OrderItem[]\n  review      Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  menuId String\n  menu   Menu   @relation(fields: [menuId], references: [id])\n\n  quantity Int\n  price    Float\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum OrderStatus {\n  placed\n  preparing\n  ready\n  delivered\n  cancelled\n}\n\nmodel Provider {\n  id     String @id @default(uuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  menus  Menu[]\n  orders Order[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  userId    String\n  menuId    String\n  orderId   String\n  rating    Int\n  comment   String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user  User  @relation(fields: [userId], references: [id])\n  menu  Menu  @relation(fields: [menuId], references: [id])\n  order Order @relation(fields: [orderId], references: [id])\n\n  @@unique([userId, menuId, orderId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"providerName","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToUser"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"Provider","relationName":"ProviderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"categoryImage","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"publishedBy","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"CategoryToUser"},{"name":"menus","kind":"object","type":"Menu","relationName":"CategoryToMenu"}],"dbName":"category"},"Menu":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"MenuToProvider"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMenu"},{"name":"cuisine","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MenuToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MenuToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"OrderToProvider"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"invoice","kind":"scalar","type":"String"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"review","kind":"object","type":"Review","relationName":"OrderToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"menuId","kind":"scalar","type":"String"},{"name":"menu","kind":"object","type":"Menu","relationName":"MenuToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Provider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderToUser"},{"name":"menus","kind":"object","type":"Menu","relationName":"MenuToProvider"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProvider"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"menuId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"menu","kind":"object","type":"Menu","relationName":"MenuToReview"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToReview"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// prisma/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MenuScalarFieldEnum: () => MenuScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderScalarFieldEnum: () => ProviderScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.2.0",
  engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Category: "Category",
  Menu: "Menu",
  Order: "Order",
  OrderItem: "OrderItem",
  Provider: "Provider",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  providerName: "providerName",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  categoryImage: "categoryImage",
  isActive: "isActive",
  publishedBy: "publishedBy",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MenuScalarFieldEnum = {
  id: "id",
  providerId: "providerId",
  name: "name",
  description: "description",
  price: "price",
  image: "image",
  categoryId: "categoryId",
  cuisine: "cuisine",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  providerId: "providerId",
  phone: "phone",
  address: "address",
  totalAmount: "totalAmount",
  status: "status",
  invoice: "invoice",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  menuId: "menuId",
  quantity: "quantity",
  price: "price",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProviderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  menuId: "menuId",
  orderId: "orderId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// prisma/generated/prisma/enums.ts
var UserRole = {
  admin: "admin",
  customer: "customer",
  provider: "provider"
};
var OrderStatus = {
  placed: "placed",
  preparing: "preparing",
  ready: "ready",
  delivered: "delivered",
  cancelled: "cancelled"
};

// prisma/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
var connectionString = process.env.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  // trustedOrigins: ["https://frontend-foodhub-mrashed21.vercel.app"],
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins2 = [
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
      "https://frontend-foodhub-mrashed21.vercel.app",
      "https://backend-foodhub-mrashed21.vercel.app"
    ].filter(Boolean);
    if (!origin || allowedOrigins2.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
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
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      providerName: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "activate",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      try {
        const verifyURL = `${process.env.APP_ORIGIN}/auth/verify-email?token=${token}`;
        await transporter.sendMail({
          from: '"Food Hub" <no-reply@foodhub.com>',
          to: user.email,
          subject: "Food Hub \u2013 Verify your email address",
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
      <h2>Welcome to Food Hub \u{1F354}</h2>
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
        Hungry already? \u{1F604}<br />
        <strong>Food Hub Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Food Hub. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
        `
        });
      } catch (error) {
        throw new Error("Failed to send verification email");
      }
    }
  }
});

// src/middleware/error-handler.ts
var errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let error = null;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided";
    error = err.message;
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    statusCode = 400;
    if (err.code === "P2002") {
      const target = err.meta?.target;
      message = "Duplicate value error";
      if (Array.isArray(target)) {
        error = `${target.join(", ")} already exists`;
      } else {
        error = "Unique field already exists";
      }
    } else if (err.code === "P2003") {
      message = "Invalid reference";
      error = "Related record not found";
    } else {
      message = "Database error";
      error = err.message;
    }
  } else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
    error = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    error
  });
};
var error_handler_default = errorHandler;

// src/middleware/not-found.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
};
var not_found_default = notFound;

// src/middleware/auth-middleware.ts
var authMiddleWare = (...role) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not Authorized"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email is not verified"
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (role.length && !role.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbiden! You dont have access"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_middleware_default = authMiddleWare;

// src/modules/category/category.route.ts
import express from "express";

// src/helper/pagination-function.ts
var paginationFuction = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var pagination_function_default = paginationFuction;

// src/modules/category/category.service.ts
var createCategory = async (data, publishedBy) => {
  const existing = await prisma.category.findUnique({
    where: { name: data.name }
  });
  if (existing) {
    throw new Error("Category name already exists");
  }
  return prisma.category.create({
    data: {
      ...data,
      publishedBy
    }
  });
};
var getAllCategories = async ({
  search,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  andConditions.push({
    isActive: true
  });
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          slug: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const result = await prisma.category.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      createdAt: true,
      categoryImage: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  const totaData = await prisma.category.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: result,
    pagination: {
      totaData,
      page,
      limit,
      totalPage: Math.ceil(totaData / limit)
    }
  };
};
var getAllCategoriesForAdmin = async ({
  search,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          slug: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const result = await prisma.category.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  const totaData = await prisma.category.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: result,
    pagination: {
      totaData,
      page,
      limit,
      totalPage: Math.ceil(totaData / limit)
    }
  };
};
var updateCategory = async (data, id) => {
  const existing = await prisma.category.findUnique({
    where: { id }
  });
  if (!existing) {
    throw new Error("Category not found");
  }
  return prisma.category.update({
    where: { id },
    data
  });
};
var deleteCategory = async (id) => {
  const existing = await prisma.category.findUnique({
    where: { id }
  });
  if (!existing) {
    throw new Error("Category not found");
  }
  return prisma.category.delete({
    where: { id }
  });
};
var categoryService = {
  createCategory,
  getAllCategories,
  getAllCategoriesForAdmin,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await categoryService.createCategory(req.body, user?.id);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllCategories2 = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const result = await categoryService.getAllCategories({
      search: searchTerm,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllCategoriesForAdmin2 = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const result = await categoryService.getAllCategoriesForAdmin({
      search: searchTerm,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateCategory2 = async (req, res, next) => {
  const user = req.user;
  const categoryId = req.body.id;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await categoryService.updateCategory(req.body, categoryId);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteCategory2 = async (req, res, next) => {
  const user = req.user;
  const categoryId = req.body.id;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getAllCategoriesForAdmin: getAllCategoriesForAdmin2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var router = express.Router();
router.get("/", categoryController.getAllCategories);
router.get("/admin", auth_middleware_default("admin" /* admin */), categoryController.getAllCategoriesForAdmin);
router.post(
  "/",
  auth_middleware_default("admin" /* admin */),
  categoryController.createCategory
);
router.patch(
  "/",
  auth_middleware_default("admin" /* admin */),
  categoryController.updateCategory
);
router.delete(
  "/",
  auth_middleware_default("admin" /* admin */),
  categoryController.deleteCategory
);
var categoryRouter = router;

// src/modules/menu/menu.route.ts
import express2 from "express";

// src/modules/menu/menu.service.ts
var createMenu = async (data, providerId) => {
  return prisma.menu.create({
    data: {
      ...data,
      providerId
    }
  });
};
var getAllMenu = async ({
  search,
  categoryId,
  priceSort,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  andConditions.push({
    isAvailable: true
  });
  if (search) {
    andConditions.push({
      name: {
        contains: search,
        mode: "insensitive"
      }
    });
  }
  if (categoryId) {
    andConditions.push({
      categoryId
    });
  }
  let orderBy = { createdAt: "desc" };
  if (priceSort === "low_to_high") {
    orderBy = { price: "asc" };
  }
  if (priceSort === "high_to_low") {
    orderBy = { price: "desc" };
  }
  const data = await prisma.menu.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      },
      provider: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              providerName: true
            }
          }
        }
      }
    }
  });
  const totalData = await prisma.menu.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var getAdminMenu = async ({
  search,
  categoryId,
  priceSort,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      name: {
        contains: search,
        mode: "insensitive"
      }
    });
  }
  if (categoryId) {
    andConditions.push({
      categoryId
    });
  }
  let orderBy = { createdAt: "desc" };
  if (priceSort === "low_to_high") {
    orderBy = { price: "asc" };
  }
  if (priceSort === "high_to_low") {
    orderBy = { price: "desc" };
  }
  const data = await prisma.menu.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      },
      provider: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              providerName: true
            }
          }
        }
      }
    }
  });
  const totalData = await prisma.menu.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var getSingleMenu = async (id) => {
  return prisma.menu.findFirst({
    where: {
      id,
      isAvailable: true
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      },
      provider: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              providerName: true
            }
          }
        }
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    }
  });
};
var getMenuByProvider = async ({
  providerId,
  search,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  andConditions.push({
    providerId
  });
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const data = await prisma.menu.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const totalData = await prisma.menu.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var updateMenu = async (data, providerId) => {
  const { id, providerId: _, createdAt, updatedAt, ...updateData } = data;
  const menu = await prisma.menu.findFirst({
    where: {
      id,
      providerId
    }
  });
  if (!menu) {
    throw new Error("Menu not found or you are not authorized to update");
  }
  return prisma.menu.update({
    where: { id },
    data: updateData
  });
};
var deleteMenu = async (data, providerId) => {
  const { id } = data;
  const menu = await prisma.menu.findFirst({
    where: {
      id,
      providerId
    }
  });
  if (!menu) {
    throw new Error("Menu not found or you are not authorized to delete");
  }
  return prisma.menu.delete({
    where: { id }
  });
};
var menuService = {
  createMenu,
  getAllMenu,
  getAdminMenu,
  getSingleMenu,
  getMenuByProvider,
  updateMenu,
  deleteMenu
};

// src/modules/menu/menu.controller.ts
var createMenu2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can create menu"
    });
  }
  try {
    let provider = await prisma.provider.findUnique({
      where: { userId: user.id }
    });
    if (!provider) {
      provider = await prisma.provider.create({
        data: { userId: user.id }
      });
    }
    const result = await menuService.createMenu(req.body, provider.id);
    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllMenu2 = async (req, res, next) => {
  try {
    const { search, category, priceRange } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const categoryId = typeof category === "string" ? category : void 0;
    const priceSort = typeof priceRange === "string" ? priceRange : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const result = await menuService.getAllMenu({
      search: searchTerm,
      categoryId,
      priceSort,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAdminMenu2 = async (req, res, next) => {
  try {
    const { search, category, priceRange } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const categoryId = typeof category === "string" ? category : void 0;
    const priceSort = typeof priceRange === "string" ? priceRange : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const result = await menuService.getAdminMenu({
      search: searchTerm,
      categoryId,
      priceSort,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getSingleMenu2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid menu id is required"
      });
    }
    const result = await menuService.getSingleMenu(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMenuByProvider2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can get menu"
    });
  }
  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: user.id }
    });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const result = await menuService.getMenuByProvider({
      providerId: provider.id,
      search: searchTerm,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateMenu2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can update menu"
    });
  }
  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: user.id }
    });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    const result = await menuService.updateMenu(req.body, provider.id);
    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteMenu2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can delete menu"
    });
  }
  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: user.id }
    });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    const result = await menuService.deleteMenu(req.body, provider.id);
    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var menuController = {
  createMenu: createMenu2,
  getAllMenu: getAllMenu2,
  getAdminMenu: getAdminMenu2,
  getSingleMenu: getSingleMenu2,
  getMenuByProvider: getMenuByProvider2,
  updateMenu: updateMenu2,
  deleteMenu: deleteMenu2
};

// src/modules/menu/menu.route.ts
var router2 = express2.Router();
router2.get("/", menuController.getAllMenu);
router2.get("/admin", auth_middleware_default("admin" /* admin */), menuController.getAdminMenu);
router2.get(
  "/provider",
  auth_middleware_default("provider" /* provider */),
  menuController.getMenuByProvider
);
router2.get("/:id", menuController.getSingleMenu);
router2.post("/", auth_middleware_default("provider" /* provider */), menuController.createMenu);
router2.patch("/", auth_middleware_default("provider" /* provider */), menuController.updateMenu);
router2.delete(
  "/",
  auth_middleware_default("provider" /* provider */),
  menuController.deleteMenu
);
var menuRouter = router2;

// src/modules/order/order.route.ts
import { Router } from "express";

// src/modules/order/order.service.ts
var generateInvoice = () => {
  const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${date}-${random}`;
};
var createOrder = async (userId, payload) => {
  const { items, phone, address } = payload;
  if (!items?.length) {
    throw new Error("Order items are required");
  }
  const menus = await prisma.menu.findMany({
    where: {
      id: { in: items.map((i) => i.menuId) }
    },
    select: {
      id: true,
      providerId: true
    }
  });
  if (menus.length !== items.length) {
    throw new Error("Invalid menu detected");
  }
  const menuProviderMap = new Map(menus.map((m) => [m.id, m.providerId]));
  const providerMap = /* @__PURE__ */ new Map();
  for (const item of items) {
    const providerId = menuProviderMap.get(item.menuId);
    if (!providerId) {
      throw new Error(`Provider not found for menuId: ${item.menuId}`);
    }
    if (!providerMap.has(providerId)) {
      providerMap.set(providerId, []);
    }
    providerMap.get(providerId).push({ ...item, providerId });
  }
  const createdOrders = [];
  for (const [providerId, providerItems] of providerMap.entries()) {
    const totalAmount = providerItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const order = await prisma.order.create({
      data: {
        invoice: generateInvoice(),
        phone,
        address,
        totalAmount,
        status: OrderStatus.placed,
        user: {
          connect: { id: userId }
        },
        provider: {
          connect: { id: providerId }
        },
        orderItems: {
          create: providerItems.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    });
    createdOrders.push(order);
  }
  return createdOrders;
};
var getMyOrders = async (userId, {
  search,
  page,
  limit,
  skip
}) => {
  const andConditions = [{ userId }];
  if (search) {
    andConditions.push({
      OR: [
        { phone: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { invoice: { contains: search, mode: "insensitive" } }
      ]
    });
  }
  const data = await prisma.order.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      phone: true,
      address: true,
      invoice: true,
      totalAmount: true,
      status: true,
      createdAt: true,
      provider: {
        select: {
          id: true,
          user: {
            select: {
              providerName: true
            }
          }
        }
      },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          menu: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    }
  });
  const totalData = await prisma.order.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var getOrderDetails = async (orderId, user) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { menu: true }
      },
      provider: {
        include: { user: true }
      },
      user: true
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
var isValidOrderStatus = (value) => {
  return Object.values(OrderStatus).includes(value);
};
var getOrdersForProvider = async (user, query) => {
  const provider = await prisma.provider.findUnique({
    where: { userId: user.id }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  const { page, limit, skip, search, status } = query;
  const andConditions = [{ providerId: provider.id }];
  if (search) {
    andConditions.push({
      OR: [
        {
          invoice: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (status) {
    if (!isValidOrderStatus(status)) {
      throw new Error("Invalid order status");
    }
    andConditions.push({
      status
    });
  }
  const data = await prisma.order.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      invoice: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      providerId: true,
      provider: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true
        }
      }
    }
  });
  const totalData = await prisma.order.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      page,
      limit,
      totalData,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var updateOrderStatus = async (payload, user) => {
  const order = await prisma.order.findUnique({
    where: { id: payload.id }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (user.role === UserRole.customer) {
    if (order.userId !== user.id) {
      throw new Error("Unauthorized");
    }
    if (order.status !== OrderStatus.placed && order.status !== OrderStatus.preparing) {
      throw new Error("Order can no longer be cancelled");
    }
    if (payload.status !== OrderStatus.cancelled) {
      throw new Error("Invalid action");
    }
  }
  if (user.role === UserRole.provider) {
    const provider = await prisma.provider.findUnique({
      where: { id: order.providerId },
      select: { userId: true }
    });
    if (!provider || provider.userId !== user.id) {
      throw new Error("Unauthorized");
    }
  }
  return prisma.order.update({
    where: { id: payload.id },
    data: { status: payload.status }
  });
};
var getAllOrdersForAdmin = async (user, query) => {
  if (user.role !== UserRole.admin) {
    throw new Error("Unauthorized");
  }
  const { page, limit, skip, search, status, provider } = query;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          invoice: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (status) {
    if (!isValidOrderStatus(status)) {
      throw new Error("Invalid order status");
    }
    andConditions.push({
      status
    });
  }
  if (provider) {
    andConditions.push({
      providerId: provider
    });
  }
  const data = await prisma.order.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      invoice: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      provider: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              providerName: true
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true
        }
      }
    }
  });
  const totalData = await prisma.order.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data,
    pagination: {
      page,
      limit,
      totalData,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var orderService = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getOrdersForProvider,
  getAllOrdersForAdmin,
  updateOrderStatus
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
  const { phone, address, items } = req.body;
  if (!phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Phone and address are required"
    });
  }
  if (!items?.length) {
    return res.status(400).json({
      success: false,
      message: "Order items are required"
    });
  }
  try {
    const result = await orderService.createOrder(user.id, req.body);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMyOrders2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const params = {
      page,
      limit,
      skip,
      ...searchTerm ? { search: searchTerm } : {}
    };
    const result = await orderService.getMyOrders(req.user.id, params);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getOrderDetails2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await orderService.getOrderDetails(
      req.params.id,
      req.user
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getOrdersForProvider2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const { search, status } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const statusTerm = typeof status === "string" ? status : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const params = {
      page,
      limit,
      skip
    };
    if (searchTerm) {
      params.search = searchTerm;
    }
    if (statusTerm) {
      params.status = statusTerm;
    }
    const result = await orderService.getOrdersForProvider(user, params);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateOrderStatus2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await orderService.updateOrderStatus(req.body, user);
    res.status(200).json({
      success: true,
      message: "Order updated",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllOrdersForAdmin2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const { search, status, provider } = req.query;
    const { page, limit, skip } = pagination_function_default(req.query);
    const params = {
      page,
      limit,
      skip
    };
    if (typeof search === "string") {
      params.search = search;
    }
    if (typeof status === "string") {
      params.status = status;
    }
    if (typeof provider === "string") {
      params.provider = provider;
    }
    const result = await orderService.getAllOrdersForAdmin(user, params);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var orderController = {
  createOrder: createOrder2,
  getMyOrders: getMyOrders2,
  getOrderDetails: getOrderDetails2,
  getOrdersForProvider: getOrdersForProvider2,
  updateOrderStatus: updateOrderStatus2,
  getAllOrdersForAdmin: getAllOrdersForAdmin2
};

// src/modules/order/order.route.ts
var router3 = Router();
router3.get(
  "/admin",
  auth_middleware_default("admin" /* admin */),
  orderController.getAllOrdersForAdmin
);
router3.get(
  "/provider",
  auth_middleware_default("provider" /* provider */),
  orderController.getOrdersForProvider
);
router3.get("/", auth_middleware_default("customer" /* customer */), orderController.getMyOrders);
router3.get(
  "/:id",
  auth_middleware_default("customer" /* customer */, "provider" /* provider */, "admin" /* admin */),
  orderController.getOrderDetails
);
router3.post(
  "/",
  auth_middleware_default("customer" /* customer */),
  orderController.createOrder
);
router3.patch(
  "/",
  auth_middleware_default("customer" /* customer */, "provider" /* provider */),
  orderController.updateOrderStatus
);
var orderRouter = router3;

// src/modules/profile/profile.route.ts
import express3 from "express";

// src/modules/profile/profile.service.ts
var updateMyProfile = async (userId, role, data) => {
  const updateData = {
    name: data.name,
    phone: data.phone,
    image: data.image
  };
  if (role === "provider") {
    updateData.providerName = data.providerName;
  }
  return prisma.user.update({
    where: { id: userId },
    data: updateData
  });
};
var profileService = { updateMyProfile };

// src/modules/profile/profile.controller.ts
var updateMyProfile2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { name, phone, providerName, image } = req.body;
    const result = await profileService.updateMyProfile(
      userId,
      req.user?.role,
      {
        name,
        phone,
        providerName,
        image
      }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var profileController = { updateMyProfile: updateMyProfile2 };

// src/modules/profile/profile.route.ts
var router4 = express3.Router();
router4.patch(
  "/",
  auth_middleware_default(),
  profileController.updateMyProfile
);
var profileRouter = router4;

// src/modules/provider/provider.route.ts
import express4 from "express";

// src/modules/provider/provider.service.ts
var getProviderForHome = async () => {
  return prisma.provider.findMany({
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          providerName: true
        }
      },
      _count: {
        select: {
          menus: true
        }
      }
    }
  });
};
var getSingleProvider = async (id) => {
  return prisma.provider.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          providerName: true
        }
      },
      menus: true
    }
  });
};
var providerService = {
  getProviderForHome,
  getSingleProvider
};

// src/modules/provider/provider.controller.ts
var getProviderForHome2 = async (req, res, next) => {
  try {
    const result = await providerService.getProviderForHome();
    res.status(200).json({
      success: true,
      message: "Provider fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getSingleProvider2 = async (req, res, next) => {
  try {
    const result = await providerService.getSingleProvider(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Provider fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var providerController = {
  getProviderForHome: getProviderForHome2,
  getSingleProvider: getSingleProvider2
};

// src/modules/provider/provider.route.ts
var router5 = express4.Router();
router5.get("/home", providerController.getProviderForHome);
router5.get("/:id", providerController.getSingleProvider);
var providerRouter = router5;

// src/modules/review/review.route.ts
import express5 from "express";

// src/modules/review/review.service.ts
var createReview = async (data, userId) => {
  const { orderId, menuId, rating, comment } = data;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        select: { menuId: true }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Unauthorized order access");
  }
  if (order.status !== "delivered") {
    throw new Error("Order is not delivered yet");
  }
  const isMenuInOrder = order.orderItems.some((item) => item.menuId === menuId);
  if (!isMenuInOrder) {
    throw new Error("Menu does not belong to this order");
  }
  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      userId,
      menuId,
      orderId
    }
  });
  if (alreadyReviewed) {
    throw new Error("Review already exists");
  }
  return prisma.review.create({
    data: {
      userId,
      menuId,
      orderId,
      rating,
      ...comment !== void 0 && { comment }
    }
  });
};
var getReviewForHome = async () => {
  return prisma.review.findMany({
    where: {
      rating: {
        gte: 4
      }
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      menu: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
};
var getAllReviewsForAdmin = async () => {
  return prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      menu: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
};
var getReviewForUser = async (userId) => {
  return prisma.review.findMany({
    where: {
      userId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      menu: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
};
var getReviewForProvider = async (providerId) => {
  return prisma.review.findMany({
    where: {
      menu: {
        providerId
      }
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      menu: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
};
var reviewService = {
  createReview,
  getReviewForHome,
  getAllReviewsForAdmin,
  getReviewForUser,
  getReviewForProvider
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await reviewService.createReview(req.body, user?.id);
    res.status(201).json({
      success: true,
      message: "review added successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviewForHome2 = async (req, res, next) => {
  try {
    const result = await reviewService.getReviewForHome();
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllReviewsForAdmin2 = async (req, res, next) => {
  try {
    const result = await reviewService.getAllReviewsForAdmin();
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviewForUser2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await reviewService.getReviewForUser(user?.id);
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviewForProvider2 = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const result = await reviewService.getReviewForProvider(user?.id);
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var reviewController = {
  createReview: createReview2,
  getReviewForHome: getReviewForHome2,
  getAllReviewsForAdmin: getAllReviewsForAdmin2,
  getReviewForUser: getReviewForUser2,
  getReviewForProvider: getReviewForProvider2
};

// src/modules/review/review.route.ts
var router6 = express5.Router();
router6.get("/home", reviewController.getReviewForHome);
router6.get("/admin", auth_middleware_default("admin" /* admin */), reviewController.getAllReviewsForAdmin);
router6.get("/user", auth_middleware_default("customer" /* customer */), reviewController.getReviewForUser);
router6.get("/provider", auth_middleware_default("provider" /* provider */), reviewController.getReviewForProvider);
router6.post(
  "/",
  auth_middleware_default("customer" /* customer */),
  reviewController.createReview
);
var reviewRouter = router6;

// src/modules/stats/starts.route.ts
import express6 from "express";

// src/modules/stats/stats.service.ts
var getStats = async () => {
  return {
    totalUsers: await prisma.user.count(),
    totalProviders: await prisma.user.count({
      where: { role: "provider" /* provider */ }
    }),
    totalCustomers: await prisma.user.count({
      where: { role: "customer" /* customer */ }
    }),
    totalOrders: await prisma.order.count(),
    totalPendingOrders: await prisma.order.count({
      where: { status: "placed" }
    }),
    totalCompletedOrders: await prisma.order.count({
      where: { status: "delivered" }
    }),
    totalCancelledOrders: await prisma.order.count({
      where: { status: "cancelled" }
    }),
    totalDeliveredOrders: await prisma.order.count({
      where: { status: "delivered" }
    }),
    totalMenus: await prisma.menu.count(),
    totalCategories: await prisma.category.count(),
    totalReviews: await prisma.review.count()
  };
};
var getStatsForProvider = async (providerId) => {
  return {
    totalOrders: await prisma.order.count({
      where: { providerId }
    }),
    totalPendingOrders: await prisma.order.count({
      where: { status: "placed", providerId }
    }),
    totalCompletedOrders: await prisma.order.count({
      where: { status: "delivered", providerId }
    }),
    totalCancelledOrders: await prisma.order.count({
      where: { status: "cancelled", providerId }
    }),
    totalDeliveredOrders: await prisma.order.count({
      where: { status: "delivered", providerId }
    }),
    totalMenus: await prisma.menu.count({
      where: { providerId }
    })
  };
};
var statsService = {
  getStats,
  getStatsForProvider
};

// src/modules/stats/starts.controller.ts
var getStats2 = async (req, res, next) => {
  try {
    const stats = await statsService.getStats();
    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
var getStatsForProvider2 = async (req, res, next) => {
  const providerId = req.user?.id;
  try {
    const stats = await statsService.getStatsForProvider(providerId);
    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
var statsController = { getStats: getStats2, getStatsForProvider: getStatsForProvider2 };

// src/modules/stats/starts.route.ts
var router7 = express6.Router();
router7.get(
  "/provider",
  auth_middleware_default("provider" /* provider */),
  statsController.getStatsForProvider
);
router7.get("/admin", auth_middleware_default("admin" /* admin */), statsController.getStats);
var statsRouter = router7;

// src/modules/user/user.route.ts
import express7 from "express";

// src/modules/user/user.service.ts
var getAllUsers = async ({
  search,
  page,
  limit,
  skip,
  role
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const users = await prisma.user.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      providerName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      provider: {
        select: {
          id: true
        }
      }
    }
  });
  const totalData = await prisma.user.count({
    where: {
      role,
      AND: andConditions
    }
  });
  return {
    data: users.map((user) => ({
      ...user,
      providerId: user.provider?.id ?? null,
      provider: void 0
    })),
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit)
    }
  };
};
var updateUserStatus = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data: {
      status: data.status
    }
  });
};
var userService = {
  getAllUsers,
  updateUserStatus
};

// src/modules/user/user.controller.ts
var getAllUsers2 = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : void 0;
    const { page, limit, skip } = pagination_function_default(req.query);
    const params = {
      page,
      limit,
      skip,
      role: req.query.role
    };
    if (searchTerm) {
      Object.assign(params, { search: searchTerm });
    }
    const result = await userService.getAllUsers(params);
    res.status(201).json({
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateUserStatus2 = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required"
      });
    }
    const result = await userService.updateUserStatus(id, { status });
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var userController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/modules/user/user.route.ts
var router8 = express7.Router();
router8.get("/", auth_middleware_default("admin" /* admin */), userController.getAllUsers);
router8.patch(
  "/",
  auth_middleware_default("admin" /* admin */),
  userController.updateUserStatus
);
var userRouter = router8;

// src/router/router.ts
import { Router as Router2 } from "express";
var router9 = Router2();
router9.use("/category", categoryRouter);
router9.use("/user", userRouter);
router9.use("/menu", menuRouter);
router9.use("/order", orderRouter);
router9.use("/review", reviewRouter);
router9.use("/provider", providerRouter);
router9.use("/profile", profileRouter);
router9.use("/stats", statsRouter);
var router_default = router9;

// src/app.ts
var app = express8();
app.use(express8.json());
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL,
  // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "https://frontend-foodhub-mrashed21.vercel.app",
  "https://backend-foodhub-mrashed21.vercel.app"
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", router_default);
app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});
app.use(not_found_default);
app.use(error_handler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
//! get category for admin
//! create category
//! update category
//! create menu
//! get menu for provider
//! get single menu
//! CREATE ORDER (CUSTOMER)
//!  CUSTOMER ORDERS
//!ORDER DETAILS (ALL ROLES)
//!PROVIDER ORDERS + SEARCH
//! UPDATE / CANCEL ORDER
//! get all order dfor admin
//! create order
//! customer orders
//! order details
//! provider order list
//! update / cancel order
//! get all order for admin
//! Provider orders list (+ search)
//!Get logged-in user's orders
//! Get single order details (customer/provider/admin)
//! Create order (customer)
//! Update order status / cancel
//! get  review for homepage
//! create review
//! get all stats for provider
//! update user status
