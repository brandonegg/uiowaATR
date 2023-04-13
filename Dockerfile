# Production Environment Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start