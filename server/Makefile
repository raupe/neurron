# Builds all the projects in the solution...
.PHONY: all_projects
all_projects: Server 

# Builds project 'Server'...
.PHONY: Server
Server: 
	make --directory="Server/" --file=Server.makefile

# Cleans all projects...
.PHONY: clean
clean:
	make --directory="Server/" --file=Server.makefile clean

