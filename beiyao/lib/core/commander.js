const create_project = require('./create-project');

const commander = program => {
    program
        .command('create <project> [other...]')
        .alias('crt')
        .description('create project')
        .action(create_project);
};

module.exports = commander;
