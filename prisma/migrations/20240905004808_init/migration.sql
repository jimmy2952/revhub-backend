-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ReviewableType" AS ENUM ('Resource', 'Event', 'EventItem');

-- CreateEnum
CREATE TYPE "LikableType" AS ENUM ('Resource', 'Review');

-- CreateEnum
CREATE TYPE "LIKE_TYPE" AS ENUM ('LIKE', 'UNLIKE');

-- CreateTable
CREATE TABLE "ResourceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResourceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resourceUrl" VARCHAR(2048) NOT NULL,
    "imageUrl" VARCHAR(2048) NOT NULL,
    "status" "STATUS" NOT NULL,
    "resourceTypeId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "EventItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventItemsOnResources" (
    "eventItemId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventItemsOnResources_pkey" PRIMARY KEY ("eventItemId","resourceId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "status" "STATUS" NOT NULL,
    "reviewableId" INTEGER NOT NULL,
    "reviewableType" "ReviewableType" NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "likeType" "LIKE_TYPE" NOT NULL,
    "likableId" INTEGER NOT NULL,
    "likableType" "LikableType" NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceTypeId_fkey" FOREIGN KEY ("resourceTypeId") REFERENCES "ResourceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventItem" ADD CONSTRAINT "EventItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventItem" ADD CONSTRAINT "EventItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "EventItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventItemsOnResources" ADD CONSTRAINT "EventItemsOnResources_eventItemId_fkey" FOREIGN KEY ("eventItemId") REFERENCES "EventItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventItemsOnResources" ADD CONSTRAINT "EventItemsOnResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Resource_reviewableId" FOREIGN KEY ("reviewableId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Event_reviewableId" FOREIGN KEY ("reviewableId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "EventItem_reviewableId" FOREIGN KEY ("reviewableId") REFERENCES "EventItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Resource_likableId" FOREIGN KEY ("likableId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Review_likableId" FOREIGN KEY ("likableId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
