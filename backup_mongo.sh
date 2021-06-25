#!/bin/sh
 
TODAY=`date +%Y%m%d%H%M`
BACKUP_DIR=/backups/

DATABASE_NAME="eu-platform-db"
 
mkdir -p ${BACKUP_DIR}/${TODAY}
 
docker exec mongo mongodump --db ${DATABASE_NAME} --out /${BACKUP_DIR}/${TODAY}/
#mongodump -h <DATABASE_HOST> -d <DATABASE_NAME> -u <USERNAME> -p <PASSWRD> --out ${BACKUP_DIR}/${TODAY}/

