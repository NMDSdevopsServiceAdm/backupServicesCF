# Backup Services in Cloud Foundry

## Overview

# Technology

[Bree](https://github.com/breejs/bree) is a scheduler that allows us to configure jobs to run on a specific schedule.

# Running the Scheduler

Install the project dependencies

```
npm i
```

Set up ENV vars

```
export CRON=
```

Run the scheduler

```
node src/index.js
```

Change the schedule

The jobs and the schedule that they run on can be found in `src/index.js`

# Running as a task

```
cf run-task sfcreports-staging "node --max-old-space-size=8192 jobs/backup_database.js" --name backup_database -m 8G -k 4G
```

# Deployment

## Staging

```
cf push --no-route -f manifest.staging.yml -u process
```

## Pre-prod

```
cf push --no-route -f manifest.pre-prod.yml -u process
```

## Production

```
cf push --no-route -f manifest.prod.yml -u process
```
