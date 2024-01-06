const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.APP_PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const chokidar = require('chokidar');
const LIVE_PATH = process.env.LIVE_PATH
const watcher = chokidar.watch(LIVE_PATH);
const path = require("path");
const request = require('request');
const fs = require("fs");

watcher.on('add', (filepath) => {
  let ext = path.parse(filepath).ext;
  let name = path.parse(filepath).name;
  if (ext === '.m3u8' && name !== 'index') {
    try {
      console.log(`${name} appear`)
      request.post({
        url: `https://${process.env.MAIN_SERVER}/v1/api/previewUp`,
        form: {
          user_id: name
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}).on('unlink', filepath => {
  let ext = path.parse(filepath).ext;
  let name = path.parse(filepath).name;
  if (ext === '.m3u8' && name !== 'index') {
    try {
      console.log(`${name} deleted`)
      request.delete({
        url: `https://${process.env.MAIN_SERVER}/v1/api/videos/${name}/terminate`,
      })
    } catch (error) {
      console.log(error)
    }
  }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    origin: true,
  })
);

app.get('/liveUp/:id', (req, res) => {
  try {
    let id = req.params.id
    if (fs.existsSync(LIVE_PATH + `/${id}.m3u8`)) {
      console.log(id + " has started")
      res.status(200).json({
        status: true
      })
    } else {
      res.status(200).json({
        status: false
      })
    }
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})