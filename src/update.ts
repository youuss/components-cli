import path from 'path';
import ora from 'ora';
import shell from 'shelljs';
import fs from 'fs-extra'

export const updateVue2Components = () => {
  const loading = ora('download template');
  return new Promise((resolve, reject) => {
    try {
      loading.start('start update components');
      shell.cd(path.join(__dirname, '../lib'))
      shell.exec('rm -rf .git')
      const updateFiles = () => {
        if (fs.existsSync(path.join(__dirname, '../lib'))) {
          shell.cd(path.join(__dirname, '../lib'))
          shell.rm('-rf', '*')
        }
        shell.cd(__dirname)
        shell.exec('git pull origin master')
        shell.exec('rm -rf .git')
      }

      shell.exec('git init')
      shell.exec('git remote add origin git@git.xiaojukeji.com:didibike/vue2-components.git') // 物料仓库
      shell.exec('git config core.sparseCheckout true')
      shell.exec("echo 'lib' >> .git/info/sparse-checkout")
      updateFiles()
      loading.stop();
    } catch (e) {
      reject(e)
      loading.stop();
      loading.fail('download fail');
    }
  })
}
