#!/usr/bin/env node
import * as path     from 'path';
import * as program  from 'commander';
import * as commands from '../commands';

program
  .version(require('../../package.json').version);

program
  .command('create <name>')
  .alias('new')
  .description('create new monogatari')
  .action(commands.create);

program
  .command('play <monogatari>')
  .description('execute monogatari')
  .option('-f, --hostsfile <hostsfile>', 'hosts file', 'hosts.yml')
  .option('-k, --private-key <id_rsa>', 'ssh private key', path.resolve(process.env.HOME, '.ssh/id_rsa'))
  .action(commands.play);

program.parse(process.argv);
