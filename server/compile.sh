#!/bin/bash

# stop server
svc -hd ~/service/gameserver/

# adapt paths
sed -i 's/C:\/Program Files (x86)\/boost\//\/home\/neurron\/neurron\//g' Server/Server.makefile
sed -i 's/stage\/gcclib\"/stage\/lib\" -lboost_thread -lboost_chrono -lboost_system/g' Server/Server.makefile

# compile
make clean
make

# start server
#svc -hu ~/service/gameserver/
