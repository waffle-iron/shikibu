import * as program from "commander";

program
  .command('new <name>', 'create new monogatari')
  .option('-t, --template <template>', 'template directory for new monogatari')
  .action((name, template) => {

  });

program.parse(process.argv);
