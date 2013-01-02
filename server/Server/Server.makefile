# Compiler flags...
CPP_COMPILER = g++
C_COMPILER = gcc

# Include paths...
Debug_Include_Path=-I"C:/Program Files (x86)/boost/boost_1_51_0/" 
Release_Include_Path=-I"C:/Program Files (x86)/boost/boost_1_51_0" 

# Library paths...
Debug_Library_Path=-L"C:/Program Files (x86)/boost/boost_1_51_0/stage/gcclib" 
Release_Library_Path=-L"C:/Program Files (x86)/boost/boost_1_51_0/stage/gcclib" 

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
Debug: create_folders gccDebug/LeakDetector.o gccDebug/Pool.o gccDebug/Singleton.o gccDebug/InputMsg.o gccDebug/hl_sha1.o gccDebug/HttpProtocol.o gccDebug/Msg.o gccDebug/InputMsgPool.o gccDebug/Server.o gccDebug/Main.o gccDebug/ServerPCH.o gccDebug/Output.o gccDebug/Grid.o gccDebug/Highscore.o gccDebug/Engine.o gccDebug/Manager.o gccDebug/StatusManager.o gccDebug/Game.o gccDebug/GameManager.o gccDebug/Element.o gccDebug/Obstacle.o gccDebug/ObstacleManager.o gccDebug/Player.o gccDebug/PlayerManager.o 
	g++ gccDebug/LeakDetector.o gccDebug/Pool.o gccDebug/Singleton.o gccDebug/InputMsg.o gccDebug/hl_sha1.o gccDebug/HttpProtocol.o gccDebug/Msg.o gccDebug/InputMsgPool.o gccDebug/Server.o gccDebug/Main.o gccDebug/ServerPCH.o gccDebug/Output.o gccDebug/Grid.o gccDebug/Highscore.o gccDebug/Engine.o gccDebug/Manager.o gccDebug/StatusManager.o gccDebug/Game.o gccDebug/GameManager.o gccDebug/Element.o gccDebug/Obstacle.o gccDebug/ObstacleManager.o gccDebug/Player.o gccDebug/PlayerManager.o  $(Debug_Library_Path) $(Debug_Libraries) -Wl,-rpath,./ -o ../gccDebug/Server.exe

# Compiles file LeakDetector.cpp for the Debug configuration...
-include gccDebug/LeakDetector.d
gccDebug/LeakDetector.o: LeakDetector.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c LeakDetector.cpp $(Debug_Include_Path) -o gccDebug/LeakDetector.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM LeakDetector.cpp $(Debug_Include_Path) > gccDebug/LeakDetector.d

# Compiles file Pool.cpp for the Debug configuration...
-include gccDebug/Pool.d
gccDebug/Pool.o: Pool.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Pool.cpp $(Debug_Include_Path) -o gccDebug/Pool.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Pool.cpp $(Debug_Include_Path) > gccDebug/Pool.d

# Compiles file Singleton.cpp for the Debug configuration...
-include gccDebug/Singleton.d
gccDebug/Singleton.o: Singleton.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Singleton.cpp $(Debug_Include_Path) -o gccDebug/Singleton.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Singleton.cpp $(Debug_Include_Path) > gccDebug/Singleton.d

# Compiles file InputMsg.cpp for the Debug configuration...
-include gccDebug/InputMsg.d
gccDebug/InputMsg.o: InputMsg.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c InputMsg.cpp $(Debug_Include_Path) -o gccDebug/InputMsg.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM InputMsg.cpp $(Debug_Include_Path) > gccDebug/InputMsg.d

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

# Compiles file Msg.cpp for the Debug configuration...
-include gccDebug/Msg.d
gccDebug/Msg.o: Msg.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Msg.cpp $(Debug_Include_Path) -o gccDebug/Msg.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Msg.cpp $(Debug_Include_Path) > gccDebug/Msg.d

