#!/bin/bash

parse_runtime_arguments() {
    OPTIONS=$(getopt --quiet --options "r:c:s:d:" --longoptions "runtime:,client:,server:,database:" -- "$@")
    eval set --$OPTIONS

    while true; do
        case "$1" in

            # Specify a port to run the app on.
            -c|--client)
            shift
            AWARE_APP_PORT_CLIENT="$1"
            ;;

            # Specify a port to run the app on.
            -s|--server)
            shift
            AWARE_APP_PORT_SERVER="$1"
            ;;

            # Specify a port to run the app on.
            -d|--database)
            shift
            AWARE_DATABASE_PORT="$1"
            ;;

            # Modify how long the app runs before terminating.
            -r|--runtime)
            shift
            AWARE_APP_RUNTIME="$1"
            ;;

            *)
            shift
            break
            ;;
        esac

        shift
    done
}

BASE_DIR=$(dirname `realpath $0`)


AWARE_DATABASE_PORT=$((RANDOM + 1024))
AWARE_APP_PORT_CLIENT=$((RANDOM + 1024))
AWARE_APP_PORT_SERVER=$((RANDOM + 1024))
AWARE_APP_RUNTIME=20

parse_runtime_arguments $@

$BASE_DIR/setup_aware_database.sh -p $AWARE_DATABASE_PORT

# Modify package json to listen to contianer IP
sed -i -s -e "s/PGHOST=localhost/PGHOST=aware-db-$AWARE_DATABASE_PORT/g" "$BASE_DIR/../../aware-app/package.json"
sed -i -s -e "s/localhost:5001/server-$AWARE_APP_PORT_SERVER:5001/g" "$BASE_DIR/../../aware-app/package.json"

printf "Building Image for Server...\n"
sudo docker build -t server-$AWARE_APP_PORT_SERVER --file $BASE_DIR/../../aware-app/src/docker/server.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Server Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name server-$AWARE_APP_PORT_SERVER --link=aware-db-$AWARE_DATABASE_PORT:database -p $AWARE_APP_PORT_SERVER:5001 --rm server-$AWARE_APP_PORT_SERVER >& /dev/null &
printf "Building Image for Client...\n"
sudo docker build -t client-$AWARE_APP_PORT_CLIENT --file $BASE_DIR/../../aware-app/src/docker/client.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Client Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name client-$AWARE_APP_PORT_CLIENT --link=server-$AWARE_APP_PORT_SERVER:server -p $AWARE_APP_PORT_CLIENT:3000 --rm client-$AWARE_APP_PORT_CLIENT >& /dev/null &

sleep 5s
printf "Successfully created docker containers\n"
printf "Available at: http://localhost:$AWARE_APP_PORT_CLIENT/ \n"