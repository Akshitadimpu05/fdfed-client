FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Copy env variables (excluding Firebase-related ones)
# Alternatively, you can pass these as build args or mount a file
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_RECAPTCHA_SECRET_KEY
ARG VITE_RAZORPAY_KEY_ID
ARG VITE_RAZORPAY_SECRET_KEY
ARG VITE_ADMIN_PASS
ARG VITE_SERVER_URL

ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
ENV VITE_RECAPTCHA_SECRET_KEY=$VITE_RECAPTCHA_SECRET_KEY
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
ENV VITE_RAZORPAY_SECRET_KEY=$VITE_RAZORPAY_SECRET_KEY
ENV VITE_ADMIN_PASS=$VITE_ADMIN_PASS
ENV VITE_SERVER_URL=$VITE_SERVER_URL

# Expose Vite default port
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "container"]

