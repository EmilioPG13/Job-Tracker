#!/bin/bash
# render-build.sh
echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Setting up Rollup..."
cd node_modules/rollup
npm install @rollup/rollup-linux-x64-gnu

echo "Setting up LightningCSS..."
cd ../lightningcss
npm install lightningcss-linux-x64-gnu

echo "Building..."
cd ../../
npm run build