import { Command } from 'commander';
import { updateVue2Components } from './update';

const program = new Command();

program
  .name('components-cli')
  .description('vue2 + vue3 components generator')
  .version('0.0.1');

program
  .command('update')
  .description('update vue2 components')
  .action(async () => {
    await updateVue2Components();
  });

program.parse();
