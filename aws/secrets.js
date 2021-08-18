const AWS = require('aws-sdk');

let myLocalSecrets = null;

const initialiseSecrets = async (region, wallet) => {
  const secrets = new AWS.SecretsManager({
    region,
  });
  console.log('Initialising AWS Secret');
  try {
    if (!wallet) throw new Error('wallet must be defined');
    const mySecretsValue = await secrets
      .getSecretValue({ SecretId: wallet })
      .promise()
      .then((mySecretsValue) => {
        return mySecretsValue;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    console.log('Checking Secret');
    if (typeof mySecretsValue.SecretString !== 'undefined') {
      const mySecrets = JSON.parse(mySecretsValue.SecretString);

      if (typeof mySecrets == 'undefined') {
        throw new Error(`Unexpected parsing of secrets wallet: ${wallet}`);
      }

      myLocalSecrets = {};
    }
  } catch (err) {
    console.error('Failed to load AWS secrets: ', err);
  }
};

module.exports = {
  initialiseSecrets,
};
