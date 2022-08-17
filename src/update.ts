import path from 'path';
import ora from 'ora';
import shell from 'shelljs';
import fs from 'fs-extra';

export const asyncComponentsFromRemote = () => {
  const loading = ora('download template');
  return new Promise((resolve, reject) => {
    try {
      loading.start('start update components');
      if (!fs.existsSync(path.join(__dirname, '../components-lib'))) {
        shell.exec(`mkdir ${path.join(__dirname, '../components-lib')}`)
      }
      shell.cd(path.join(__dirname, '../components-lib'))
      shell.exec('rm -rf .git')
      const updateFiles = () => {
        if (fs.existsSync(path.join(__dirname, '../components-lib/vue2-lib'))) {
          shell.cd(path.join(__dirname, '../components-lib/vue2-lib'))
          shell.rm('-rf', '*')
        }
        if (fs.existsSync(path.join(__dirname, '../components-lib/vue3-lib'))) {
          shell.cd(path.join(__dirname, '../components-lib/vue3-lib'))
          shell.rm('-rf', '*')
        }
        shell.cd(path.join(__dirname, '../components-lib'))
        shell.exec('git pull origin master')
        shell.exec('rm -rf .git')
      }

      shell.exec('git init')
      shell.exec('git remote add origin git@github.com:youuss/components-lib.git') // 物料仓库
      shell.exec('git config core.sparseCheckout true')
      shell.exec("echo 'vue2-lib/lib' >> .git/info/sparse-checkout")
      shell.exec("echo 'vue3-lib/lib' >> .git/info/sparse-checkout")
      updateFiles()
      shell.cd(path.join(__dirname, '../components-lib/vue2-lib/lib'))
      shell.exec('rm -rf index.js')
      shell.cd(path.join(__dirname, '../components-lib/vue3-lib/lib'))
      shell.exec('rm -rf index.js')
      loading.stop();
      loading.succeed('✅ update components succeed')
    } catch (e) {
      reject(e)
      loading.stop();
      loading.fail('update fail');
    }
  })
}


