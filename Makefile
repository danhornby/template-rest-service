SOURCES=index.js

build:
	docker build -t "template-rest-service" .

run:
	docker run -p 127.0.0.1:8000:8020/tcp -e sha=123456ab template-rest-service

node_modules: package.json
	npm install .
	touch $@


.PHONY: clean
