#!/bin/env node
const fs = require('fs');
const ytdl = require('ytdl-core');
const { prompt, Select } = require('enquirer');

let url = "https://youtu.be/q29MxRthrVM?si=8UCQUbDBpuCyGIgB";

const getname = async (url) => (await ytdl.getBasicInfo(url)).videoDetails.title;

const downloadvideo = async (url) => {
    let name = await getname(url);
    ytdl(url, { filter: "audioandvideo" }).pipe(fs.createWriteStream(`./${name}.mp4`))
}

const downloadaudio = async (url) => {
    let name = await getname(url);
    ytdl(url, { filter: "audioonly" }).pipe(fs.createWriteStream(`./${name}.mp4`))
}

prompt({
    type: 'input',
    name: 'url',
    message: 'Enter the url of the youtube video'
}).then(response => {
    const prompt2 = new Select({
        name: 'color',
        message: 'Pick a format',
        choices: ['Audio', 'Video']
    });
    prompt2.run()
    .then(answer => {
        if (answer === "Audio") {
            downloadaudio(response.url)
        } else {
            downloadvideo(response.url)
        }
    })
    .catch(console.error);
})

