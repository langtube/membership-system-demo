#!/bin/bash

echo '开始构建 ... '

cd ./api && yarn build
cd ../app && yarn build

echo '构建结束 ... '