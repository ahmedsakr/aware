#!/bin/bash

CURRENT_DIRECTORY=`pwd`
BASE_DIR=`dirname $CURRENT_DIRECTORY`

# The NPM Configuration files that track the build dependencies.
PACKAGE_FILE=$BASE_DIR/aware-app/package.json
PACKAGE_LOCK_FILE=$BASE_DIR/aware-app/package-lock.json

NODE_MODULES_DIRECTORY=$BASE_DIR/aware-app/node_modules
NODE_MODULES_ARCHIVE=$BASE_DIR/aware-app/npm-modules/node_modules.tar.gz
NODE_MODULES_PARTS_NUM=10
NODE_MODULES_PART_FORMAT="$NODE_MODULES_ARCHIVE.part.%d"

# Allows execution of git commands anywhere in the system for this repo.
PATH_INDEPENDENT_GIT="git --work-tree=$BASE_DIR --git-dir=$BASE_DIR/.git"

GIT_DIFF_PACKAGE_HEAD="$PATH_INDEPENDENT_GIT diff HEAD $PACKAGE_FILE"
GIT_DIFF_PACKAGE_MASTER="$PATH_INDEPENDENT_GIT diff origin/master $PACKAGE_FILE"
GIT_DIFF_PACKAGE_LOCK_HEAD="$PATH_INDEPENDENT_GIT diff HEAD $PACKAGE_LOCK_FILE"
GIT_DIFF_PACKAGE_LOCK_MASTER="$PATH_INDEPENDENT_GIT diff origin/master $PACKAGE_LOCK_FILE"

SUPPORTED_LONG_OPTIONS="update,extract"

parse_options() {
    OPTIONS=$(getopt --quiet --options "" --longoptions $SUPPORTED_LONG_OPTIONS -- "$@")
    eval set --$OPTIONS
    case "$1" in
        --update)
            
        update
        ;;
            
        --extract)

        extract
        ;;

        *)
        echo "Unrecognized option."
        exit 1
    esac
}

update() {
    check_package
    [ $UPDATE_MODULES -eq 0 ] && check_package_lock

    if [ $UPDATE_MODULES -eq 1 ]; then
        [ -f $NODE_MODULES_ARCHIVE ] && rm -f $NODE_MODULES_ARCHIVE

        tar cvf $NODE_MODULES_ARCHIVE -C $BASE_DIR/aware-app $(basename $NODE_MODULES_DIRECTORY) >& /dev/null
        echo "Updated node_modules archive."
    else
        echo "The node_modules archive does not require updating."
    fi
}

extract() {
    rm -rf $NODE_MODULES_DIRECTORY
    tar xf $NODE_MODULES_ARCHIVE -C $BASE_DIR/aware-app
    rm -f $NODE_MODULES_ARCHIVE
}

print_changes() {
    echo "$1"
    # Additions and deletions start with '+' and '-', respectively.
    local ADDITIONS=`printf "$1" | grep -E "^\+{1}\s"`
    local DELETIONS=`printf "$1" | grep -E "^-{1}\s"`

    if [ ! "$ADDITIONS" = "" ]; then
        printf "\nYou added:\n"
        echo "$ADDITIONS"
    fi

    if [ ! "$DELETIONS" = "" ]; then
        printf "\nYou deleted:\n"
        echo "$DELETIONS"
    fi
}

check_package() {

    # Compares the package.json with the HEAD version of the branch.
    if [ ! "`$GIT_DIFF_PACKAGE_HEAD`" = "" ]; then
        printf "You have uncommitted changes to package.json.\n\n"
        print_changes "`$GIT_DIFF_PACKAGE_HEAD`"

        printf "\n\nIf these changes are intended, type (y) to proceed. Otherwise, type (n): "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1

    # Compares the package.json with the master version.
    elif [ ! "`$GIT_DIFF_PACKAGE_MASTER`" = "" ]; then
        echo "You have committed changes to package.json in this branch."
        echo "You may have already updated the node_modules archive."
        print_changes "`$GIT_DIFF_PACKAGE_MASTER`"
        printf "\nWould you like to update the node modules archive? (y/n) "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1
    fi
}

check_package_lock() {

    # Compares the package-lock.json file with the HEAD version in the branch.
    if [ ! "`$GIT_DIFF_PACKAGE_LOCK_HEAD`" = "" ]; then
        printf "package-lock.json file has uncommitted changes even though package.json does not.\n"
        printf "This probably happened because at least one of your package.json dependencies has\n"
        printf "a dependency that updated. You should update node_modules archive in this case.\n\n"
        printf "If these changes are intended, type (y) to proceed. Otherwise, type (n): "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1
    
    # Compares the package-lock.json file with the master version.
    elif [ ! "`$GIT_DIFF_PACKAGE_LOCK_MASTER`" = "" ]; then
        printf "package-lock.json file has committed changes even though package.json does not.\n"
        printf "This probably happened because at least one of your package.json dependencies has\n"
        printf "a dependency that updated. You should update node_modules archive in this case.\n\n"
        printf "If these changes are intended, type (y) to proceed. Otherwise, type (n): "
        read RESPONSE
        
        [ ! "$RESPONSE" = "y" ] && exit
        UPDATE_MODULES=1
    fi
}

# Git is required for comparing package.json and package-lock.json.
if [ ! -f "/usr/bin/git" ]; then
    echo "You do not have git installed."
    exit 1
fi

# The user should have a git repo checked out in the source code base directory.
if [ ! -d "$BASE_DIR/.git" ]; then
    echo "$BASE_DIR does not have a git repository initialized."
    exit 1
fi

UPDATE_MODULES=0

# At this moment, aware-modules only accepts one mandatory argument:
#
# - --extract: Unpacks the node_modules.tar.gz archive into a runnable node_modules
#              directory.
# - --update:  Checks if package.json or package-lock.json have changed in comparison
#              to the current and master branches. If changes are detected, the archive
#              node_modules.tar.gz is updated.
if [ $# -eq 1 ]; then
    parse_options "$@"
else
    echo "Please specify --update or --extract as an argument."
fi