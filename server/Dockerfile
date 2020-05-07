# set default password
FROM node:10

ARG DB_URL
ARG PORT=5000
# set defualt environment variable to connect to mongo db
ENV DB_URL=${DB_URL}
ENV PORT=${PORT}

WORKDIR /src/usr/app/

COPY ./mongoose .
COPY localServer.js .
COPY routes.js .
COPY package.json .

# add @sap registry 
RUN npm config set @sap:registry https://npm.sap.com
RUN npm install

EXPOSE ${PORT}

ENTRYPOINT [ "node", "localServer.js" ]
