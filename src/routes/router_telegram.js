const TelegramController = require('../controllers/TelegramController');
module.exports = [
  {
    method: 'get',
    route: '/telegram',
    middleware: [],
    action: TelegramController.getCodeLogin,
  },
];
