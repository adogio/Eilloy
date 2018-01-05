ifeq ($(OS),Windows_NT)
	UNAME := win32
else
	UNAME := $(shell uname)
endif

Eilloy:

electron:
	
install:
	npm install
	npm install --only=dev