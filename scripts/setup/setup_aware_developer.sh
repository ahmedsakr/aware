#!/bin/bash

case "`uname -a`" in

    *Ubuntu*)
    OS="ubuntu"
    ;;

    *fc*)
    OS="fedora"
    ;;

    *)
    echo "Unsupported OS." && exit 1
esac

if [ "$OS" = "ubuntu" ]; then
    PACKAGE_MANAGER=apt
else
    PACKAGE_MANAGER=dnf
fi

# Update all pre-installed package
sudo $PACKAGE_MANAGER update

################ Setup Basic utilities ###########

# Install command-line editor.
sudo $PACKAGE_MANAGER install -y vim

# The microsoft repo must be added prior to attempting to install code.
if [ "$OS" = "ubuntu" ]; then
    MICROSOFT_GPG_KEYS=https://packages.microsoft.com/keys/microsoft.asc
    MICROSOFT_PACKAGE_REPO="deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
    wget -qO- $MICROSOFT_GPG_KEYS | sudo apt-key add -
    sudo add-apt-repository $MICROSOFT_PACKAGE_REPO
else
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.
    sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=\
    https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\
    \ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
    sudo $PACKAGE_MANAGER check-update
fi

# Install VS Code.
sudo $PACKAGE_MANAGER install -y code

# Install version control
sudo $PACKAGE_MANAGER install -y git

# Install node package manager
sudo $PACKAGE_MANAGER install -y npm

# resolve dependencies
sudo $PACKAGE_MANAGER install -f

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
git clone git@github.com:ahmedsakr/aware.git

# Install the npm modules
cd aware/aware-app
npm install

################## Setup Terminal #############

# Install terminator terminal
sudo $PACKAGE_MANAGER install -y terminator

# Install Zsh
sudo $PACKAGE_MANAGER install -y zsh

# Install Oh-my-Zsh!
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

# finally, resolve any dependencies
sudo $PACKAGE_MANAGER install -f

# Go back to user directory
cd
