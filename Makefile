SHA=$(shell git rev-parse --short HEAD)

build:
	@echo "Travis build number for tag: $(TRAVIS_BUILD_NUMBER)"
	docker build -t danno123/template-rest-service:$(TRAVIS_BUILD_NUMBER) --build-arg SHA=$(SHA) .

release: 
	docker tag danno123/template-rest-service:$(TRAVIS_BUILD_NUMBER) danno123/template-rest-service:latest
	@echo $(DOCKERHUB_PASSWORD) | docker login -u danno123 --password-stdin
	docker push danno123/template-rest-service:$(TRAVIS_BUILD_NUMBER)
	docker push danno123/template-rest-service:latest

run:
	docker run -p 127.0.0.1:8020:8020/tcp template-rest-service

test_node_modules:
	npm test

build_node_modules: 
	npm install .

run_node_modules:
	node index.js -s $(SHA)

.PHONY: clean