# Compiles file InputMsgPool.cpp for the Debug configuration...
-include gccDebug/InputMsgPool.d
gccDebug/InputMsgPool.o: InputMsgPool.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c InputMsgPool.cpp $(Debug_Include_Path) -o gccDebug/InputMsgPool.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM InputMsgPool.cpp $(Debug_Include_Path) > gccDebug/InputMsgPool.d

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

# Compiles file Grid.cpp for the Debug configuration...
-include gccDebug/Grid.d
gccDebug/Grid.o: Grid.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Grid.cpp $(Debug_Include_Path) -o gccDebug/Grid.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Grid.cpp $(Debug_Include_Path) > gccDebug/Grid.d

# Compiles file Highscore.cpp for the Debug configuration...
-include gccDebug/Highscore.d
gccDebug/Highscore.o: Highscore.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Highscore.cpp $(Debug_Include_Path) -o gccDebug/Highscore.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Highscore.cpp $(Debug_Include_Path) > gccDebug/Highscore.d

# Compiles file Engine.cpp for the Debug configuration...
-include gccDebug/Engine.d
gccDebug/Engine.o: Engine.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Engine.cpp $(Debug_Include_Path) -o gccDebug/Engine.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Engine.cpp $(Debug_Include_Path) > gccDebug/Engine.d

# Compiles file Manager.cpp for the Debug configuration...
-include gccDebug/Manager.d
gccDebug/Manager.o: Manager.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Manager.cpp $(Debug_Include_Path) -o gccDebug/Manager.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Manager.cpp $(Debug_Include_Path) > gccDebug/Manager.d

# Compiles file StatusManager.cpp for the Debug configuration...
-include gccDebug/StatusManager.d
gccDebug/StatusManager.o: StatusManager.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c StatusManager.cpp $(Debug_Include_Path) -o gccDebug/StatusManager.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM StatusManager.cpp $(Debug_Include_Path) > gccDebug/StatusManager.d

# Compiles file Game.cpp for the Debug configuration...
-include gccDebug/Game.d
gccDebug/Game.o: Game.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Game.cpp $(Debug_Include_Path) -o gccDebug/Game.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Game.cpp $(Debug_Include_Path) > gccDebug/Game.d

# Compiles file GameManager.cpp for the Debug configuration...
-include gccDebug/GameManager.d
gccDebug/GameManager.o: GameManager.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c GameManager.cpp $(Debug_Include_Path) -o gccDebug/GameManager.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM GameManager.cpp $(Debug_Include_Path) > gccDebug/GameManager.d

# Compiles file Element.cpp for the Debug configuration...
-include gccDebug/Element.d
gccDebug/Element.o: Element.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Element.cpp $(Debug_Include_Path) -o gccDebug/Element.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Element.cpp $(Debug_Include_Path) > gccDebug/Element.d

# Compiles file Obstacle.cpp for the Debug configuration...
-include gccDebug/Obstacle.d
gccDebug/Obstacle.o: Obstacle.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Obstacle.cpp $(Debug_Include_Path) -o gccDebug/Obstacle.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Obstacle.cpp $(Debug_Include_Path) > gccDebug/Obstacle.d

# Compiles file ObstacleManager.cpp for the Debug configuration...
-include gccDebug/ObstacleManager.d
gccDebug/ObstacleManager.o: ObstacleManager.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c ObstacleManager.cpp $(Debug_Include_Path) -o gccDebug/ObstacleManager.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM ObstacleManager.cpp $(Debug_Include_Path) > gccDebug/ObstacleManager.d

# Compiles file Player.cpp for the Debug configuration...
-include gccDebug/Player.d
gccDebug/Player.o: Player.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c Player.cpp $(Debug_Include_Path) -o gccDebug/Player.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM Player.cpp $(Debug_Include_Path) > gccDebug/Player.d

