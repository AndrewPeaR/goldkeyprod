/*
  Warnings:

  - You are about to alter the column `status` on the `Questions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Questions" ("create_at", "id", "name", "phoneNumber", "question", "status", "updated_at") SELECT "create_at", "id", "name", "phoneNumber", "question", "status", "updated_at" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
