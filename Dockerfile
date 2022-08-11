FROM node:17.8
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /

COPY . .

RUN ["npm","install","--legacy-peer-deps"]

RUN ["npm","run","build"]

ENV PORT 3000

EXPOSE $PORT

CMD ["npx","next","start","-p", "$PORT"]