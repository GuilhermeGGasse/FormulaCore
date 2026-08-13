/*
  Warnings:

  - A unique constraint covering the columns `[season,round]` on the table `Race` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raceId,driverId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `round` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "round" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Race_season_round_key" ON "Race"("season", "round");

-- CreateIndex
CREATE UNIQUE INDEX "Result_raceId_driverId_key" ON "Result"("raceId", "driverId");
