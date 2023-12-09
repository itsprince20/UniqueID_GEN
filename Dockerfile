# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:14.17.6

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
# CMD [ "node", "index.js" ]

CMD [ "npm", "run", "dev"]


# CMD [ "npm", "run", "server"]
#gcloud builds submit --tag gcr.io/iserveustaging/snowflake-test && gcloud run deploy --image gcr.io/iserveustaging/snowflake-test --platform managed


