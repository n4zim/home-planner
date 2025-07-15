FROM node:alpine AS build
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install
COPY src src
ADD esbuild.js tsconfig.json ./
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=build /app/build build
ADD index.js package.json LICENSE ./
ADD public public
RUN mkdir persistent
RUN echo "https://github.com/n4zim/home-planner" > README.md
CMD ["node", "index.js"]
