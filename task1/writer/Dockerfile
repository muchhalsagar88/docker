FROM    	centos:centos6
MAINTAINER	Sagar Muchhal
# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm
RUN 	yum install -y socat

# Bundle app source
COPY ./src /src

RUN	 ["node", "/src/main.js", "output.txt"]

EXPOSE  9001
CMD socat -vv TCP-LISTEN:9001,crlf,reuseaddr,fork SYSTEM:"cat output.txt" 
