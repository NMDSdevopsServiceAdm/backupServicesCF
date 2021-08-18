const config = require('../config');

const { backupPostgres } = require('../src/databaseBackup/postgres');

config.get('services').forEach(async (service) => {
  switch (service.type) {
    case 'postgres': {
      backupPostgres(service);
    }
  }
});
