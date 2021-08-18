const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const config = require('../../../../config');

describe('src/databaseBackup/postgres/index', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('backupPostgres()', () => {
    it('should run backup of the database', async () => {
      const sql = 'DROP DATABASE database;';
      sinon.stub(config, 'cfConfig').get(() => {
        return {
          services: {
            postgres: [
              {
                name: 'test',
                credentials: {
                  uri: 'postgres://hello:password@localhost/database',
                },
              },
            ],
          },
        };
      });

      const backup = proxyquire('../../../../src/databaseBackup/postgres', {
        'await-exec': (command) => {
          expect(command).to.deep.equal(
            'pg_dump postgres://hello:password@localhost/database  -F t -O -x -f backup.sql',
          );
          return sql;
        },
      });

      const backedupSQL = await backup.backupPostgres({ service_name: 'test', type: 'postgres' });

      expect(backedupSQL).to.deep.equal(sql);
    });

    it('should run backup of the schema', async () => {
      const sql = 'DROP DATABASE database;';
      sinon.stub(config, 'cfConfig').get(() => {
        return {
          services: {
            postgres: [
              {
                name: 'test',
                credentials: {
                  uri: 'postgres://hello:password@localhost/database',
                },
              },
            ],
          },
        };
      });

      const backup = proxyquire('../../../../src/databaseBackup/postgres', {
        'await-exec': (command) => {
          expect(command).to.deep.equal(
            'pg_dump postgres://hello:password@localhost/database -n test -F t -O -x -f backup.sql',
          );
          return sql;
        },
      });

      const backedupSQL = await backup.backupPostgres({ schema: 'test', service_name: 'test', type: 'postgres' });

      expect(backedupSQL).to.deep.equal(sql);
    });
  });
});
