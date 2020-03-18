// This file has one simple responsibility
// Collects all generators and run
// them to generate data files
[
  require('./docs'),
  require('./styleguide')
].forEach((generator) => {
  generator()
})
