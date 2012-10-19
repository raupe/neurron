# Compiler flags...
CPP_COMPILER = g++
C_COMPILER = gcc

# Include paths...
Debug_Include_Path=-I"/home/neurron/neurron/boost_1_51_0/" 
Release_Include_Path=-I"/home/neurron/neurron/boost_1_51_0" 

# Library paths...
Debug_Library_Path=-L"/home/neurron/neurron/boost_1_51_0/stage/lib" 
Release_Library_Path=-L"/home/neurron/neurron/boost_1_51_0/stage/lib" 

# Additional libraries...
Debug_Libraries=
Release_Libraries=

# Preprocessor definitions...
Debug_Preprocessor_Definitions=-D GCC_BUILD -D _DEBUG -D _WINDOWS 
Release_Preprocessor_Definitions=-D GCC_BUILD -D NDEBUG -D _WINDOWS 

# Implictly linked object files...
Debug_Implicitly_Linked_Objects=
Release_Implicitly_Linked_Objects=

# Compiler flags...
Debug_Compiler_Flags=-O0 -g 
Release_Compiler_Flags=-O2 

# Builds all configurations for this project...
.PHONY: build_all_configurations
build_all_configurations: Debug Release 

# Builds the Debug configuration...
.PHONY: Debug
Debug: create_folders gccDebug/LeakDetector.o gccDebug/Singleton.o gccDebug/hl_sha1.o gccDebug/HttpProtocol.o gccDebug/Server.o gccDebug/Main.o gccDebug/ServerPCH.o gccDebug/Output.o gccDebug/Engine.o gccDebug/Game.o gccDebug/GameFactory.o gccDebug/Msg.o 
	g++ gccDebug/LeakDetector.o gccDebug/Singleton.o gccDebug/hl_sha1.o gccDebug/HttpProtocol.o gccDebug/Server.o gccDebug/Main.o gccDebug/ServerPCH.o gccDebug/Output.o gccDebug/Engine.o gccDebug/Game.o gccDebug/GameFactory.o gccDebug/Msg.o  $(Debug_Library_Path) $(Debug_Libraries) -Wl,-rpath,./ -o ../gccDebug/Server.exe

# Compiles file LeakDetector.cpp for the Debug configuration...
-include gccDebug/LeakDetector.d
gccDebug/LeakDetector.o: LeakDetector.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c LeakDetector.cpp $(Debug_Include_Path) -o gccDebug/LeakDetector.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM LeakDetector.cpp $(Debug_Include_Path) > gccDebug/LeakDetector.d

# Compiles file Singleton.cpp for the Debug configuration...
-include gccDebug/Singleton.d
gccDebug/Singleton.o: Singleton.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Singleton.cpp $(Debug_Include_Path) -o gccDebug/Singleton.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Singleton.cpp $(Debug_Include_Path) > gccDebug/Singleton.d

# Compiles file hl_sha1.cpp for the Debug configuration...
-include gccDebug/hl_sha1.d
gccDebug/hl_sha1.o: hl_sha1.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c hl_sha1.cpp $(Debug_Include_Path) -o gccDebug/hl_sha1.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM hl_sha1.cpp $(Debug_Include_Path) > gccDebug/hl_sha1.d

# Compiles file HttpProtocol.cpp for the Debug configuration...
-include gccDebug/HttpProtocol.d
gccDebug/HttpProtocol.o: HttpProtocol.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c HttpProtocol.cpp $(Debug_Include_Path) -o gccDebug/HttpProtocol.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM HttpProtocol.cpp $(Debug_Include_Path) > gccDebug/HttpProtocol.d

# Compiles file Server.cpp for the Debug configuration...
-include gccDebug/Server.d
gccDebug/Server.o: Server.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Server.cpp $(Debug_Include_Path) -o gccDebug/Server.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Server.cpp $(Debug_Include_Path) > gccDebug/Server.d

# Compiles file Main.cpp for the Debug configuration...
-include gccDebug/Main.d
gccDebug/Main.o: Main.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Main.cpp $(Debug_Include_Path) -o gccDebug/Main.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Main.cpp $(Debug_Include_Path) > gccDebug/Main.d

# Compiles file ServerPCH.cpp for the Debug configuration...
-include gccDebug/ServerPCH.d
gccDebug/ServerPCH.o: ServerPCH.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c ServerPCH.cpp $(Debug_Include_Path) -o gccDebug/ServerPCH.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM ServerPCH.cpp $(Debug_Include_Path) > gccDebug/ServerPCH.d

# Compiles file Output.cpp for the Debug configuration...
-include gccDebug/Output.d
gccDebug/Output.o: Output.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Output.cpp $(Debug_Include_Path) -o gccDebug/Output.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Output.cpp $(Debug_Include_Path) > gccDebug/Output.d

# Compiles file Engine.cpp for the Debug configuration...
-include gccDebug/Engine.d
gccDebug/Engine.o: Engine.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Engine.cpp $(Debug_Include_Path) -o gccDebug/Engine.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Engine.cpp $(Debug_Include_Path) > gccDebug/Engine.d

# Compiles file Game.cpp for the Debug configuration...
-include gccDebug/Game.d
gccDebug/Game.o: Game.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Game.cpp $(Debug_Include_Path) -o gccDebug/Game.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Game.cpp $(Debug_Include_Path) > gccDebug/Game.d

# Compiles file GameFactory.cpp for the Debug configuration...
-include gccDebug/GameFactory.d
gccDebug/GameFactory.o: GameFactory.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c GameFactory.cpp $(Debug_Include_Path) -o gccDebug/GameFactory.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM GameFactory.cpp $(Debug_Include_Path) > gccDebug/GameFactory.d

