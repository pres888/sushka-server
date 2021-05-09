#!/bin/bash

. ./config.sh

for i in $(seq 1 $END); do
    echo $i
done

send $'$start=Тестовая серия1\n'

send $'!t1=20\n!t2=10\n'

send $'$start=Тестовая серия2\n'

send $'!t1=20\n!t2=10\n'

send $'$stop=Тестовая серия2\n'
