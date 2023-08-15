/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CaseInstanceReview` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `CaseInstanceReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "creatorId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CaseInstanceReview" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInstance" ADD CONSTRAINT "CaseInstance_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInstanceReview" ADD CONSTRAINT "CaseInstanceReview_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInstanceReview" ADD CONSTRAINT "CaseInstanceReview_caseInstanceId_fkey" FOREIGN KEY ("caseInstanceId") REFERENCES "CaseInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInstanceReview" ADD CONSTRAINT "CaseInstanceReview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
