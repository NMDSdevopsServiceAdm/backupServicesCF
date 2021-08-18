const Bree = require('bree');
const config = require('../config');

const scheduler = new Bree({
  jobs: [
    {
      name: 'backup_databases',
      cron: config.get('cron'),
    },
  ],
});

scheduler.start();
