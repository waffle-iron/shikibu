#!/usr/bin/env node
import * as program from 'commander';
import * as commands from '../commands';


program
  .command('create <name>')
  .alias('new')
  .description('create new monogatari')
  .option('-t, --template <template>', 'template directory for new monogatari')
  .action(commands.create);

program.parse(process.argv);
