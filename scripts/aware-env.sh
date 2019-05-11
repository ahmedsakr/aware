#!/bin/bash

SCRIPT_DIR=`dirname $0`
AVAILABLE_SERVERS_CONFIG=$SCRIPT_DIR/available.servers

register_hostnames() {
    echo "You may be prompted to enter your sudo password so that server hostnames for\
    aware could be registered."
    sudo sh -c "cat $AVAILABLE_SERVERS_CONFIG >> /etc/hosts"
}

# Register aware server IP addresses using convienient hostnames.
grep -q "aware" /etc/hosts
if [ $? -ne 0 ]; then
    register_hostnames
fi

# Useful export variables for potential new scripts.
export AWARE_SERVER_JIRA="aware-jira"
export AWARE_SERVER_DEV="aware-dev"
export AWARE_REPO_SSH="git@github.com:ahmedsakr/aware.git"