# Compiles file Msg.cpp for the Debug configuration...
-include gccDebug/Msg.d
gccDebug/Msg.o: Msg.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Msg.cpp $(Debug_Include_Path) -o gccDebug/Msg.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Msg.cpp $(Debug_Include_Path) > gccDebug/Msg.d

# Builds the Release configuration...
.PHONY: Release
Release: create_folders gccRelease/LeakDetector.o gccRelease/Singleton.o gccRelease/hl_sha1.o gccRelease/HttpProtocol.o gccRelease/Server.o gccRelease/Main.o gccRelease/ServerPCH.o gccRelease/Output.o gccRelease/Engine.o gccRelease/Game.o gccRelease/GameFactory.o gccRelease/Msg.o 
	g++ gccRelease/LeakDetector.o gccRelease/Singleton.o gccRelease/hl_sha1.o gccRelease/HttpProtocol.o gccRelease/Server.o gccRelease/Main.o gccRelease/ServerPCH.o gccRelease/Output.o gccRelease/Engine.o gccRelease/Game.o gccRelease/GameFactory.o gccRelease/Msg.o  $(Release_Library_Path) $(Release_Libraries) -Wl,-rpath,./ -o ../gccRelease/Server.exe

# Compiles file LeakDetector.cpp for the Release configuration...
-include gccRelease/LeakDetector.d
gccRelease/LeakDetector.o: LeakDetector.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c LeakDetector.cpp $(Release_Include_Path) -o gccRelease/LeakDetector.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM LeakDetector.cpp $(Release_Include_Path) > gccRelease/LeakDetector.d

# Compiles file Singleton.cpp for the Release configuration...
-include gccRelease/Singleton.d
gccRelease/Singleton.o: Singleton.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Singleton.cpp $(Release_Include_Path) -o gccRelease/Singleton.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Singleton.cpp $(Release_Include_Path) > gccRelease/Singleton.d

# Compiles file hl_sha1.cpp for the Release configuration...
-include gccRelease/hl_sha1.d
gccRelease/hl_sha1.o: hl_sha1.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c hl_sha1.cpp $(Release_Include_Path) -o gccRelease/hl_sha1.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM hl_sha1.cpp $(Release_Include_Path) > gccRelease/hl_sha1.d

# Compiles file HttpProtocol.cpp for the Release configuration...
-include gccRelease/HttpProtocol.d
gccRelease/HttpProtocol.o: HttpProtocol.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c HttpProtocol.cpp $(Release_Include_Path) -o gccRelease/HttpProtocol.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM HttpProtocol.cpp $(Release_Include_Path) > gccRelease/HttpProtocol.d

# Compiles file Server.cpp for the Release configuration...
-include gccRelease/Server.d
gccRelease/Server.o: Server.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Server.cpp $(Release_Include_Path) -o gccRelease/Server.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Server.cpp $(Release_Include_Path) > gccRelease/Server.d

# Compiles file Main.cpp for the Release configuration...
-include gccRelease/Main.d
gccRelease/Main.o: Main.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Main.cpp $(Release_Include_Path) -o gccRelease/Main.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Main.cpp $(Release_Include_Path) > gccRelease/Main.d

# Compiles file ServerPCH.cpp for the Release configuration...
-include gccRelease/ServerPCH.d
gccRelease/ServerPCH.o: ServerPCH.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c ServerPCH.cpp $(Release_Include_Path) -o gccRelease/ServerPCH.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM ServerPCH.cpp $(Release_Include_Path) > gccRelease/ServerPCH.d

# Compiles file Output.cpp for the Release configuration...
-include gccRelease/Output.d
gccRelease/Output.o: Output.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Output.cpp $(Release_Include_Path) -o gccRelease/Output.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Output.cpp $(Release_Include_Path) > gccRelease/Output.d

# Compiles file Engine.cpp for the Release configuration...
-include gccRelease/Engine.d
gccRelease/Engine.o: Engine.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Engine.cpp $(Release_Include_Path) -o gccRelease/Engine.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Engine.cpp $(Release_Include_Path) > gccRelease/Engine.d

# Compiles file Game.cpp for the Release configuration...
-include gccRelease/Game.d
gccRelease/Game.o: Game.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Game.cpp $(Release_Include_Path) -o gccRelease/Game.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Game.cpp $(Release_Include_Path) > gccRelease/Game.d

# Compiles file GameFactory.cpp for the Release configuration...
-include gccRelease/GameFactory.d
gccRelease/GameFactory.o: GameFactory.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c GameFactory.cpp $(Release_Include_Path) -o gccRelease/GameFactory.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM GameFactory.cpp $(Release_Include_Path) > gccRelease/GameFactory.d

# Compiles file Msg.cpp for the Release configuration...
-include gccRelease/Msg.d
gccRelease/Msg.o: Msg.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Msg.cpp $(Release_Include_Path) -o gccRelease/Msg.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Msg.cpp $(Release_Include_Path) > gccRelease/Msg.d

# Creates the intermediate and output folders for each configuration...
.PHONY: create_folders
create_folders:
	mkdir -p gccDebug
	mkdir -p ../gccDebug
	mkdir -p gccRelease
	mkdir -p ../gccRelease

# Cleans intermediate and output files (objects, libraries, executables)...
.PHONY: clean
clean:
	rm -f gccDebug/*.o
	rm -f gccDebug/*.d
	rm -f ../gccDebug/*.a
	rm -f ../gccDebug/*.so
	rm -f ../gccDebug/*.dll
	rm -f ../gccDebug/*.exe
	rm -f gccRelease/*.o
	rm -f gccRelease/*.d
	rm -f ../gccRelease/*.a
	rm -f ../gccRelease/*.so
	rm -f ../gccRelease/*.dll
	rm -f ../gccRelease/*.exe

