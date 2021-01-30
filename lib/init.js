const fse = require('fs-extra')

const ora = require('ora')

const chalk = require('chalk')

const symbols = require('log-symbols')

const inquirer = require('inquirer')

// const handlebars = require('handlebars')

const path = require('path')

const dlTemplate = require('./download')

async function initProject(projectName) {
    try {
        const exists = await fse.pathExists(projectName)
        if (exists) {
            console.log(symbols.error, chalk.red('The project already exists.'))
        } else {
            inquirer
                .prompt([
                    {
                        type:"confirm",
                        message:"是否使用自己的模板？",
                        name:"myself",
                        default:false
                    },
                    {
                        type: 'list',
                        name: 'template',
                        message: '选择一个模板',
                        choices: [
                            "alert-course(轻松使用一个课程提醒应用)",
                            "alert-course-ts(轻松使用一个课程提醒应用,midway版本，Typescript)",
                            "alert-simple(快速开始一个消息提醒应用<qq邮件，钉钉机器人，企业微信机器人>)",
                        ],
                        default: 'alert-course(轻松使用课程提醒应用)',
                        when: function(res) { 
                            return !res.myself
                        }
                    },
                    {
                        type: "input",
                        message: "请输入模板名称：",
                        name: "template",
                        default: "",
                        when: function(answer) { 
                            return answer.myself
                        }
                    }])
                .then(async (answers) => {
                    const initSpinner = ora(chalk.cyan('Initializing project...'))
                    initSpinner.start()

                    let name = answers.template.split('(')[0]
                    const templatePath = path.resolve(__dirname, '../' + name + '/')
                    const processPath = process.cwd()
                    const LCProjectName = projectName.toLowerCase()
                    // const targetPath = `${processPath}/${LCProjectName}`
                    const targetPath = path.resolve(processPath, LCProjectName)
                    const exists = await fse.pathExists(templatePath)

                    if (!exists) {
                        await dlTemplate(name)
                    }
                    try {
                        await fse.copy(templatePath, targetPath)
                    } catch (err) {
                        console.log(symbols.error, chalk.red(`Copy template failed. ${err}`))
                        process.exit()
                    }

                    const multiMeta = {
                        project_name: LCProjectName,
                    }

                    const multiFiles = [
                        `${targetPath}/package.json`,
                    ]


                    for (var i = 0; i < multiFiles.length; i++) {
                        try {
                            const multiFilesContent = await fse.readFile(multiFiles[i], 'utf8')
                            let fileContent = JSON.parse(multiFilesContent)
                            fileContent.name = multiMeta.project_name
                            // const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta)
                            await fse.outputFile(multiFiles[i], JSON.stringify(fileContent, null, 4))
                        } catch (err) {
                            initSpinner.text = chalk.red(`Initialize project failed. ${err}`)
                            initSpinner.fail()
                            process.exit()
                        }
                    }

                    initSpinner.text = 'Initialize project successful.'
                    initSpinner.succeed()
                    console.log(`
            To get started:

              cd ${chalk.yellow(LCProjectName)}
              ${chalk.yellow('npm install')} or ${chalk.yellow('yarn install')}
              ${chalk.yellow('npm run dev')} or ${chalk.yellow('yarn run dev')}
          `)
                })
                .catch((error) => {
                    if (error.isTtyError) {
                        console.log(symbols.error, chalk.red("Prompt couldn't be rendered in the current environment."))
                    } else {
                        console.log(symbols.error, chalk.red(error))
                    }
                })
        }
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

module.exports = initProject