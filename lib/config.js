const fse = require('fs-extra')

const path = require('path')

const jsonConfig = {
    "name":"create-alert",
    "mirror":"https://ygjtestsdk.oss-cn-beijing.aliyuncs.com/template/"
}

const configPath = path.resolve(__dirname, '../config.json')

async function defConfig(){
    try {
        await fse.outputJson(configPath, jsonConfig)
      } catch (err) {
        console.error(err)
        process.exit()
      }
}

module.exports = defConfig