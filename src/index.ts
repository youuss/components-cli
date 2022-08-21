#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import Table from 'cli-table'
import pkg from '../package.json';
import { asyncComponentsFromRemote } from './update';
import { listAllComponents, listAllTemplates } from './list';
import { addComponents } from './addition';

const program = new Command();

const InitPrompts = [
  {
    type: 'list',
    message: '🎈 请选择当前开发的框架',
    name: 'type',
    choices: [
      'vue2',
      'vue3'
    ],
  }
]

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version);

program
  .command('async')
  .description('async components from remote')
  .action(async () => {
    await asyncComponentsFromRemote();
  });

program
  .command('ls')
  .description('ls all components')
  .action(async () => {
    const componentsConfig: Record<string, {path: string, components: string[]}> = await listAllComponents();
    const templatesConfig: Record<string, {path: string, templates: string[]}> = await listAllTemplates();
    const head = Object.keys(componentsConfig)
    const table: any[] = new Table({ head: ['', ...head] });
    const rows: any[] = []
    head.forEach(h => {
      componentsConfig[h].components.forEach((c, index) => {
        if (index === 0) {
          if (rows[index]) {
            rows[index]['components'] = [...rows[index]['components'], c]
          } else {
            rows.push({ components: [c] })
          }
        } else {
          if (rows[index]) {
            rows[index][''] = [...rows[index][''], c]
          } else {
            rows.push({ '': [c] })
          }
        }
      })
      templatesConfig[h].templates.forEach((c, index) => {
        if (index === 0) {
          if (rows[index]) {
            rows[index]['templates'] = [...rows[index]['templates'], c]
          } else {
            rows.push({ templates: [c] })
          }
        } else {
          if (rows[index]) {
            rows[index][''] = [...rows[index][''], c]
          } else {
            rows.push({ '': [c] })
          }
        }
      })
    })
    table.push(...rows);

    console.log(table.toString());

  })

program
  .command('add')
  .description('add components into project')
  .action(async () => {
    const { type }: { type: string} = await inquirer.prompt(InitPrompts);
    const componentsConfig: Record<string, {path: string, components: string[]}> = await listAllComponents();
    const ComponentsPrompt = [
      {
        type: 'checkbox',
        name: 'components',
        message: `✨ ${type}下共有${componentsConfig[type].components.length}个组件，请选择需要添加的组件`,
        choices: componentsConfig[type].components
      }
    ]
    const { components } = await inquirer.prompt(ComponentsPrompt);
    await addComponents(components, componentsConfig[type].path)
  })

program.parse();
