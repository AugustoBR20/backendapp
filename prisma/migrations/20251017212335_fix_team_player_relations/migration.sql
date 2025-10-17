/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `abbreviation` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Team` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "position" TEXT,
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "photoUrl" TEXT,
    "teamId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("createdAt", "heightCm", "id", "name", "number", "photoUrl", "position", "teamId", "weightKg") SELECT "createdAt", "heightCm", "id", "name", "number", "photoUrl", "position", "teamId", "weightKg" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "conference" TEXT,
    "titles" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Team" ("createdAt", "id", "logoUrl", "name") SELECT "createdAt", "id", "logoUrl", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
CREATE TABLE "new_TransferLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "fromTeamId" TEXT,
    "toTeamId" TEXT,
    "performedBy" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TransferLog" ("createdAt", "fromTeamId", "id", "performedBy", "playerId", "toTeamId") SELECT "createdAt", "fromTeamId", "id", "performedBy", "playerId", "toTeamId" FROM "TransferLog";
DROP TABLE "TransferLog";
ALTER TABLE "new_TransferLog" RENAME TO "TransferLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
