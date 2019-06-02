#!/bin/bash

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

BASE_DIR=$(dirname `realpath $0`)
SCHEMA_DIR=$(realpath $BASE_DIR/../../aware-app/src/schemas)
DOCKER_DIR=$(realpath $BASE_DIR/../../aware-app/src/docker)
AWARE_DATABASE_PORT=$((RANDOM + 1024))
CONAINER_NAME="aware-db-$AWARE_DATABASE_PORT"
IMAGE_NAME="aware-database-$AWARE_DATABASE_PORT"

inform_aligned "Aware Database Port" "$AWARE_DATABASE_PORT"

printf "Building Image for PostgreSQL...\n"
sudo docker build -t $IMAGE_NAME $DOCKER_DIR >& /dev/null

printf "Building Containter & Starting it...\n"
printf "Container ID:"
sudo docker run -d --rm -p $AWARE_DATABASE_PORT:5432 --name $CONAINER_NAME -v $SCHEMA_DIR:/schemas -it $IMAGE_NAME

# Change database port in App to match conatiner's port
sed -i -s -e "s/5432/$AWARE_DATABASE_PORT/g" "$BASE_DIR/../../aware-app/package.json"

printf "Connecting to PSQL & Creating Tables...\n"
sleep 5s
PGPASSWORD=aware psql -h localhost -p $AWARE_DATABASE_PORT -U aware -c "\\i $SCHEMA_DIR/accounts.sql;" >& /dev/null

printf "PostgreSQL Container created: localhost:$AWARE_DATABASE_PORT\n"
printf "Database: aware, Username: aware, Password: aware\n"