-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sids" TEXT[] DEFAULT ARRAY[]::TEXT[];
