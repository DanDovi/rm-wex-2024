#!/bin/bash
set -e

DATABASE_URL="jdbc:postgresql://$DB_HOST:$DB_PORT/$DB_NAME"

echo "DB URL: $DATABASE_URL"

if [[ $CLEAN_DB = "true" ]]; then
    flyway clean -url=$DATABASE_URL -user=$DB_USERNAME -password=$DB_PASSWORD -locations="filesystem:sql" -baselineOnMigrate=true -connectRetries=60
else
    flyway migrate -url=$DATABASE_URL -user=$DB_USERNAME -password=$DB_PASSWORD -locations="filesystem:sql" -baselineOnMigrate=true -connectRetries=60
fi
