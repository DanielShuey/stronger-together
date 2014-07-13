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

  js = s.getConcatenation 'src/examples.coffee', async: false, minify: false, bare: true
  fs.writeFileSync 'test/examples.js', js

  {spawn} = require 'child_process'

  # Run in serial because monkey patch
  a = -> spawn("vows", ["test/test.js","--spec"], {stdio: "inherit"})
  b = -> spawn("vows", ["test/patch.js","--spec"], {stdio: "inherit"})
  c = -> spawn("vows", ["test/examples.js","--spec"], {stdio: "inherit"})

  a().on('close', -> b().on('close', -> c()))
