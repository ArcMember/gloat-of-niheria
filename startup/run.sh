#!/bin/bash

# Kill any existing screens with the same names
for session in $(screen -ls | grep -o '[0-9]*\.(niheria|niheria-bot)'); do
    screen -S "${session}" -X quit
done

# Start the new screens
screen -dmS niheria bash -c "cd /home/gloat-of-niheria/server && node entry.express.mjs"
screen -dmS niheria-bot bash -c "cd /home/gloat-of-niheria/bot && ts-node niherbot.ts"
