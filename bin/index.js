#!/usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version, '-v, --version')

const updateChk = require('../lib/update')

const setMirror = require('../lib/mirror')

const dlTemplate = require('../lib/download')

const initProject = require('../lib/init')

program
    .command('upgrade')
    .description("Check the module version.")
    .action(() => {
        updateChk()
    })

program
    .command('mirror <template_mirror>')
    .description("Set the template mirror.")
    .action((tplMirror) => {
        setMirror(tplMirror)
    })

program
    .usage('<commands> [options]')
    .command('template <template_name>')
    .description("Download template from mirror.")
    .action((name) => {
        dlTemplate(name)
    })

program
    .name('create-alert')
    .usage('<commands> [options]')
    .command('init <project_name>')
    .description('Create a egg project.')
    .action(project => {
        initProject(project)
    })

program.parse(process.argv)