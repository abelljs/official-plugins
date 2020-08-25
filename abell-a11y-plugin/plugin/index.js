/**
 * adds given string to head tag of the html
 * @param {String} stringToAdd - String to add in HEAD
 * @param {String} htmlText - HTML Content in String
 * @return {String}
 */
function addToHeadEnd(stringToAdd, htmlText) {
  const headEndIndex = htmlText.indexOf('</head>');
  if (headEndIndex < 0) {
    // if the text does not have </head>
    return '<head>' + stringToAdd + '</head>' + htmlText;
  }

  const out =
    htmlText.slice(0, headEndIndex) +
    stringToAdd +
    htmlText.slice(headEndIndex);
  return out;
}


function beforeHTMLWrite(htmlText, programInfo) {
  // ignore plugin on `abell build`
  if (programInfo.task === 'build') return htmlText;

  const a11yCSS = /* css */ `
  img:not([alt]) {
    filter: blur(5px);
  }
  `;

  const newHTML = addToHeadEnd(`<style>${a11yCSS}</style>`, htmlText)
  return newHTML;
}

module.exports = { beforeHTMLWrite }