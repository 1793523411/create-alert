const download = require('download')

const ora = require('ora')

const chalk = require('chalk')

const fse = require('fs-extra')
const path = require('path')

const defConfig = require('./config')

const cfgPath = path.resolve(__dirname, '../config.json')



async function dlTemplate(name) {
    const tplPath = path.resolve(__dirname, '../'+name)
    const exists = await fse.pathExists(cfgPath)
    if (exists) {
        await dlAction(name,tplPath)
    } else {
        await defConfig()
        await dlAction(name,tplPath)
    }
}

async function dlAction(name,tplPath) {
    try {
        await fse.remove(tplPath)
    } catch (err) {
        console.error(err)
        process.exit()
    }

    const jsonConfig = await fse.readJson(cfgPath)

    const dlSpinner = ora(chalk.cyan('Downloading template...'))
    console.log(jsonConfig.mirror + name + '.zip')
    dlSpinner.start()
    try {
        await download(jsonConfig.mirror + name + '.zip', path.resolve(__dirname, '../'+name +'/'), {
            extract: true
        });
    } catch (err) {
        dlSpinner.text = chalk.red(`Download template failed. ${err}`)

        dlSpinner.fail()
        process.exit()
    }
    dlSpinner.text = 'Download template successful.'
    dlSpinner.succeed()
}

module.exports = dlTemplate