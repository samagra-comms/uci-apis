CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.adapter (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    channel text NOT NULL,
    provider text NOT NULL,
    config jsonb NOT NULL,
    name text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.board (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.boards_id_seq OWNED BY public.board.id;
CREATE TABLE public.bot (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "startingMessage" text NOT NULL,
    users text[] NOT NULL,
    "logicIDs" text[] NOT NULL,
    owners text[],
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    status text,
    description text,
    "startDate" date,
    "endDate" date,
    purpose text
);
CREATE TABLE public."conversationLogic" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    transformers jsonb NOT NULL,
    adapter uuid NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    description text
);
CREATE TABLE public.organisation (
    state text,
    district text,
    block text,
    school text,
    cluster text,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    school_code text
);
CREATE TABLE public.pgbench_accounts (
    aid integer NOT NULL,
    bid integer,
    abalance integer,
    filler character(84)
)
WITH (fillfactor='100');
CREATE TABLE public.pgbench_branches (
    bid integer NOT NULL,
    bbalance integer,
    filler character(88)
)
WITH (fillfactor='100');
CREATE TABLE public.pgbench_history (
    tid integer,
    bid integer,
    aid integer,
    delta integer,
    mtime timestamp without time zone,
    filler character(22)
);
CREATE TABLE public.pgbench_tellers (
    tid integer NOT NULL,
    bid integer,
    tbalance integer,
    filler character(84)
)
WITH (fillfactor='100');
CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.roles_id_seq OWNED BY public.role.id;
CREATE TABLE public.service (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type text NOT NULL,
    config jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    name text
);
CREATE TABLE public.transformer (
    name name NOT NULL,
    tags text[],
    config jsonb NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    service_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public."userSegment" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "all" uuid NOT NULL,
    "byID" uuid NOT NULL,
    "byPhone" uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    category text,
    count integer DEFAULT 0
);
ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);
ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
ALTER TABLE ONLY public.adapter
    ADD CONSTRAINT adapter_name_key UNIQUE (name);
ALTER TABLE ONLY public.adapter
    ADD CONSTRAINT adapter_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.board
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bot
    ADD CONSTRAINT bot_name_key UNIQUE (name);
ALTER TABLE ONLY public.bot
    ADD CONSTRAINT bot_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bot
    ADD CONSTRAINT "bot_startingMessage_key" UNIQUE ("startingMessage");
ALTER TABLE ONLY public."conversationLogic"
    ADD CONSTRAINT "conversationLogic_name_key" UNIQUE (name);
ALTER TABLE ONLY public."conversationLogic"
    ADD CONSTRAINT "conversationLogic_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pgbench_accounts
    ADD CONSTRAINT pgbench_accounts_pkey PRIMARY KEY (aid);
ALTER TABLE ONLY public.pgbench_branches
    ADD CONSTRAINT pgbench_branches_pkey PRIMARY KEY (bid);
ALTER TABLE ONLY public.pgbench_tellers
    ADD CONSTRAINT pgbench_tellers_pkey PRIMARY KEY (tid);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service
    ADD CONSTRAINT "serviceType_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.transformer
    ADD CONSTRAINT transformer_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."userSegment"
    ADD CONSTRAINT "userSegment_name_key" UNIQUE (name);
ALTER TABLE ONLY public."userSegment"
    ADD CONSTRAINT "userSegment_pkey" PRIMARY KEY (id);
CREATE INDEX bot_name ON public.bot USING btree (name);
CREATE INDEX "bot_startingMessage" ON public.bot USING btree ("startingMessage");
CREATE INDEX state_district ON public.organisation USING btree (state, district);
CREATE INDEX state_district_block ON public.organisation USING btree (state, district, block);
CREATE INDEX state_district_block_cluster ON public.organisation USING btree (state, district, block, cluster);
CREATE INDEX state_index ON public.organisation USING btree (state);
CREATE TRIGGER set_public_adapter_updated_at BEFORE UPDATE ON public.adapter FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_adapter_updated_at ON public.adapter IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_bot_updated_at BEFORE UPDATE ON public.bot FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_bot_updated_at ON public.bot IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_conversationLogic_updated_at" BEFORE UPDATE ON public."conversationLogic" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_conversationLogic_updated_at" ON public."conversationLogic" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_organisation_updated_at BEFORE UPDATE ON public.organisation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_organisation_updated_at ON public.organisation IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_service_updated_at BEFORE UPDATE ON public.service FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_service_updated_at ON public.service IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_transformer_updated_at BEFORE UPDATE ON public.transformer FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_transformer_updated_at ON public.transformer IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_userSegment_updated_at" BEFORE UPDATE ON public."userSegment" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_userSegment_updated_at" ON public."userSegment" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public."conversationLogic"
    ADD CONSTRAINT "conversationLogic_adapter_fkey" FOREIGN KEY (adapter) REFERENCES public.adapter(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.transformer
    ADD CONSTRAINT transformer_type_fkey FOREIGN KEY (service_id) REFERENCES public.service(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."userSegment"
    ADD CONSTRAINT "userSegment_all_fkey" FOREIGN KEY ("all") REFERENCES public.service(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."userSegment"
    ADD CONSTRAINT "userSegment_byID_fkey" FOREIGN KEY ("byID") REFERENCES public.service(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."userSegment"
    ADD CONSTRAINT "userSegment_byPhone_fkey" FOREIGN KEY ("byPhone") REFERENCES public.service(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
