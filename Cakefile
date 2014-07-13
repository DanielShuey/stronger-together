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

  js = s.getConcatenation 'src/patch.coffee', async: false, minify: false, bare: true
  fs.writeFileSync 'test/patch.js', js

  {spawn} = require 'child_process'
  c = spawn("vows", ["test/test.js","--spec"], {stdio: "inherit"})
  c.on 'close', -> spawn("vows", ["test/patch.js","--spec"], {stdio: "inherit"})
