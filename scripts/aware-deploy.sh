#!/bin/bash

help() {
    printf "\t\t$0 [OPTION] <branch>\n\n"
    echo "Deploy and run a build of aware onto one of the aware deployment servers."
    echo "You must specify which branch you would like to deploy."
    printf "\n\nOPTIONS:\n\n"
    printf "\t-r, --runtime=<minutes>\n\t\tThe runtime (minutes) of the aware app before it is killed and removed from the server.\n"
    printf "\t-p, --port=<port>\n\t\tRun the app on a specific (rather than random) port.\n"
    exit 1
}

parse_runtime_arguments() {
    OPTIONS=$(getopt --quiet --options ":r:p:" --longoptions "runtime:,port:" -- "$@")
    eval set --$OPTIONS

    while true; do
        case "$1" in

            # Specify a port to run the app on.
            -p|--port)
            shift
            AWARE_APP_PORT_CLIENT="$1"
            ;;

            # Modify how long the app runs before terminating.
            -r|--runtime)
            shift
            AWARE_APP_RUNTIME="$1"
            ;;

            # Mandatory argument parsing happens here.
            --)
            shift

            # Check that the user provided the branch to deploy.
            if [ $# -ne 1 ]; then
                help
            fi

            AWARE_BRANCH="$1"

            break
            ;;
        esac

        shift
    done
}

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

BASE_DIR=$(dirname `realpath $0`)
source $BASE_DIR/aware-env.sh

printf "aware-deploy\n=======\n\n"

# Random port chosen.
#
# It must be above 1024 because only root is allowed to claim ports lower
# than 1024.
AWARE_APP_PORT_CLIENT=$((RANDOM + 1024))
AWARE_APP_PORT_SERVER=$((RANDOM + 1024))

# Parse all arguments, mandatory and optional.
parse_runtime_arguments $@

inform_aligned "Aware Client Port" "$AWARE_APP_PORT_CLIENT"
inform_aligned "Aware Server Port" "$AWARE_APP_PORT_SERVER"
inform_aligned "Branch to deploy" "$AWARE_BRANCH"
inform_aligned "Server" "$AWARE_SERVER_DEPLOY"

printf "\nConnecting to $AWARE_SERVER_DEPLOY...\n"

ssh root@"$AWARE_SERVER_DEPLOY" "/bin/bash -s $AWARE_BRANCH $AWARE_APP_PORT_CLIENT $AWARE_APP_PORT_SERVER $AWARE_APP_RUNTIME" << 'DEPLOY'
    
inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

AWARE_BRANCH=$1
DEPLOYMENT_DIR="aware-dev-deployment-$AWARE_BRANCH.$((RANDOM))"

cd /tmp
mkdir $DEPLOYMENT_DIR
cd $DEPLOYMENT_DIR
inform_aligned "Deployment created" "$DEPLOYMENT_DIR"

git clone "$AWARE_REPO_SSH" >& /dev/null
inform_aligned "Git clone" "$AWARE_REPO_SSH"

cd aware/aware-app
git checkout $AWARE_BRANCH >& /dev/null
inform_aligned "Git branch" "$AWARE_BRANCH"

echo "Extracting node_modules.tar.gz..."
../scripts/aware-modules.sh --extract

sed -i -s -e "s/react-scripts start/PORT=$2 react-scripts start --disableHostCheck=true/g" package.json
sed -i -s -e "s/server.js/server.js $3 --disableHostCheck=true/g" package.json
sed -i -s -e "s/localhost:5001/localhost:$3/g" package.json
sed -i -s -e "s/localhost/$AWARE_SERVER_DEPLOY/g" .env

printf "\nSetting up database docker container...\n"
../scripts/setup/setup_aware_database.sh -r $4

npm run server > /dev/null &
sleep 5s

inform_aligned "npm run server" "complete"

npm run client > /dev/null &
inform_aligned "npm run client" "complete"

inform_aligned "Deployment available at" "http://$AWARE_SERVER_DEPLOY:$2"

at now + $4 minutes >& /dev/null << CLEANUP
lsof -i :$2 | grep *:$2 | cut -d ' ' -f 5 | xargs kill
lsof -i :$3 | grep *:$3 | cut -d ' ' -f 5 | xargs kill

rm -rf /tmp/$DEPLOYMENT_DIR
CLEANUP

DEPLOY
