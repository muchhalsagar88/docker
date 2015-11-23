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

## Task 2: Ambassador Pattern
For this task, two separate Azure VMs have been provisioned. Install `docker` and `docker-compose` on the instances using:

### Installing docker
```
wget -qO- https://get.docker.com/ | sh
sudo usermod -aG docker $(whoami)
```
### Installing docker-compose
```
sudo apt-get -y install python-pip
sudo pip install docker-compose
```

### Virtual machines
On the first virtual machine, there are two containers namely,
- redis: This is the docker container which has the redis server
- redis_ambassador: This is the docker container which connects to the redis server

On the second virtual machine, there are two containers namely,
- redis_ambassador_client: This is the docker container which will connect to the redis amabassador on the mentioned endpoint
- client_cli: This is the docker container which will connect to the redis through the ambassador and provide a CLI to interact with the Redis instance

The containers on the both the virtual machines can be spawned by running the following command in the directory containing the `docker-compose.yml` file.
```
docker-compose up
```
For the container named `client_cli`, run the following command on the second virtual machine
```
docker run -it --link redis_ambassador_client:redis --name client_cli relateiq/redis-cli
```

Note: The `client_cli` container cannot be started using docker-compose since the connection environment variable required while initializing the `redis_ambassador_client` container is not set until the command finishes executing. Hence, the cli container is started manually.



