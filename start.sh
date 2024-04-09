#!/bin/bash

echo "Starting migrations"

npm run migrate

echo "Starting service"

node src/main.js
