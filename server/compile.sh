#!/bin/bash


sed -i 's/C:\/Program Files (x86)\/boost\//\/home\/neurron\/neurron\//g' Server/Server.makefile
sed -i 's/stage\/gcclib\"/stage\/lib\" -lboost_thread -lboost_chrono -lboost_system/g' Server/Server.makefile


make
