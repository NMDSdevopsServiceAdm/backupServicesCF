const exec = require('await-exec');
const config = require('../../../config');

const backupPostgres = async (service) => {
  try {
    const exportSchema = service.schema ? `-n ${service.schema}` : '';

    const filteredCFServices = config.cfConfig.services[service.type].filter(
      (ser) => ser.name === service.service_name,
    );

    if (filteredCFServices.length > 1) {
      throw new Error('More than 1 database with specified service name');
    }

    const cfService = filteredCFServices[0];

    console.info('Using pg_dump to dump ' + service.service_name);
    const backup = await exec(`${config.get('pg_dumpLocation')} ${cfService.credentials.uri} ${exportSchema} -O -x`);

    console.info('Service has been backed up');

    if (backup.stderr) {
      throw new Error(backup.stderr);
    }

    return backup.stdout;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports.backupPostgres = backupPostgres;
