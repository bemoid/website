const fs = require('fs')
const glob = require('glob')
const fse = require('fs-extra')

const { paths } = require('../../app.config')

/**
 * Finds child directories in provided path.
 *
 * @param {string} path
 * @param {function} callback
 *
 * @returns {array}
 */
exports.directories = (path, callback) => {
  return fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) throw err

    const directories = files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    callback(directories)
  })
}

/**
 * Finds files paths based on provided glob pattern.
 *
 * @param {string} path
 * @param {function} callback
 *
 * @returns {void}
 */
exports.files = (path, callback) => {
  glob(path, (err, files) => {
    if (err) throw err

    callback(files)
  })
}

/**
 * Process over collection of files paths providing its content.
 *
 * @param {string[]} files
 * @param {function} callback
 *
 * @returns {void}
 */
exports.process = (files, callback) => {
  files.forEach((file) => {
    fs.readFile(file, { encoding: 'utf-8' }, function (err, content) {
      if (err) throw err

      callback(content)
    })
  })
}

/**
 * Creates a JSON file with content of provided object.
 *
 * @param {string} path
 * @param {object} data
 *
 * @returns {void}
 */
exports.generate = (path, data) => {
  fse.outputJson(`${paths.data}/${path}`, data, { spaces: 2 }, (err) => {
    if (err) throw err
  })
}
