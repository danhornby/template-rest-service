# Do the npm install or yarn install in the full image
FROM mhart/alpine-node:10
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base-8
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 8020
CMD ["sh", "-c", "node index.js -s $sha"]