const updateNotifer = require('update-notifier')

const chalk = require('chalk')

const pkg = require('../package.json')

const notifier = updateNotifer({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
})

function updateChk() {
    if(notifier.update){
        console.log(`New verssion available:${chalk.cyan(notifier.update.latest)} ~`)
        notifier.notify()
    }else{
        console.log('No new version is available.')
    }
}

module.exports = updateChk