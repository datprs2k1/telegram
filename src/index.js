const { User } = require('./database/models');
(async () => {
  let users = await User.findAll();

  console.log(users);
})();
