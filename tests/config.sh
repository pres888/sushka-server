#!/bin/bash

#HOST=http://localhost:8081
HOST=http://sushka.navi.cc:8081
TOKEN=default-token
HWID=1234

function send {
    # echo "send" "$1"
    curl -X POST -H "Content-Type: text/plain" -d "$1" $HOST/$TOKEN/$HWID
}
