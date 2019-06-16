# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /aware-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /aware-app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /aware-app/package.json
RUN npm install -g nodemon --silent
RUN npm install --silent
EXPOSE 3000

# start app
CMD npm run server >& /dev/null
CMD npm run client
