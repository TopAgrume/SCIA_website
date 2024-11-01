SET client_encoding = 'UTF8';

CREATE ROLE backend;

ALTER ROLE backend WITH SUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;

CREATE DATABASE backend;

ALTER DATABASE backend OWNER TO backend;