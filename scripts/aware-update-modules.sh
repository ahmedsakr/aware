#!/bin/bash

CURRENT_DIRECTORY=`pwd`
BASE_DIR=`dirname $CURRENT_DIRECTORY`

PACKAGE_FILE=$BASE_DIR/aware-app/package.json
PACKAGE_LOCK_FILE=$BASE_DIR/aware-app/package-lock.json
NODE_MODULES_DIRECTORY=$BASE_DIR/aware-app/node_modules
NODE_MODULES_ARCHIVE=$BASE_DIR/aware-app/node_modules.tar.gz

PATH_INDEPENDENT_GIT="git --work-tree=$BASE_DIR --git-dir=$BASE_DIR/.git"
GIT_DIFF_PACKAGE_HEAD="$PATH_INDEPENDENT_GIT diff HEAD $PACKAGE_FILE"
GIT_DIFF_PACKAGE_MASTER="$PATH_INDEPENDENT_GIT diff origin/master $PACKAGE_FILE"
GIT_DIFF_PACKAGE_LOCK_HEAD="$PATH_INDEPENDENT_GIT diff HEAD $PACKAGE_LOCK_FILE"
GIT_DIFF_PACKAGE_LOCK_MASTER="$PATH_INDEPENDENT_GIT diff origin/master $PACKAGE_LOCK_FILE"

print_changes() {
    printf "\nYou added:\n"
    echo "$1" | grep -E "^\+{1}\s"
    echo ""

    echo "You deleted:"
    echo "$1" | grep -E "^-{1}\s"
}

check_package() {
    if [ ! "`$GIT_DIFF_PACKAGE_HEAD`" = "" ]; then
        printf "You havee unstaged changes to package.json.\n\n"
        print_changes "`$GIT_DIFF_PACKAGE_HEAD`"

        printf "\n\nIf these changes are intended, type (y) to proceed. Otherwise, type (n): "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1

    elif [ ! "`$GIT_DIFF_PACKAGE_MASTER`" = "" ]; then
        echo "You have staged or committed changes to package.json in this branch."
        echo "You may have already updated the node_modules archive."
        print_changes "`$GIT_DIFF_PACKAGE_MASTER`"
        printf "\nWould you like to update the node modules archive? (y/n) "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1
    fi
}

check_package_lock() {
    if [ ! "`$GIT_DIFF_PACKAGE_LOCK_HEAD`" = "" ]; then
        printf "package-lock.json file has unstaged changes even though package.json does not.\n"
        printf "This probably happened because at least one of your package.json dependcies has\n"
        printf "a dependency that updated. You should update node_modules archive in this case.\n\n"
        printf "If these changes are intended, type (y) to proceed. Otherwise, type (n): "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1

    elif [ ! "`$GIT_DIFF_PACKAGE_LOCK_MASTER`" = "" ]; then
        echo "You have staged or committed changes to package.json in this branch."
        echo "You may have already updated the node_modules archive."
        print_changes "`$GIT_DIFF_PACKAGE_MASTER`"
        printf "\nWould you like to update the node modules archive? (y/n) "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1
    fi
}

if [ ! -f "/usr/bin/git" ]; then
    echo "You do not have git installed."
    exit 1
fi

if [ ! -d "$BASE_DIR/.git" ]; then
    echo "$BASE_DIR does not have a git repository initialized."
    exit 1
fi

UPDATE_MODULES=0
check_package
[ $UPDATE_MODULES -eq 0 ] && check_package_lock

if [ $UPDATE_MODULES -eq 1 ]; then
    [ -f $NODE_MODULES_ARCHIVE ] && rm -f $NODE_MODULES_ARCHIVE
    tar cf $NODE_MODULES_ARCHIVE $NODE_MODULES_DIRECTORY >& /dev/null
    echo "Updated node_modules archive."
else
    echo "The node_modules archive does not requrie updating."
fi