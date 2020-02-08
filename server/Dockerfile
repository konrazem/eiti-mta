ARG VERSION=10
# set default password

FROM node:${VERSION}

# set defualt environment variable to connect to mongo db
ENV DATABASE_URL="mongodb+srv://konrazem:admin@mongocluster-a6fdy.mongodb.net/catalogs?retryWrites=true&w=majority"
ENV NODE_ENV="production"


# create and go into this directory 
WORKDIR /home/kgrzyb/app/
COPY . . 

# add @sap registry 
RUN npm config set @sap:registry https://npm.sap.com

RUN npm install && node server.js

EXPOSE 5001