# template-rest-service

## Summary

Sample nodejs Boilerplate Repository for Innablr Technical Challenge.

The purpose of this repository/app is to bring consistency to the delivery of a REST service development and CI pattern by providing the basic scaffloding for projects to kick of delivery.

## Dependencies

The app uses
- Nodejs and NPM (6+)
- Docker (17.05+)
- make

## Build, testing and running locally

### Build
To install the app modules run command:

```
npm install
```

### Test
And then to test the app run command:
```
npm test
```

### Run
And to run the app run command:
```
node index.js
```
By default the web server will start on port 8020 and to browse the service you can go to http://localhost:8020.
To change the port you can export or set an environment variable called ```PORT``` to the required port.

Alternately, as the status uses a sha from the last git commit, you can run command:
```
make run
```
This will take the sha and pass it to the app.

## Build, test and publish via Travis-CI

Builds for this repo can be found here: https://travis-ci.org/danhornby/template-rest-service/builds

The build runs in 2 stages/parts:

#### install and test

- scripts 
    - npm install
    - npm test

```npm install``` installs all of the node modules required by the app.

```npm test``` runs the app and then tests it to ensure that the server is working and all code paths are working to produce the / and /status responses as expected.

#### build and publish

- scripts
    - make build
    - make publish


```make build``` is used to put together the docker image (based on the apline linux node base found here https://github.com/mhart/alpine-node/) which will contain an app that will always run with the 'current' git build sha getting returned by the /status/ of the application. The docker image number will correspond to the build number in travis ci.

```make publish``` pushes the runtime (second stage of the multistage docker) the dockerhub repo here: https://cloud.docker.com/repository/docker/danno123/template-rest-service/tags 

#### Updating the secret for travis

One secret is used in the build (the password to dockerhub - set as an env var called ```DOCKERHUB_PASSWORD```). To re-encrypt this use the method here: https://docs.travis-ci.com/user/environment-variables/#defining-encrypted-variables-in-travisyml 

To do this install travis and run:
```
travis encrypt DOCKERHUB_PASSWORD=super_secret --add env.matrix
```
Then save/push the changes to the .travis.yml.

(Note the username is also in the Makefile.)

## Further considerations

1. The pipeline does not conduct any deployment or contain any docker-compose or other method to run the docker images in any form of cluster or scheduler. This should be added as soon as the desired run-time target environment is better known.
2. The docker image chose in alpine however, node can clearly run on just about any base image. The best base image should be selected based on secuirty and performance considerations and may require some investigation.
3. CVE Scanning (e.g. clair: https://coreos.com/clair/docs/latest/) should definately be added to the pipeline as a matter of course for security reasons. Builds should be blocked if serious vuleranbilities are detected.
4. The docker image and app is not 'hardened'. Consideration should be given to the security standards of the team and the context (sensistivity) to which the services run. As a minimum stable local repositories should be used instead of public ones and SSL/TLS should come as standard.
5. Branch strategy is currently not in place within the repo/build/publish. GitFlow is the most common method of doing this and using branch protection and filters in the build pipeline should be considered, designed and built. A lot of this would be dependent on how the team currently works.
6. How this patern is shared/managed needs to be considered. Modularisation of this codebase should be considered.

