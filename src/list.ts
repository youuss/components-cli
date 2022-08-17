/**
 * @Description
 * @Author youus
 * @Date 2022/8/17 22:37
 * @Version v1.0.0
 *
 * Hello, humor
 */
import fs from 'fs-extra';
import path from 'path';

export const listAllComponents: () => Promise<Record<string, { path: string, components: string[] }>> = () => {
  return new Promise((resolve, reject) => {
    try {
      let vue2Components: string[] = [], vue3Components: string[] = []
      if (fs.existsSync(path.join(__dirname, '../components-lib/vue2-lib/lib/components'))) {
        vue2Components = fs.readdirSync(path.join(__dirname, '../components-lib/vue2-lib/lib/components'))
      }
      if (fs.existsSync(path.join(__dirname, '../components-lib/vue3-lib/lib/components'))) {
        vue3Components = fs.readdirSync(path.join(__dirname, '../components-lib/vue3-lib/lib/components'))
      }
      resolve({
        vue2: {
          path: path.join(__dirname, '../components-lib/vue2-lib/lib/components'),
          components: vue2Components
        },
        vue3: {
          path: path.join(__dirname, '../components-lib/vue3-lib/lib/components'),
          components: vue3Components
        },
      })
    } catch (e) {
      reject(e)
      console.error(e)
    }
  })
}

export const listAllTemplates: () => Promise<Record<string, { path: string, templates: string[] }>> = () => {
  return new Promise((resolve, reject) => {
    try {
      let vue2Templates: string[] = [], vue3Templates: string[] = []
      if (fs.existsSync(path.join(__dirname, '../components-lib/vue2-lib/lib/templates'))) {
        vue2Templates = fs.readdirSync(path.join(__dirname, '../components-lib/vue2-lib/lib/templates'))
      }
      if (fs.existsSync(path.join(__dirname, '../components-lib/vue3-lib/lib/templates'))) {
        vue3Templates = fs.readdirSync(path.join(__dirname, '../components-lib/vue3-lib/lib/templates'))
      }
      resolve({
        vue2: {
          path: path.join(__dirname, '../components-lib/vue2-lib/lib/templates'),
          templates: vue2Templates
        },
        vue3: {
          path: path.join(__dirname, '../components-lib/vue3-lib/lib/templates'),
          templates: vue3Templates
        },
      })
    } catch (e) {
      reject(e)
      console.error(e)
    }
  })
}
