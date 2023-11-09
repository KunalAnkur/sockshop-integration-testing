FROM mhart/alpine-node

RUN mkdir -p /integration
WORKDIR /integration
COPY package.json /integration/

RUN npm install

COPY index.js /integration/

CMD [ "npm", "test" ]
