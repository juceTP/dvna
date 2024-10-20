FROM node:carbon-buster
LABEL MAINTAINER="Subash SN"

WORKDIR /app
COPY package*.json ./

RUN apt-get update && apt-get install -y build-essential python
RUN npm install --build-from-source

COPY . .

CMD ["npm", "start"]
