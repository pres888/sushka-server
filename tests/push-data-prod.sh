#!/bin/bash


HOST=http://sushka.navi.cc:8081
#HOST=http://localhost:8081
TOKEN=default-token
HWID=1234

timestamp() {
  TZ='Europe/Kiev' date +%H:%M # current time
}

# Пример отправки значения оставщегося времени


while true; do

# Пример отправки значения оставщегося времени (для простоты передается текущее время)
curl -X POST -H "Content-Type: text/plain" -d $"time=Заморозка: $(timestamp)" $HOST/$TOKEN/$HWID

curl -X POST -H "Content-Type: text/plain" -d $'t1=56\nt2=58\nvacuum1=940\nwifi=50\n' $HOST/$TOKEN/$HWID
sleep 1
curl -X POST -H "Content-Type: text/plain" -d $'t1=58\nt2=56\nvacuum1=990\nwifi=60\n' $HOST/$TOKEN/$HWID
sleep 1
curl -X POST -H "Content-Type: text/plain" -d $'t1=54\nt2=56\nvacuum1=960\nwifi=70\n#Comment' $HOST/$TOKEN/$HWID
sleep 1
curl -X POST -H "Content-Type: text/plain" -d $'t1=65\nt2=56\nvacuum1=980\nwifi=40\n#Comment' $HOST/$TOKEN/$HWID
sleep 1

done
