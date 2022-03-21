const { gzip } = require('node-gzip');
const moment = require('moment');
const { uploadFile } = require('../utils/s3');

const generateFilename = (service, frequency) => {
  const today = moment();
  switch (frequency) {
    case 'daily':
      return `daily/day${today.format('YYYY-MM-DD')}-${service.service_name}.sql.gz`;
    case 'monthly':
      return `monthly/${today.format('YYYY-MM')}-${service.service_name}.sql.gz`;
  }
};

const uploadCompressedFile = async (backup, service) => {
  try {
    const compressedBackup = await gzip(backup);
    const filename = generateFilename(service, 'daily');

    console.info('Generated filename: ' + filename);

    await uploadFile(filename, compressedBackup);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadCompressedFile };
