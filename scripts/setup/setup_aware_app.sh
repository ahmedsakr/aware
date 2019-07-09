#!/bin/bash

BASE_DIR=$(dirname `realpath $0`)

# if no arguments passed randomize ports, supports local testing
if [ $# -ne 3 ]; then
    AWARE_DATABASE_PORT=5432 #$((RANDOM + 1024))
    AWARE_APP_PORT_CLIENT=3000 #$((RANDOM + 1024))
    AWARE_APP_PORT_SERVER=5001 #$((RANDOM + 1024))
else
    AWARE_DATABASE_PORT=$1
    AWARE_APP_PORT_CLIENT=$2
    AWARE_APP_PORT_SERVER=$3
    runtime=$4
fi

$BASE_DIR/setup_aware_database.sh -p $AWARE_DATABASE_PORT

# Modify package json to listen to contianer IP
sed -i -s -e "s/PGHOST=/PGHOST=aware-db-$AWARE_DATABASE_PORT/g" "$BASE_DIR/../../aware-app/package.json"

printf "Building Image for Server...\n"
sudo docker build -t server-$AWARE_APP_PORT_SERVER --file $BASE_DIR/../../aware-app/src/docker/server.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Server Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name server-$AWARE_APP_PORT_SERVER --link=aware-db-$AWARE_DATABASE_PORT:database -p $AWARE_APP_PORT_CLIENT:5001 --rm server-$AWARE_APP_PORT_SERVER >& /dev/null &
printf "Building Image for Client...\n"
sudo docker build -t client-$AWARE_APP_PORT_CLIENT --file $BASE_DIR/../../aware-app/src/docker/client.Dockerfile $BASE_DIR/../../aware-app/ >& /dev/null
printf "Starting Client Container...\n"
sudo docker run -v $BASE_DIR/../../aware-app:/app -v /app/node_modules --name client-$AWARE_APP_PORT_CLIENT --link=server-$AWARE_APP_PORT_SERVER:server -p $AWARE_APP_PORT_CLIENT:3000 --rm client-$AWARE_APP_PORT_CLIENT #>& /dev/null &

sleep 5s
printf "Successfully created docker containers\n"
printf "Available at: http://localhost:$AWARE_APP_PORT_CLIENT/ \n"