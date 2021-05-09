#!/bin/bash

. ./config.sh

for i in $(seq 1 $END); do
    echo $i
done

send $'$start=Тестовая серия1\n'

