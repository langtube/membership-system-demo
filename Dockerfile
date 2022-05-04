FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ./build /workspace

WORKDIR /workspace/api 

RUN npm install --only=production 

CMD ["node", "main"]