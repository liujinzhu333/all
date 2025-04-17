import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter'

// 定义文档文件类型（如 .md）
const DOC_EXTENSIONS = new Set(['.md', '.mdx']);

async function readDocWithMeta(fullPath, isDirectory) {
  // const content = await fs.readFile(filePath, 'utf-8');
  // const { attributes, body } = frontmatter<DocMeta>(content);
  const filePath = isDirectory ? path.join(fullPath, 'index.md') : fullPath

  const rawContent = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(rawContent)
  // const routePath = path.join('docs', path.basename(filePath).replace(/\.mdx?$/, ''));
  // console.log(path.parse(fullPath))
  const parts = filePath.split('/');
  const publicIndex = parts.indexOf('public');
  const docsPath = '/' + parts.slice(publicIndex + 1).join('/');
  return {
    name: path.basename(fullPath),
    path: fullPath,
    docsPath,
    isDirectory,
    // isDirectory: false,
    // meta: attributes,
    meta: data,      // 提取的 Frontmatter 对象
    title: data.title || content.split(0, 10)
    // content          // 去除 Frontmatter 后的正文内容
  }
}

async function readDocsAsync(dirPath){
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const nodes = await Promise.all(
    entries
      .filter(entry => {
        const ext = path.extname(entry.name);
        const { name } = path.parse(entry.name)
        return !entry.name.startsWith('.') && name !== 'index' &&
               (entry.isDirectory() || DOC_EXTENSIONS.has(ext));
      })
      .map(async (entry) => {
        // console.log(entry.isDirectory())
        const fullPath = path.join(dirPath, entry.name);
        const node = await readDocWithMeta(fullPath, entry.isDirectory());
        // let node = {
        //   name: path.basename(fullPath),
        // }
        // const node = {
          
        //   isDirectory: entry.isDirectory()
        // }

        if (entry.isDirectory()) {
          node.children = await readDocsAsync(fullPath);
        }

        return node;
      })
  );

  return nodes;
}

// function generateRoutes(tree, basePath='') {
//   return tree.flatMap(node => {
//     const routePath = path.join(basePath, node.name.replace(/\.mdx?$/, ''));
    
//     return node.isDirectory 
//       ? generateRoutes(node.children || [], routePath)
//       : {
//           ...node,
//           name: node.name,
//           path: `/${routePath}`,
//           component: node.path // 实际项目需转换为相对路径
//         };
//   });
// }
// 步骤 1: 读取文档树

const docsPath = path.join(process.cwd(), 'public', 'docs')
const docsTree = await readDocsAsync(docsPath);
// console.log(docsTree)

// 步骤 2: 生成路由配置
// const routes = generateRoutes(docsTree, 'docs');
// console.log(routes)

// 步骤 3: 启动文件监听
// watchDocs('./docs');

// 步骤 4: 导出为 JSON 文件（用于静态站点）
// 指定文件路径
const filePath = path.join(docsPath, `docsMenu.json`);
fs.writeFile(filePath, JSON.stringify(docsTree, null, 2));
console.log('docs目录生成')
// 指定文件路径
                    // fs.writeFileSync(filePath, JSON.stringify(itemRows, null, 2));
// await fs.writeFile(
//   './docs.json',
//   JSON.stringify({ tree: docsTree, routes }, null, 2)
// )