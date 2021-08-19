const Bree = require('bree');
const config = require('../config');

const jobs = [];
config.get('services').forEach((service) => {
  jobs.push({
    name: 'backup_database',
    // cron: service.cron,
    interval: '1m',
    worker: {
      workerData: {
        service,
      },
    },
  });
});

const scheduler = new Bree({
  jobs,
});

scheduler.start();
