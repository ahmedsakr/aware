#!/bin/bash

while true
do

# Check if the at queue (atq) has a job registered to run.
# A job to run the below script is registered if the queue is empty.
#
# The job is scheduled to run at midnight.
[ ! "`atq`" = "" ] || at midnight <<SCRIPT

# Halt the current JIRA instance.
/home/jira/jira/bin/stop-jira.sh

# Sleep for 5 seconds before restarting JIRA.
sleep 5s

# Initialize the JIRA service.
/home/jira/jira/bin/start-jira.sh
SCRIPT

# Timeout for an hour before waking up again to check if the queue is empty.
sleep 1h

done
