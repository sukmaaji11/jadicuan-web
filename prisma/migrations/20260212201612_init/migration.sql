-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PREMIUM');

-- CreateEnum
CREATE TYPE "SignalStatus" AS ENUM ('OPEN', 'TP1', 'TP2', 'SL', 'CLOSED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PREMIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signal" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "timeframe" TEXT,
    "entryMin" DOUBLE PRECISION NOT NULL,
    "entryMax" DOUBLE PRECISION NOT NULL,
    "tp1" DOUBLE PRECISION,
    "tp2" DOUBLE PRECISION,
    "sl" DOUBLE PRECISION NOT NULL,
    "status" "SignalStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "lot" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tracker" ADD CONSTRAINT "Tracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
