require('dotenv').config();
const convict = require('convict');
const cfenv = require('cfenv');
const AWSSecrets = require('../aws/secrets');
const fs = require('fs');
const yaml = require('js-yaml');

const schema = {
  services: {
    doc: 'A collection of CF services.',
    format: Array,
    default: [],
    children: {
      type: {
        doc: 'The service type',
        format: ['postgres'],
        default: null,
      },
      cron: {
        doc: 'How often you want to run the backup and cleanup',
        format: 'string',
        default: '0 0 * * *',
      },
      schema: {
        doc: 'Name of the schema you want to backup',
        format: 'string',
        default: null,
      },
      service_name: {
        doc: 'Name of the service you want to backup',
        format: 'string',
        default: null,
      },
      compress: {
        doc: 'Should the backup be compressed',
        format: 'boolean',
        default: true,
      },
    },
  },
};

const BACKUP_CONFIG = JSON.parse(process.env.BACKUP_CONFIG);

const config = convict(schema).load(BACKUP_CONFIG).validate();
const cfConfig = cfenv.getAppEnv();

// Load environment dependent configuration
// var env = config.get('environment');

// const envConfigfile = yaml.safeLoad(fs.readFileSync(__dirname + '/' + env + '.yaml'));

// load common file first, then env (so env overrides common)
// config.load(envConfigfile);

// Perform validation
// config.validate({ allowed: 'strict' });

// if (config.get('aws.secrets.use')) {
//   console.log('Using AWS Secrets');
//   AWSSecrets.initialiseSecrets(config.get('aws.region'), config.get('aws.secrets.wallet')).then(() => {
//     // DB rebind
//     console.log('Setting AWS details');
//     config.set('encryption.private', AWSSecrets.encryptionPrivate());
//     config.set('encryption.public', AWSSecrets.encryptionPublic());
//     config.set('encryption.passphrase', AWSSecrets.encryptionPassphrase());
//   });
// }

module.exports = config;
module.exports.cfConfig = cfConfig;
