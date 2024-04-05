#!/bin/bash

# Kill any existing screens with the same names
screen -S "niheria" -X quit
screen -S "niheria-bot" -X quit

# Start the new screens
screen -dmS niheria bash -c "cd /home/gloat-of-niheria/server && node entry.express.mjs"
screen -dmS niheria-bot bash -c "cd /home/gloat-of-niheria/bot && ts-node niherbot.ts"
