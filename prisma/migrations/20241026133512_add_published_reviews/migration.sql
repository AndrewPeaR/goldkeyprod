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
    "published" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Reviews" ("childAge", "create_at", "id", "name", "parent", "review", "updated_at", "videoUrl") SELECT "childAge", "create_at", "id", "name", "parent", "review", "updated_at", "videoUrl" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
