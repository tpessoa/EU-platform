# EU-platform

Platform for hosting European Union (EU) activities. Supported by _Centro de Excelência Jean Monnet da Universidade de Coimbra_.

> This guide presents the instructions to put the platform up and running in a Docker environment.

## Development environment

To build the services for the development environment run the following commands:

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose build
```

2. Install individually on the client and server the node module dependencies.

```console
foo@bar:~/EU-platform $ cd client
foo@bar:~/EU-platform/client $ npm install
```

```console
foo@bar:~/EU-platform $ cd server
foo@bar:~/EU-platform/server $ npm install
```

In the server create a .env file with the following:

```console
SECRET_KEY=[YOUR_SECRET_KEY]
```

3. Run the Docker Containers

```console
foo@bar:~/EU-platform $ docker-compose up
```

4. Restore the database to the default version. This creates an admin and some start up data.

```console
foo@bar:~/EU-platform $ ./restore_mongo init-platform-data
```

5. Open your browser at http://localhost (or the remote machine URL).

6. Add /login at HomePage to access the admin page to add your custom data to the platform. Fill the form with the following credentials:
   - username: admin
   - password: 123

---

## Production environment

After building the development environment, you're ready to create the services for the production environment. Run the following commands:

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml build
```

- You can add the flag --remove-orphans to remove the previous unused containers that you created.

2. Run the containers

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

3. Open your browser at http://localhost (or the remote machine URL).

---

### Assets credits

Sound effects used in games obtained from https://www.zapsplat.com
