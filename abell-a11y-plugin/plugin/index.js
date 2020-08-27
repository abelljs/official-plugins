
/**
 * adds given string to end of body tag of the html
 * @param {String} stringToAdd - String to add in BODY
 * @param {String} htmlText - HTML Content in String
 * @return {String}
 */
function addToBodyEnd(stringToAdd, htmlText) {
  const bodyEndIndex = htmlText.indexOf('</body>');
  if (bodyEndIndex < 0) {
    return htmlText + '<body>' + stringToAdd + '</body>';
  }

  return (
    htmlText.slice(0, bodyEndIndex) + stringToAdd + htmlText.slice(bodyEndIndex)
  );
}


function beforeHTMLWrite(htmlText, programInfo) {
  // ignore plugin on `abell build`
  if (programInfo.task === 'build') return htmlText;

  const a11yCSS = /* html */ `
  <style>
    /* A11y CSS */
    :root {
      --abell-a11y-error: #f30;
      --abell-a11y-color: #111;
      --abell-a11y-bg: #eee;
    }
    /* 
      Took this CSS from Tweet - https://twitter.com/geoffreycrofte/status/1277357145802104838
      by https://twitter.com/geoffreycrofte
    */
    html:not([lang])::before {
      content: "<html> tag without lang attribute";
      display: block;
      padding: 5px;
      border: 2px solid var(--abell-a11y-error);
      background-color: var(--abell-a11y-bg);
      color: var(--abell-a11y-color);
    }

    img:not([alt]) {
      filter: blur(3px);
      border: 2px solid var(--abell-a11y-error);
    }

    /*
      Snippet is inspired from https://twitter.com/tanishaaa03/status/1275505781459181568
      by https://twitter.com/tanishaaa03
    */
    label:not([for])::before {
      content: 'Label without "for" attribute';
      border: 2px solid var(--abell-a11y-error);
      background-color: var(--abell-a11y-bg);
      color: var(--abell-a11y-color);
    }
  </style>
  `;

  const newHTML = addToBodyEnd(a11yCSS, htmlText)
  return newHTML;
}

module.exports = { beforeHTMLWrite }