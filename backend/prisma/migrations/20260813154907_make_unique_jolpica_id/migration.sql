/*
  Warnings:

  - A unique constraint covering the columns `[jolpicaId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jolpicaId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Driver_jolpicaId_key" ON "Driver"("jolpicaId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_jolpicaId_key" ON "Team"("jolpicaId");
