/*
  Warnings:

  - Added the required column `is_translated` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "is_translated" BOOLEAN NOT NULL;
