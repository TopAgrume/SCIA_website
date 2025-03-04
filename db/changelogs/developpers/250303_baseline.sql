--liquibase formatted sql
--changeset mael.reynaud:1
CREATE TYPE article_type AS ENUM ('ARTICLE', 'VIDEO');

CREATE TABLE
  event (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    link TEXT NOT NULL,
    by TEXT NOT NULL,
    place TEXT NOT NULL,
    start_date TIMESTAMP(3) NOT NULL,
    end_date TIMESTAMP(3) NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT event_pkey PRIMARY KEY (id)
  );

CREATE TABLE
  project (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    link TEXT NOT NULL,
    by TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT project_pkey PRIMARY KEY (id)
  );

CREATE TABLE
  suggestion (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    summary TEXT NOT NULL,
    link TEXT NOT NULL,
    type article_type NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT suggestion_pkey PRIMARY KEY (id)
  );

CREATE TABLE
  event_attending (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    event_id UUID NOT NULL,
    user_name TEXT NOT NULL,
    is_attending BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT event_attending_pkey PRIMARY KEY (id),
    CONSTRAINT event_attending_event_id_fkey FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE RESTRICT ON UPDATE CASCADE
  );