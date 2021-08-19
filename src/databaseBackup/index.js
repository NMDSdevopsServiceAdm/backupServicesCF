const { gzip } = require('node-gzip');
const moment = require('moment');
const { uploadFile } = require('../utils/s3');

const generateFilename = (service) => {
  const today = moment();
  return `${today}-${service.service_name}.sql.gz`;
};

const uploadCompressedFile = async (backup, service) => {
  try {
    const compressedBackup = await gzip(backup);
    const filename = generateFilename(service);

    console.info('Generated filename: ' + filename);

    await uploadFile(filename, compressedBackup);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadCompressedFile };
