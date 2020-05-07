#----------------------
FROM node:10
#----------------------
ARG PORT=5001
ENV PORT=$PORT
WORKDIR /usr/src/app
COPY build ./build
RUN npm install -g serve
# serve is running react app at 5004
EXPOSE $PORT
RUN echo "run on port ${PORT}"

# you cannot use ARG in ENTRYPOINT
ENTRYPOINT serve -l "${PORT}" -s build
#  docker run -d -p 5005:5004 --rm eiti-app-build:latest