FROM node:18.20.2 as builder

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY $VITE_GOOGLE_API_KEY
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL

COPY ./web /opt/iron-fork-web
WORKDIR /opt/iron-fork-web
RUN npm ci
RUN npm run build

FROM node:18.20.2-alpine3.19

COPY ./api /opt/iron-fork-api
WORKDIR /opt/iron-fork-api
COPY --from=builder /opt/iron-fork-web/dist /opt/iron-fork-api/web/build
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
