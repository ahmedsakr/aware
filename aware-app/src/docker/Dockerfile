FROM ubuntu:18.04

# Add the PostgreSQL PGP key to verify their Debian packages.
RUN apt-get update && apt-get install gnupg2 -y && apt-get install wget -y
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 10
RUN apt-get update && apt-get install -y software-properties-common postgresql-10 postgresql-client-10 postgresql-contrib-10

# Run the rest of the commands as the ``postgres`` user created by the ``postgres-10`` package when it was ``apt-get installed``
USER postgres

# Create a PostgreSQL role named ``aware`` with ``aware`` as the password and
# then create a database `aware` owned by the ``aware`` role.
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER aware WITH SUPERUSER PASSWORD 'aware';" &&\
    createdb -O aware aware

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/10/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/10/main/postgresql.conf

EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/10/bin/postgres", "-D", "/var/lib/postgresql/10/main", "-c", "config_file=/etc/postgresql/10/main/postgresql.conf"]
