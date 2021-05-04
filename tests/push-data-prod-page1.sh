#!/bin/bash


HOST=http://sushka.navi.cc:8081
#HOST=http://localhost:8081
TOKEN=default-token
HWID=1234-test

timestamp() {
  TZ='Europe/Kiev' date +%H:%M # current time
}

# Пример отправки значения оставщегося времени



# Пример отправки значения оставщегося времени (для простоты передается текущее время)
curl -X POST -H "Content-Type: text/plain" -d $'$page=page1' $HOST/$TOKEN/$HWID

