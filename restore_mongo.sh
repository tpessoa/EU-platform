#!/bin/sh

BACKUP_DIR=.backups/mongodb
BACKUP_DIR_INSIDE=backups/
BACKUP_DATE=$1

DATABASE_NAME="eu-platform-db"

if [ ! -d "./${BACKUP_DIR}/${BACKUP_DATE}"  ]
    then
        echo "There is no backup dated ${BACKUP_DATE} on bakcup mongodb folders!"
        exit 1
fi

if [ "$(docker ps -q -f name=mongo)" ]
    then
        echo "Restoring mongodb ${BACKUP_DATE}..."
        #docker exec mongodb mongorestore --db ${DATABASE_NAME} --drop /${BACKUP_DIR}/${BACKUP_DATE} 
        docker exec -it mongo mongorestore --drop /${BACKUP_DIR_INSIDE}/${BACKUP_DATE}
        echo "Mongodb restore done!"
    else
		echo "Containers NOT running!"
		exit 1
fi

echo "Exiting..."
exit 0