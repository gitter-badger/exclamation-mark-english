const readline = require('readline')
const chalk = require('chalk')
const rl = readline.createInterface({ input: process.stdin })

!function repl() {
  process.stdout.write('> ')
  rl.question(chalk.styles.bold.open, line => {
    process.stdout.write(chalk.styles.bold.close)

    console.log('line is', line)

    repl()
  })
}()
