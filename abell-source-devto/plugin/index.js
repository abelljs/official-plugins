const fetch = require('node-fetch');

/**
 * 
 * @param {import('abell').ProgramInfo} programInfo 
 */


async function beforeBuild(programInfo, { createContent }) {
  const articles = await fetch(`https://dev.to/api/articles?username=${programInfo.abellConfig.globalMeta.devMeta.username}`).then(res => res.json());

  for (const article of articles.slice(0, programInfo.abellConfig.globalMeta.devMeta.articleCount)) {
    const { body_html } = await fetch(`https://dev.to/api/articles/${article.id}`).then(res => res.json());
    const node = {
      ...article,
      slug: article.slug,
      content: body_html,
      contentType: 'html',
      createdAt: new Date(article.created_at),
      modifiedAt: new Date(article.edited_at || article.created_at)
    }

    createContent(node);
  }
}

module.exports = { beforeBuild }
