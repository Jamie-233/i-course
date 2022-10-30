const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');

const download_template = (url, project) => {
    const spinner = ora().start();
    spinner.text = 'download ...';

    download(`direct:${url}`, project, { clone: true }, function (err) {
        if (!err) {
            spinner.succeed('success');
            console.log(chalk.blue.bold('Done!'), chalk.bold('you can run:'));
            console.log('cd ', project);
            console.log('npm install');
            console.log('npm run dev');
        } else {
            spinner.fail('download fail');
        }
    });
};

module.exports = download_template;
