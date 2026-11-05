FROM node:24-alpine
ENV NODE_ENV=production DATA_DIR=/data PORT=8080 HOST=0.0.0.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY parsers ./parsers
COPY services ./services
COPY public ./public
EXPOSE 8080
VOLUME ["/data"]
HEALTHCHECK --start-period=180s --interval=60s --timeout=5s CMD node -e "fetch('http://127.0.0.1:8080/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "services/server.mjs"]

COPY scripts ./scripts
