-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "tutor_name" TEXT NOT NULL,
    "pet_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
