# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /aware-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /aware-app/node_modules/.bin:$PATH

# copy codebase into container and install
COPY . /aware-app/
RUN npm install --silent

# start app
CMD npm run client
