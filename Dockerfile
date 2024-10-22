FROM node:14
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN yarn install
RUN yarn run build
CMD ["yarn", "run","serve"]

