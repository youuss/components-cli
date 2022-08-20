import fs from 'fs-extra';
import shell from 'shelljs'
import { generateComponent } from './controller';

export const addComponents = (components: string[], _pPath: string) => {
  return new Promise((resolve, reject) => {
    try {
      const pwd = shell.pwd()
      if (!fs.existsSync(`${pwd}/src/components`)) {
        fs.mkdirSync(`${pwd}/src/components`)
      }
      components.forEach(c => {
        const _isFile = fs.statSync(`${_pPath}/${c}`).isFile();
        if (_isFile) {
          generateComponent(_pPath, c, '', pwd)
        } else {
          const _aimFiles = fs.readdirSync(`${_pPath}/${c}`)
          try {
            fs.mkdirSync(`${pwd}/src/components/${c}`)
          } catch (e) {
            console.info(`${c}目录已经建立`)
          }
          _aimFiles.map((item: string) => {
            generateComponent(_pPath, c, `/${item}`, pwd)
          })
        }
      })
      resolve('✨ 添加组件成功')
    } catch (e) {
      reject(e)
    }
  })
}
