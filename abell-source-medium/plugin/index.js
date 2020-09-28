// const fetch = require('node-fetch');

/**
 * 
 * @param {import('abell').ProgramInfo} programInfo 
 */


async function beforeBuild(programInfo, { createContent }) {
  /**
   * TODO:
   * 1. Call Medium.com API
   * 2. Loop to create blog with createContent method.
   */

  
  /* Example: */
  const node = {
    slug: 'my-medium-blog',
    content: '<h1>Hi</h1>',
    contentType: 'html',
    createdAt: new Date('13 May 2020'),
    modifiedAt: new Date('13 May 2020')
  }

  createContent(node);
}

module.exports = { beforeBuild }
