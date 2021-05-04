#!/bin/bash

. ./config.sh

timestamp() {
  TZ='Europe/Kiev' date +%H:%M # current time
}

# Пример отправки значения оставщегося времени

send $"\$page=page1\n"

while true; do

# Пример отправки значения оставщегося времени (для простоты передается текущее время)
send $"time=Заморозка: $(timestamp)"

send $'t1=56\nt2=58\nvacuum1=940\nwifi=50\n'
sleep 1
send $'t1=58\nt2=56\nvacuum1=990\nwifi=60\n'
sleep 1
send $'t1=54\nt2=56\nvacuum1=960\nwifi=70\n#Comment'
sleep 1
send $'t1=65\nt2=56\nvacuum1=980\nwifi=40\n#Comment'
sleep 1

done
