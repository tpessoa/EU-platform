# EU-platform

Platform for hosting European Union (EU) activities

## Development environment

To build the services for development run the following commands

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose build
```

2. Then install the client and server dependencies on your machine.

```console
foo@bar:~/EU-platform $ cd client
foo@bar:~/EU-platform/client $ npm install

foo@bar:~/EU-platform $ cd server
foo@bar:~/EU-platform/server $ npm install
```

3. Then run the containers

```console
foo@bar:~/EU-platform $ docker-compose up
```

---

## Production environment

To build the services for production run the following commands

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml build
```

2. Do this commands only if you didn't already install the client and server dependencies

```console
foo@bar:~/EU-platform $ cd client
foo@bar:~/EU-platform/client $ npm install

foo@bar:~/EU-platform $ cd server
foo@bar:~/EU-platform/server $ npm install
```

3. Then run the containers

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```
