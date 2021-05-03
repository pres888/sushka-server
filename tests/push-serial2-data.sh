#!/bin/bash

. ./config.sh

send $'$start=Другая серия\n'

send $'!t1=10\n!t2=20\n'
sleep 1
send $'!t1=20\n!t2=10\n'

send $'$stop=Тестовая серия\n'
