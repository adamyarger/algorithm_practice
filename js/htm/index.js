
const htm = (function () {
  const MODE_SLASH = 0;
  const MODE_TEXT = 1;
  const MODE_WHITESPACE = 2;
  const MODE_TAGNAME = 3;
  const MODE_COMMENT = 4;
  const MODE_PROP_SET = 5;
  const MODE_PROP_APPEND = 6;

  const CHILD_APPEND = 0;
  const CHILD_RECURSE = 2;
  const TAG_SET = 3;
  const PROPS_ASSIGN = 4;
  const PROP_SET = MODE_PROP_SET;
  const PROP_APPEND = MODE_PROP_APPEND;

  const evaluate = (h, built, fields, args) => {

  }

  // string literals get passed in here
  const build = function (statics) {
    const fields = arguments
    const h = this // might have to bind this

    let mode = MODE_TEXT
    let buffer = ''
    let quote = ''
    let current = [0]
    let char, propName

    const commit = field => {
      // match line breaks
      if (mode === MODE_TEXT && (field || (buffer = buffer.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))) {
        current.push(field ? fields[field] : buffer)
      }
      else if (mode === MODE_TAGNAME && field || buffer) {
        current[1] = field ? fields[field] : buffer
      }
    }

    for (let i = 0; i < statics.length; i++) {
      // if
    }
  }
})()