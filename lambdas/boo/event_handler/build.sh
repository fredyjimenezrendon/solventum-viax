#!/bin/sh

npm install
npm run build
npm install --omit=dev --production
zip -y -r fn.zip .