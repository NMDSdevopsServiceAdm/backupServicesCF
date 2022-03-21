const config = require('../config');
const { uploadCompressedFile } = require('../src/databaseBackup');
const { backupPostgres } = require('../src/databaseBackup/postgres');
const { workerData } = require('worker_threads');

const service = workerData && workerData.service ? workerData.service : config.get('services')[0];

const startBackup = async (service) => {
  console.info('Starting backup for ' + service.service_name);
  switch (service.type) {
    case 'postgres': {
      const backup = await backupPostgres(service);
      await uploadCompressedFile(backup, service);
    }
  }
};

startBackup(service);
