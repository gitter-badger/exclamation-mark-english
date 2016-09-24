const readline = require('readline')
const chalk = require('chalk')
const rl = readline.createInterface({ input: process.stdin })

const parse = require('./parse')

!function repl() {
  process.stdout.write('> ' + chalk.styles.yellow.open)
  rl.question('', input => {
    process.stdout.write(chalk.styles.yellow.close)

    let parsed = parse(input)
    if(parsed) console.log(chalk.styles.blue.open, parsed, chalk.styles.blue.close)

    repl()
  })
}()
