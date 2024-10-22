#!/bin/bash

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

parse_runtime_options() {
    OPTIONS=$(getopt --quiet --options ":r:" --longoptions "runtime:" -- "$@")
    eval set --$OPTIONS

    while true; do
        case "$1" in

            # Modify how long the container runs before terminating
            -r|--runtime)
            shift
            AWARE_APP_RUNTIME="$1"
            ;;

            --)
            shift
            break

            # If in the future you wanted to add mandatory arguments, parsing
            # should go here.
            ;;

        esac

        shift
    done
}

BASE_DIR=$(dirname `realpath $0`)
source $BASE_DIR/../aware-env.sh

SCHEMA_DIR=$(realpath $BASE_DIR/../../aware-app/src/schemas)
DOCKER_DIR=$(realpath $BASE_DIR/../../aware-app/src/docker)
AWARE_DATABASE_PORT=$((RANDOM + 1024))
AWARE_APP_RUNTIME=20
CONTAINER_NAME="aware-db-$AWARE_DATABASE_PORT"
IMAGE_NAME="aware-database-$AWARE_DATABASE_PORT"

# Parse all available options
parse_runtime_options $@

inform_aligned "Aware Database Port" "$AWARE_DATABASE_PORT"

echo "Building Image for PostgreSQL..."
sudo docker build -t $IMAGE_NAME $DOCKER_DIR >& /dev/null

echo "Building Containter & Starting it..."
printf "Container ID:"
sudo docker run -d --rm -p $AWARE_DATABASE_PORT:5432 --name $CONTAINER_NAME -v $SCHEMA_DIR:/schemas -it $IMAGE_NAME

# Change database port in App to match conatiner's port
sed -i -s -e "s/5432/$AWARE_DATABASE_PORT/g" "$BASE_DIR/../../aware-app/package.json"

echo "Connecting to PSQL & Creating Tables..."
sleep 5s
PGPASSWORD=aware psql -h localhost -p $AWARE_DATABASE_PORT -U aware -c "\\i $SCHEMA_DIR/accounts.sql;" >& /dev/null

echo "PostgreSQL Container created: localhost:$AWARE_DATABASE_PORT"
echo "Docker will kill Container: $CONTAINER_NAME in $AWARE_APP_RUNTIME minutes"

at now + $AWARE_APP_RUNTIME minutes >& /dev/null << CLEANUP
docker kill "$CONTAINER_NAME"
sed -i -s -e "s/$AWARE_DATABASE_PORT/5432/g" "$BASE_DIR/../../aware-app/package.json"
CLEANUP