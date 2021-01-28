mongo -- auth << EOF
    db.createUser({
        user: "admin",
        pwd: "secret",
        roles: [
            { role: "readWrite", db: "auth"}
        ]
    })

EOF