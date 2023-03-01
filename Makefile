install: install-deps

start:
	make start-backend & make start-frontend

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test