# Compiles file PlayerManager.cpp for the Debug configuration...
-include gccDebug/PlayerManager.d
gccDebug/PlayerManager.o: PlayerManager.cpp
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -c PlayerManager.cpp $(Debug_Include_Path) -o gccDebug/PlayerManager.o
	$(CPP_COMPILER) $(Debug_Preprocessor_Definitions) $(Debug_Compiler_Flags) -MM PlayerManager.cpp $(Debug_Include_Path) > gccDebug/PlayerManager.d

# Builds the Release configuration...
.PHONY: Release
Release: create_folders gccRelease/LeakDetector.o gccRelease/Pool.o gccRelease/Singleton.o gccRelease/InputMsg.o gccRelease/hl_sha1.o gccRelease/HttpProtocol.o gccRelease/Msg.o gccRelease/InputMsgPool.o gccRelease/Server.o gccRelease/Main.o gccRelease/ServerPCH.o gccRelease/Output.o gccRelease/Grid.o gccRelease/Highscore.o gccRelease/Engine.o gccRelease/Manager.o gccRelease/StatusManager.o gccRelease/Game.o gccRelease/GameManager.o gccRelease/Element.o gccRelease/Obstacle.o gccRelease/ObstacleManager.o gccRelease/Player.o gccRelease/PlayerManager.o 
	g++ gccRelease/LeakDetector.o gccRelease/Pool.o gccRelease/Singleton.o gccRelease/InputMsg.o gccRelease/hl_sha1.o gccRelease/HttpProtocol.o gccRelease/Msg.o gccRelease/InputMsgPool.o gccRelease/Server.o gccRelease/Main.o gccRelease/ServerPCH.o gccRelease/Output.o gccRelease/Grid.o gccRelease/Highscore.o gccRelease/Engine.o gccRelease/Manager.o gccRelease/StatusManager.o gccRelease/Game.o gccRelease/GameManager.o gccRelease/Element.o gccRelease/Obstacle.o gccRelease/ObstacleManager.o gccRelease/Player.o gccRelease/PlayerManager.o  $(Release_Library_Path) $(Release_Libraries) -Wl,-rpath,./ -o ../gccRelease/Server.exe

# Compiles file LeakDetector.cpp for the Release configuration...
-include gccRelease/LeakDetector.d
gccRelease/LeakDetector.o: LeakDetector.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c LeakDetector.cpp $(Release_Include_Path) -o gccRelease/LeakDetector.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM LeakDetector.cpp $(Release_Include_Path) > gccRelease/LeakDetector.d

# Compiles file Pool.cpp for the Release configuration...
-include gccRelease/Pool.d
gccRelease/Pool.o: Pool.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Pool.cpp $(Release_Include_Path) -o gccRelease/Pool.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Pool.cpp $(Release_Include_Path) > gccRelease/Pool.d

# Compiles file Singleton.cpp for the Release configuration...
-include gccRelease/Singleton.d
gccRelease/Singleton.o: Singleton.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Singleton.cpp $(Release_Include_Path) -o gccRelease/Singleton.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Singleton.cpp $(Release_Include_Path) > gccRelease/Singleton.d

# Compiles file InputMsg.cpp for the Release configuration...
-include gccRelease/InputMsg.d
gccRelease/InputMsg.o: InputMsg.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c InputMsg.cpp $(Release_Include_Path) -o gccRelease/InputMsg.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM InputMsg.cpp $(Release_Include_Path) > gccRelease/InputMsg.d

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

# Compiles file Msg.cpp for the Release configuration...
-include gccRelease/Msg.d
gccRelease/Msg.o: Msg.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Msg.cpp $(Release_Include_Path) -o gccRelease/Msg.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Msg.cpp $(Release_Include_Path) > gccRelease/Msg.d

# Compiles file InputMsgPool.cpp for the Release configuration...
-include gccRelease/InputMsgPool.d
gccRelease/InputMsgPool.o: InputMsgPool.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c InputMsgPool.cpp $(Release_Include_Path) -o gccRelease/InputMsgPool.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM InputMsgPool.cpp $(Release_Include_Path) > gccRelease/InputMsgPool.d

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

