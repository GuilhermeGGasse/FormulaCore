-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_carId_fkey";

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
