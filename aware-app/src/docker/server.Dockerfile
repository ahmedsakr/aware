# base image
FROM node:12.5.0

# set working directory
WORKDIR /aware-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /aware-app/node_modules/.bin:$PATH

# copy codebase into container and install
COPY . /aware-app/
RUN npm install --silent
RUN apt-get update && apt-get install -y vim

# start app
CMD npm run server