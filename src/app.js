require("dotenv").config();
const express=require("express");
const app=express();
const PORT=5000;
const { PrismaClient }=require("@prisma/client");
const prisma=new PrismaClient();



app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed", error);
  }
});