# eiti-client

This repository stores and run build result of *npm run build* script of eiti-app stored in app folder. This is production version to be hosted on Cloud Foundry environment. Command to run this app:

```bash
serve -s build
```

You need to place here build result, *build* folder is ignored by git.

## Docker image

After copied 'build' folder you can make docker and run docker image.

```bash
docker pull konrazem/eiti-client
```

```bash
docker build -t konrazem/eiti-client .
```

```bash
docker run -d -p 5005:5004 --rm eiti-client:latest
```
