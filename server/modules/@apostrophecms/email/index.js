const config = require('config')

module.exports = {
  options: {
    nodemailer: config.get('nodemailer'),
  },
}
