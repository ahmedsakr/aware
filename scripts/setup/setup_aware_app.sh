#!/bin/bash

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

BASE_DIR=$(dirname `realpath $0`)

# if no arguments passed randomize ports, supports local testing
if [ $# -ne 3 ]; then
    AWARE_DATABASE_PORT=$((RANDOM + 1024))
    AWARE_APP_PORT_CLIENT=$((RANDOM + 1024))
    AWARE_APP_PORT_SERVER=$((RANDOM + 1024))
else
    AWARE_DATABASE_PORT=$1
    AWARE_APP_PORT_CLIENT=$2
    AWARE_APP_PORT_SERVER=$3
    runtime=$4
fi

#sed -i -s -e "s/PGHOST=localhost/PGHOST=aware-db-$AWARE_DATABASE_PORT/g" "$BASE_DIR/../../aware-app/src"
$BASE_DIR/setup_aware_database.sh -p $AWARE_DATABASE_PORT

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