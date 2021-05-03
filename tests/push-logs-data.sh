#!/bin/bash

. ./config.sh

send $'#errorMsg=Ошибка заморозки. Превышено время ожидания.\n'
send $'#eventMsg=Все хорошо, не парься!.\n'
