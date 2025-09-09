#!/bin/bash
# Script to fix Rollup native dependency issue on Render
echo "Installing Rollup native dependencies..."
mkdir -p node_modules/@rollup
npm install --no-save @rollup/rollup-linux-x64-gnu
