
alter table "public"."bot" add column "ownerOrgID" text
 null;

alter table "public"."bot" add column "ownerID" text
 null;

alter table "public"."userSegment" add column "ownerOrgID" text
 null;

alter table "public"."userSegment" add column "ownerID" text
 null;

alter table "public"."conversationLogic" add column "ownerOrgID" text
 null;

alter table "public"."conversationLogic" add column "ownerID" text
 null;
