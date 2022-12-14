import fs from 'fs-extra';
import path from 'path';

export const generateModule = (modelType: string, pageName: string, fileName: string, pwd: string) => {
    let aimFileName = fileName
    let _directory = ''
    // 考虑一级目录
    if (pageName.split('/').length > 2) {
        console.log('目前最多支持2级目录,比如dashboard/example')
    }
    if (pageName.split('/').length === 2) {
        _directory = pageName.split('/')[0] + '/'
        pageName = pageName.split('/')[1]
    }

    if (new RegExp(/.vue/).test(fileName)) {
        aimFileName = pageName + '.vue'
    }
    fs.readFile(path.join(__dirname, `../material/generate_modules/${modelType}/${fileName}`), 'utf-8', (error: Error, data: any) => {
        if (error) throw error
        data = data.replace(/__className__/g, pageName)
        fs.writeFile(path.join(`${pwd}/src/views/${_directory}${pageName}/${aimFileName}`), data, (err: Error) => {
            if (err) {
                console.log('err:', err);
            } else {
                console.log(`${fileName}写入成功!...`)
            }
        })
    })
}
/**
 * 在对应的文件中添加components
 **/
export const generateComponent = (_path: string, componentType: string, fileName: string, pwd: string) => {
    fs.readFile(`${_path}/${componentType}${fileName}`, 'utf-8', (error: Error, data: any) => {
        if (error) throw error
        fs.writeFile(path.join(`${pwd}/src/components/${componentType}${fileName}`), data, (err: Error) => {
            if (err) {
                console.log('err:', err);
            } else {
                console.log(`${componentType}${fileName}写入成功!...`)
            }
        })
    })
}
