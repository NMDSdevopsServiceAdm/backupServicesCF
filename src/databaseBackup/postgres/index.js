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

    const backup = await exec(`pg_dump ${cfService.credentials.uri} ${exportSchema} -F t -O -x -f backup.sql`);

    console.info('Service has been backed up');

    return backup;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports.backupPostgres = backupPostgres;
