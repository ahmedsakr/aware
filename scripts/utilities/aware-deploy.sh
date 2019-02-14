#!/bin/bash

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
    printf "%-50s: %s\n" "$1" "$2"
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

inform_aligned "Aware Port" "$AWARE_APP_PORT"

# User has not specified to upload a directory, a git checkout approached is assumed.


# Check that the user provided the branch to deploy.
if [ $# -ne 1 ]; then
    echo "You have not provided the branch name to deploy to the server."
    exit 1
fi

inform_aligned "Branch to deploy" "$1"
inform_aligned "Server" "$AWARE_DEPLOYMENT_SERVER"

printf "\nConnecting to $AWARE_DEPLOYMENT_SERVER...\n"

ssh root@"$AWARE_DEPLOYMENT_SERVER" "/bin/bash -s $1 $AWARE_APP_PORT $AWARE_APP_RUNTIME" << 'DEPLOY'
    
inform_aligned() {
    printf "%-50s: %s\n" "$1" "$2"
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

npm install >& /dev/null
inform_aligned "npm install" "complete"
    
sed -i -s -e "s/react-scripts start/PORT=$2 react-scripts start/g" package.json

npm start > /dev/null &
inform_aligned "npm start" "complete"

inform_aligned "URL" "http://$AWARE_DEPLOYMENT_SERVER:$2"

at now + $3 minutes >& /dev/null << CLEANUP
lsof -i :$2 | grep *:$2 | cut -d ' ' -f 5 | xargs kill
rm -rf /tmp/$DEPLOYMENT_DIR
CLEANUP

DEPLOY