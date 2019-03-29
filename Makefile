SHA=$(shell git rev-parse --short HEAD)

build:
	docker build -t "template-rest-service" --build-arg SHA=$(SHA) .

run:
	docker run -p 127.0.0.1:8020:8020/tcp template-rest-service

build_node_modules: 
	npm install .

run_node_modules:
	node index.js -s $(SHA)

.PHONY: clean
