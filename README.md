# DevOps Homework 4 - Advanced Docker

## Task 1: File IO using docker containers
For this task, we have created two images namely `node-reader` and `node-wirter`.
- Image node-writer: This image installs `Node.js` and `socat` on a Centos base and runs the `main.js` script which randomly generates 20 words and writes to a file(`output.txt`) along with the current timestamp.
- Image node-reader: This image install `curl` on a Centos base.

### Building and starting the `node-writer` container
Run the following commands to start a container using this image
```
docker build -t node_writer .  # Builds the image
docker run -td --name writer node_writer  # Boots a container named writer
```

### Building and starting the `node-reader` container
Run the following commands to start a container using this image
```
docker build -t node_reader .  # Builds the image
docker run -td --link writer:writer --name reader node_reader  # Boots a container named reader linked to writer container
docker exec -it reader bash
curl writer:9001 > content.txt
cat content.txt  # Displays the content read from the writer container over port 9001
```





