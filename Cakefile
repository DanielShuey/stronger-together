fs = require 'fs'
Snockets = require 'snockets'


task 'build', 'Build lib/ from src/', ->
  s = new Snockets()
  js = s.getConcatenation 'src/stronger-together.coffee', async: false, minify: false, bare: true
  fs.writeFileSync 'lib/stronger-together.js', js


task 'test', '', ->
  invoke 'build'
  s = new Snockets()
  js = s.getConcatenation 'src/test.coffee', async: false, minify: false, bare: true
  fs.writeFileSync 'test/test.js', js

  {spawn} = require 'child_process'
  spawn("vows", ["--spec"], {stdio: "inherit"})
