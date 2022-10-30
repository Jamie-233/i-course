#!/usr/bin/env node
const { program } = require('commander');

const my_help = require('../lib/core/help');
const my_commander = require('../lib/core/commander');

my_help(program)
my_commander(program)
program.parse(process.argv);
