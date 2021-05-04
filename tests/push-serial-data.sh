#!/bin/bash

. ./config.sh

for i in $(seq 1 $END); do
    echo $i
done

send $'$start=Тестовая серия\n'

send $'!t1=10\n!t2=20\n'
sleep 5
send $'!t1=20\n!t2=10\n'
sleep 5
send $'!t1=40\n!t2=10\n'
sleep 5
send $'!t1=60\n!t2=20\n'
sleep 5
send $'!t1=50\n!t2=10\n'
sleep 10
send $'!t1=50\n!t2=10\n'
sleep 10
send $'!t1=50\n!t2=10\n'
sleep 10
send $'!t1=50\n!t2=10\n'
sleep 10
send $'!t1=40\n!t2=10\n'
sleep 10
send $'!t1=35\n!t2=10\n'
sleep 5
send $'!t1=25\n!t2=10\n'
sleep 5
send $'!t1=50\n!t2=10\n'
sleep 5
send $'!t1=30\n!t2=10\n'
sleep 5
send $'!t1=50\n!t2=10\n'
sleep 5
send $'!t1=51\n!t2=10\n'
sleep 5
send $'!t1=50\n!t2=10\n'
sleep 5
send $'!t1=45\n!t2=10\n'
sleep 5
send $'!t1=50\n!t2=10\n'
sleep 5
send $'!t1=56\n!t2=10\n'
sleep 5
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 1
send $'!t1=20\n!t2=10\n'
sleep 1
send $'!t1=56\n!t2=10\n'
sleep 1
send $'!t1=80\n!t2=10\n'
sleep 5
send $'!t1=20\n!t2=10\n'

send $'$stop=Тестовая серия\n'
