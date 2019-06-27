#!/bin/bash

SCRIPT_DIR=`dirname $0`
AVAILABLE_SERVERS_CONFIG=$SCRIPT_DIR/available.servers

# Useful export variables for potential new scripts.
export AWARE_SERVER_JIRA="jira.aware-app.io:8080"
export AWARE_SERVER_DEPLOY="deploy.aware-app.io"
export AWARE_SERVER_TESTLINK="testlink.aware-app.io"
export AWARE_REPO_SSH="git@github.com:ahmedsakr/aware.git"
export AWARE_APP_RUNTIME=20
