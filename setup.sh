#!/bin/bash
mkdir ~/.config/ytdl/
cp -r * ~/.config/ytdl/
cd ~/.config/ytdl/
npm i
npm link
# export PATH="/home/$USER/.config/ytdl/bin:$PATH"