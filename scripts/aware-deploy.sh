#!/bin/bash

help() {
    printf "\t\t$0 [OPTION] <branch>\n\n"
    echo "Deploy and run a build of aware onto one of the aware deployment servers."
    echo "You must specify which branch you would like to deploy."
    printf "\n\nOPTIONS:\n\n"
    printf "\t-r <minutes>: The runtime (minutes) of the aware app before it is killed and removed from the server.\n"
    printf "\t-p <port>: Run the app on a specific (rather than random) port.\n"
    exit 1
}

parse_options() {
    while getopts ":r:p:" option; do
        case "$option" in
            
            # Specify a port to run the app on.
            p)
            AWARE_APP_PORT_CLIENT=$OPTARG
            ;;
            # Modify how long the app runs before terminating
            r)
            AWARE_APP_RUNTIME=$OPTARG
            ;;
            *)
            echo "Unrecognized option provided."
            exit 1
        esac
    done
}

inform_aligned() {
    printf "%-40s: %s\n" "$1" "$2"
}

printf "aware-deploy\n=======\n\n"

# Random port chosen.
#
# It must be above 1024 because only root is allowed to claim ports lower
# than 1024.
AWARE_APP_PORT_CLIENT=$((RANDOM + 1024))
AWARE_APP_PORT_SERVER=$((RANDOM + 1024))
AWARE_APP_RUNTIME=20

# Parse all available options
parse_options $@
shift $((OPTIND - 1))

# Check that the user provided the branch to deploy.
if [ $# -ne 1 ]; then
    help
fi

inform_aligned "Aware Client Port" "$AWARE_APP_PORT_CLIENT"
inform_aligned "Aware Server Port" "$AWARE_APP_PORT_SERVER"
inform_aligned "Branch to deploy" "$1"
inform_aligned "Server" "$AWARE_SERVER_DEV"

printf "\nConnecting to $AWARE_SERVER_DEV...\n"

ssh root@"$AWARE_SERVER_DEV" "/bin/bash -s $1 $AWARE_APP_PORT_CLIENT $AWARE_APP_PORT_SERVER $AWARE_APP_RUNTIME" << 'DEPLOY'
    
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
sed -i -s -e "s/localhost/$AWARE_SERVER_DEV/g" .env

npm run server > /dev/null &
sleep 5s

inform_aligned "npm run server" "complete"

npm run client > /dev/null &
inform_aligned "npm run client" "complete"

inform_aligned "Deployment available at" "http://$AWARE_SERVER_DEV:$2"

at now + $4 minutes >& /dev/null << CLEANUP
lsof -i :$2 | grep *:$2 | cut -d ' ' -f 5 | xargs kill
lsof -i :$3 | grep *:$3 | cut -d ' ' -f 5 | xargs kill

rm -rf /tmp/$DEPLOYMENT_DIR
CLEANUP

DEPLOY
