-- Backfill UIMessage.parts from legacy content-only rows
UPDATE "Message"
SET "parts" = jsonb_build_array(jsonb_build_object('type', 'text', 'text', "content"))
WHERE "parts" IS NULL;

ALTER TABLE "Message" ADD COLUMN "attachments" JSONB NOT NULL DEFAULT '[]';

ALTER TABLE "Message" ALTER COLUMN "parts" SET NOT NULL;

ALTER TABLE "Message" ALTER COLUMN "id" DROP DEFAULT;

DROP INDEX IF EXISTS "Message_sessionId_idx";

CREATE INDEX "Message_sessionId_createdAt_idx" ON "Message"("sessionId", "createdAt");
