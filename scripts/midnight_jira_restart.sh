#!/bin/bash

while true
do
[ ! "`atq`" = "" ] || at midnight <<COMPLETE

/home/jira/jira/bin/stop-jira.sh

# Sleep for 5 seconds before restarting JIRA.
sleep 5s

/home/jira/jira/bin/start-jira.sh

COMPLETE

sleep 1h
done
