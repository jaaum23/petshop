/*
  Warnings:

  - A unique constraint covering the columns `[scheduled_at]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_scheduled_at_key" ON "appointments"("scheduled_at");
