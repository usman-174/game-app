-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "percentRecommended" INTEGER NOT NULL,
    "numReviews" INTEGER NOT NULL,
    "topCriticScore" DOUBLE PRECISION NOT NULL,
    "tier" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstReleaseDate" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
