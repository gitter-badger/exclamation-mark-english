const err = require('./errors.js')

module.exports = function parse(chars) {
  let flags = {
    is: {
      sentence: false
    },
    expected: null,
    ignore: 0,
  }

  let tree = {
    sentences: []
  }

  for(let pos = 0; pos < chars.length; pos++) {
    let char = chars[pos]

    if(flags.expected) {
      if(char === flags.expected) flags.expected = null
      else return error(pos, `Expected "${flags.expected}", got "${char}"`)
    }

    if(flags.ignore) {
      flags.ignore--
      continue
    }

    if(flags.is.sentence) {
      // sentences end with "." or "!" ("?" is for questions)
      if(char === '.' || char === '!') {
        flags.is.sentence = false
        flags.expected = ' ' // space always comes after sentence termination
        flags.ignore = 1     // and should be ignored
        tree.sentences.push(this.sentence) // TODO clauses
      } else if(pos == chars.length-1) {
        // programs must finish their sentences!
        return err.throw(new err.SyntaxError(pos, `Expected end of sentence, got "${char}"`))
      }

      this.sentence += char
    } else {
      // sentences start with uppercase letters or symbols
      if(char.toUpperCase() === char) {
        flags.is.sentence = true
        this.sentence = char.toLowerCase()
      } else {
        return err.throw(new err.SyntaxError(pos, `Sentences cannot begin with a lowercase character, got "${char}"`))
      }
    }
  }

  return tree
}
