-- CreateTable
CREATE TABLE "user_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "user_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "user_type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_uid" UUID NOT NULL,
    "user_photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "url_original" TEXT NOT NULL,
    "url_short" TEXT NOT NULL,
    "url_ttl" TEXT NOT NULL,
    "url_uid" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "session_id" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "url_uid" UUID NOT NULL,
    "visitors" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accessBlock" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_uid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accessBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshAllow" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_uid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshAllow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_types_type_key" ON "user_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_uid_key" ON "users"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_short_key" ON "urls"("url_short");

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_uid_key" ON "urls"("url_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_url_uid_key" ON "Statistics"("url_uid");

-- CreateIndex
CREATE UNIQUE INDEX "accessBlock_token_key" ON "accessBlock"("token");

-- CreateIndex
CREATE UNIQUE INDEX "refreshAllow_token_key" ON "refreshAllow"("token");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "user_types"("type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_url_uid_fkey" FOREIGN KEY ("url_uid") REFERENCES "urls"("url_uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accessBlock" ADD CONSTRAINT "accessBlock_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("user_uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refreshAllow" ADD CONSTRAINT "refreshAllow_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("user_uid") ON DELETE CASCADE ON UPDATE CASCADE;
