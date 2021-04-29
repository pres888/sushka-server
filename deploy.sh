#!/bin/bash

# npm run build || exit 1

APP_ROOT="/opt/sushka.navi.cc"
SERVER=root@sushka.navi.cc

echo "Publish: sushka.navi.cc"

ssh $SERVER mkdir -p $APP_ROOT
#rsync -av  ./build/ root@sushka.navi.cc:$APP_ROOT/www-dev/
#rsync -az -e ssh --exclude '.git/*' --exclude 'node_modules/*' --exclude 'tests/*' --exclude 'src/*' . $SERVER:$APP_ROOT
rsync -az -e ssh --exclude '.git/*' --exclude 'node_modules/*' --exclude 'pages/*' --exclude 'database/*' . $SERVER:$APP_ROOT
