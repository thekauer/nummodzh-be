-- CreateEnum
CREATE TYPE "Certainty" AS ENUM ('FIX', 'MAYBE', 'IDK', 'ERROR');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "answer" TEXT,
    "certainty" "Certainty",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
