const inquirer = require('inquirer');

const download = require('./download');

const { framework_list, framework_template } = require('../../config');

module.exports = async (project, args) => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            choices: framework_list,
            message: 'place choices your usage framework'
        }
    ]);

    const url = framework_template[answer.framework];
    download(url, project);
};
