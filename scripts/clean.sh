#!/usr/bin/env bash
find  ./tests ./src -type f  -name '*.map' -delete
find  ./tests ./src -type f  -name '*.js' -delete
find  ./  -maxdepth 1 -type f -name '*.js' -delete
find  ./  -maxdepth 1 -type f -name '*.map' -delete