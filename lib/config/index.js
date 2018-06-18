// Intermediary file to redirect imports to folder-specific files

module.exports = app => {
  require('./app.js')(app)
}
