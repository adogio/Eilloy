ifeq ($(OS),Windows_NT)
	UNAME := win32
else
	UNAME := $(shell uname)
endif

Eilloy: page

electron:
	tsc
ifeq ($(UNAME), win32)
	.\node_modules\.bin\electron .
else
	./node_modules/.bin/electron .
endif

page:
ifeq ($(UNAME), win32)
	.\node_modules\.bin\webpack-dev-server --config webpack.dev.js
else
	./node_modules/.bin/webpack-dev-server --config webpack.dev.js
endif

build:
	tsc
ifeq ($(UNAME), win32)
	.\node_modules\.bin\webpack --config webpack.config.js
	.\node_modules\.bin\electron-builder
else
	./node_modules/.bin/webpack --config webpack.config.js
	./node_modules/.bin/electron-builder
endif

clean :
ifeq ($(UNAME), win32)
	del .\dist\
else
	rm -rf dist/main/*.js dist/main/*.js.map  dist/renderer/*.js dist/renderer/*.js.map  dist/renderer/*.html dist
endif

install:
	npm install
	npm install --only=dev

reinstall: clean
ifeq ($(UNAME), win32)
	del .\node_modules\
else
	rm -rf ./node_modules/
endif
	make install