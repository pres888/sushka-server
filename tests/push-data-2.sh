#!/bin/bash


HOST=http://localhost:8081
TOKEN=default-token
HWID=1234


curl -X POST -H "Content-Type: text/plain" -d $'pager1=page2\n' $HOST/$TOKEN/$HWID
