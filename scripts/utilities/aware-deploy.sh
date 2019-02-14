#!/bin/bash

help() {
    printf "\t\t$0 [OPTION] <branch>\n\n"
    echo "Deploy and run a build of aware onto one of the aware deployment servers."
    echo "You must specify which branch you would like to deploy."
    printf "\n\nOPTIONS:\n\n"
    printf "\t-r: The runtime (minutes) of the aware app before it is killed and removed from the server.\n"
    printf "\t-p: Run the app on a specific (rather than random) port.\n"
    exit 1
}

parse_options() {
    while getopts ":r:p:" option; do
        case "$option" in
            
            # Specify a port to run the app on.
            p)
            AWARE_APP_PORT=$OPTARG
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
AWARE_APP_PORT=$((RANDOM + 1024))
AWARE_APP_RUNTIME=20

# Parse all available options
parse_options $@
shift $((OPTIND - 1))

# Check that the user provided the branch to deploy.
if [ $# -ne 1 ]; then
    help
fi

inform_aligned "Aware Port" "$AWARE_APP_PORT"
inform_aligned "Branch to deploy" "$1"
inform_aligned "Server" "$AWARE_DEPLOYMENT_SERVER"

printf "\nConnecting to $AWARE_DEPLOYMENT_SERVER...\n"

ssh root@"$AWARE_DEPLOYMENT_SERVER" "/bin/bash -s $1 $AWARE_APP_PORT $AWARE_APP_RUNTIME" << 'DEPLOY'
    
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

echo "Invoking 'npm install'..."
npm install >& /dev/null
inform_aligned "npm install" "complete"
    
sed -i -s -e "s/react-scripts start/PORT=$2 react-scripts start/g" package.json

echo "Invoking 'npm start...'"
npm start > /dev/null &
inform_aligned "npm start" "complete"

inform_aligned "Deployment available at" "http://$AWARE_DEPLOYMENT_SERVER:$2"

at now + $3 minutes >& /dev/null << CLEANUP
lsof -i :$2 | grep *:$2 | cut -d ' ' -f 5 | xargs kill
rm -rf /tmp/$DEPLOYMENT_DIR
CLEANUP

DEPLOY