# Compiles file Grid.cpp for the Release configuration...
-include gccRelease/Grid.d
gccRelease/Grid.o: Grid.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Grid.cpp $(Release_Include_Path) -o gccRelease/Grid.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Grid.cpp $(Release_Include_Path) > gccRelease/Grid.d

# Compiles file Highscore.cpp for the Release configuration...
-include gccRelease/Highscore.d
gccRelease/Highscore.o: Highscore.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Highscore.cpp $(Release_Include_Path) -o gccRelease/Highscore.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Highscore.cpp $(Release_Include_Path) > gccRelease/Highscore.d

# Compiles file Engine.cpp for the Release configuration...
-include gccRelease/Engine.d
gccRelease/Engine.o: Engine.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Engine.cpp $(Release_Include_Path) -o gccRelease/Engine.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Engine.cpp $(Release_Include_Path) > gccRelease/Engine.d

# Compiles file Manager.cpp for the Release configuration...
-include gccRelease/Manager.d
gccRelease/Manager.o: Manager.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Manager.cpp $(Release_Include_Path) -o gccRelease/Manager.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Manager.cpp $(Release_Include_Path) > gccRelease/Manager.d

# Compiles file StatusManager.cpp for the Release configuration...
-include gccRelease/StatusManager.d
gccRelease/StatusManager.o: StatusManager.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c StatusManager.cpp $(Release_Include_Path) -o gccRelease/StatusManager.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM StatusManager.cpp $(Release_Include_Path) > gccRelease/StatusManager.d

# Compiles file Game.cpp for the Release configuration...
-include gccRelease/Game.d
gccRelease/Game.o: Game.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Game.cpp $(Release_Include_Path) -o gccRelease/Game.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Game.cpp $(Release_Include_Path) > gccRelease/Game.d

# Compiles file GameManager.cpp for the Release configuration...
-include gccRelease/GameManager.d
gccRelease/GameManager.o: GameManager.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c GameManager.cpp $(Release_Include_Path) -o gccRelease/GameManager.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM GameManager.cpp $(Release_Include_Path) > gccRelease/GameManager.d

# Compiles file Element.cpp for the Release configuration...
-include gccRelease/Element.d
gccRelease/Element.o: Element.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Element.cpp $(Release_Include_Path) -o gccRelease/Element.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Element.cpp $(Release_Include_Path) > gccRelease/Element.d

# Compiles file Obstacle.cpp for the Release configuration...
-include gccRelease/Obstacle.d
gccRelease/Obstacle.o: Obstacle.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Obstacle.cpp $(Release_Include_Path) -o gccRelease/Obstacle.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Obstacle.cpp $(Release_Include_Path) > gccRelease/Obstacle.d

# Compiles file ObstacleManager.cpp for the Release configuration...
-include gccRelease/ObstacleManager.d
gccRelease/ObstacleManager.o: ObstacleManager.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c ObstacleManager.cpp $(Release_Include_Path) -o gccRelease/ObstacleManager.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM ObstacleManager.cpp $(Release_Include_Path) > gccRelease/ObstacleManager.d

# Compiles file Player.cpp for the Release configuration...
-include gccRelease/Player.d
gccRelease/Player.o: Player.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c Player.cpp $(Release_Include_Path) -o gccRelease/Player.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM Player.cpp $(Release_Include_Path) > gccRelease/Player.d

# Compiles file PlayerManager.cpp for the Release configuration...
-include gccRelease/PlayerManager.d
gccRelease/PlayerManager.o: PlayerManager.cpp
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -c PlayerManager.cpp $(Release_Include_Path) -o gccRelease/PlayerManager.o
	$(CPP_COMPILER) $(Release_Preprocessor_Definitions) $(Release_Compiler_Flags) -MM PlayerManager.cpp $(Release_Include_Path) > gccRelease/PlayerManager.d

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

