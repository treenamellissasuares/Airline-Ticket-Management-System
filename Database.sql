
/* Create sequence for adminid*/
CREATE SEQUENCE public.admin_adminid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
/* Create sequence for customerid*/
CREATE SEQUENCE public.customer_cid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

/* Create sequence for flightid*/

CREATE SEQUENCE public.flight_fid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

/* Create sequence for ticketid*/
CREATE SEQUENCE public.ticket_info_ticketid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

/* Create table Admin*/
CREATE TABLE public.admin
(
    adminid integer NOT NULL DEFAULT nextval('admin_adminid_seq'::regclass),
    email character varying(30) COLLATE pg_catalog."default",
    password character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT admin_pkey PRIMARY KEY (adminid)
)
/* Create table customer*/
CREATE TABLE public.customer
(
    cid integer NOT NULL DEFAULT nextval('customer_cid_seq'::regclass),
    fname character varying(20) COLLATE pg_catalog."default",
    lname character varying(20) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    phoneno integer,
    dob date,
    password character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT customer_pkey PRIMARY KEY (cid)
)
/* Create table Flight*/
CREATE TABLE public.flight
(
    fid integer NOT NULL DEFAULT nextval('flight_fid_seq'::regclass),
    fromloc character varying(50) COLLATE pg_catalog."default",
    toloc character varying(20) COLLATE pg_catalog."default",
    airlinename character varying(20) COLLATE pg_catalog."default",
    totalseat integer,
    adminid integer,
    CONSTRAINT flight_pkey PRIMARY KEY (fid),
    CONSTRAINT flight_adminid_fkey FOREIGN KEY (adminid)
        REFERENCES public.admin (adminid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

/* Create table Flight_details*/
CREATE TABLE public.flight_details
(
    fid integer NOT NULL,
    depdate timestamp without time zone NOT NULL,
    arrdate timestamp without time zone,
    CONSTRAINT flight_details_pkey PRIMARY KEY (fid, depdate),
    CONSTRAINT flight_details_fid_fkey FOREIGN KEY (fid)
        REFERENCES public.flight (fid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
/* Create table Ticket_info*/
CREATE TABLE public.ticket_info
(
    fid integer NOT NULL,
    cid integer NOT NULL,
    ticketid integer NOT NULL DEFAULT nextval('ticket_info_ticketid_seq'::regclass),
    fdate timestamp without time zone,
    name character varying(20) COLLATE pg_catalog."default",
    age integer,
    CONSTRAINT ticket_info_pkey PRIMARY KEY (fid, cid, ticketid),
    CONSTRAINT ticket_info_cid_fkey FOREIGN KEY (cid)
        REFERENCES public.customer (cid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT ticket_info_fid_fdate_fkey FOREIGN KEY (fdate, fid)
        REFERENCES public.flight_details (depdate, fid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)


