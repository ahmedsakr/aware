#!/bin/bash

################ Setup Basic utilities ###########

# Install command-line editor
sudo apt install -y vim

# Install Visual Studio modern code editor
VSCODE=$(sudo find /tmp -name "code_*.deb")
sudo apt install -y $VSCODE

# Intall version control
sudo apt install -y git

# Install node package manager
sudo apt install -y npm

# resolve dependencies
sudo apt install -f

# Install 'n' npm module
sudo npm install -g n

# Update node to lastest stable version
sudo n stable

################## SETUP AWARE ###############

# Acquire GitHub username and e-mail
echo "What is your GitHub account name?"
read GITHUB_NAME
echo "What is the e-mail associated with your GitHub account?"
read GITHUB_EMAIL

# Globablly configure the given username and email
git config --global user.name $GITHUB_NAME
git config --global user.email $GITHUB_EMAIL

# Clone the Aware repo into the home directory
cd
git clone git@github.com:ahmedsakr/AwareStudent.git

# Install the npm modules
cd AwareStudent/aware-app
npm install

################## Setup Terminal #############

# Install terminator terminal
sudo apt install -y terminator

# Install Zsh
sudo apt install -y zsh

# Install Oh-my-Zsh!
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

# finally, resolve any dependencies
sudo apt install -f

# Go back to user directory
cd
