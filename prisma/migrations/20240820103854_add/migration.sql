/*
  Warnings:

  - Added the required column `childAge` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    "childAge" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Reviews" ("create_at", "id", "name", "parent", "review", "updated_at", "videoUrl") SELECT "create_at", "id", "name", "parent", "review", "updated_at", "videoUrl" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
