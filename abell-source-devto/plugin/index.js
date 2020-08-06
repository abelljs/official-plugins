const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {import('abell/utils/typedefs.js').ProgramInfo} programInfo 
 */

const generateBlogs = [];

async function addBlogContent({article, contentPath}) {
  console.log(`> Writing blog ${article.title}`);
  const { body_markdown } = await fetch(`https://dev.to/api/articles/${article.id}`).then(res => res.json());
  
  if (!fs.existsSync(contentPath)) {
    fs.mkdirSync(contentPath);
  }

  const pathToArticleDir = path.join(contentPath, article.slug);
  
  if (!fs.existsSync(pathToArticleDir)) {
    fs.mkdirSync(pathToArticleDir);
  }

  fs.writeFileSync(path.join(pathToArticleDir, 'index.md'), body_markdown);

  const metaJSON = {
    ...article,
    $createdAt: article.created_at,
    $modifiedAt: article.edited_at || article.created_at
  }

  fs.writeFileSync(path.join(pathToArticleDir, 'meta.json'), JSON.stringify(metaJSON, {}, 2));

  generateBlogs.push(article.slug);
}


/**
 * Removes the folder
 * @param {String} pathToRemove path to the directory which you want to remove
 */
function rmdirRecursiveSync(pathToRemove) {
  if (fs.existsSync(pathToRemove)) {
    fs.readdirSync(pathToRemove).forEach((file, index) => {
      const curPath = path.join(pathToRemove, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        rmdirRecursiveSync(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathToRemove);
  }
}

async function beforeBuild(programInfo) {
  if (fs.existsSync(programInfo.abellConfigs.contentPath)) {
    rmdirRecursiveSync(programInfo.abellConfigs.contentPath);
  }

  const articles = await fetch(`https://dev.to/api/articles?username=${programInfo.abellConfigs.globalMeta.devMeta.username}`).then(res => res.json());

  for (const article of articles.slice(0, programInfo.abellConfigs.globalMeta.devMeta.articleCount)) {
    await addBlogContent({
      article,
      contentPath: programInfo.abellConfigs.contentPath
    });
  }
}

module.exports = { beforeBuild }
