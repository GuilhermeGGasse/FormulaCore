-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_teamId_fkey";

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "teamId" DROP NOT NULL,
ALTER COLUMN "jolpicaId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
