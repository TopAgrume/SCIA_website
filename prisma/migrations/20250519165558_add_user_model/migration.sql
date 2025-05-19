-- CreateEnum
CREATE TYPE "article_type" AS ENUM ('ARTICLE', 'VIDEO');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('VISITOR', 'STUDENT', 'ADMIN');

-- CreateTable
CREATE TABLE "databasechangelog" (
    "id" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "dateexecuted" TIMESTAMP(6) NOT NULL,
    "orderexecuted" INTEGER NOT NULL,
    "exectype" VARCHAR(10) NOT NULL,
    "md5sum" VARCHAR(35),
    "description" VARCHAR(255),
    "comments" VARCHAR(255),
    "tag" VARCHAR(255),
    "liquibase" VARCHAR(20),
    "contexts" VARCHAR(255),
    "labels" VARCHAR(255),
    "deployment_id" VARCHAR(10)
);

-- CreateTable
CREATE TABLE "databasechangeloglock" (
    "id" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "lockgranted" TIMESTAMP(6),
    "lockedby" VARCHAR(255),

    CONSTRAINT "databasechangeloglock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_attending" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "is_attending" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_attending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" "article_type" NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'VISITOR',
    "is_scia" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "event_attending" ADD CONSTRAINT "event_attending_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
