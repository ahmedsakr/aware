#!/bin/bash

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

parse_options() {
    while getopts ":d:s:c:" option; do
        case "$option" in
            
            # Specify a port to run the app on.
            p)
            AWARE_APP_PORT_CLIENT=$OPTARG
            ;;
            *)
            echo "Unrecognized option provided."
            exit 1
        esac
    done
}

BASE_DIR=$(dirname `realpath $0`)

# Parse all available options
parse_options $@
shift $((OPTIND - 1))

# Check if the script has been passed a port
if [ $# -ne 1 ]; then
    AWARE_DATABASE_PORT=$((RANDOM + 1024))
else 
    AWARE_DATABASE_PORT=$1
fi

printf "Building Image for Server...\n"
sudo docker build -t server --file $BASE_DIR/../../aware-app/src/docker/server.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Server Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name server --link=aware-db-$AWARE_DATABASE_PORT:database -p 5001:5001 --rm server >& /dev/null &
printf "Building Image for Client...\n"
sudo docker build -t client --file $BASE_DIR/../../aware-app/src/docker/client.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Client Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name client --link=server:server -p 3000:3000 --rm client >& /dev/null &

sleep 5s
printf "Successfully created docker containers\n"