const STORE = {
    "loggedInUser": null,

    "users": [
        {
            "id": 1,
            "username": "sean",
            "password": "admin",
            "email_address": "powerupsoup@gmail.com",
            "role": "dungeon_master"
        },
        {
            "id": 2,
            "username": "irene",
            "password": "player",
            "email_address": "seanajackson1989@gmail.com",
            "role": "player"
        },
        {
            "id": 3,
            "username": "quinn",
            "password": "player2",
            "email_address": "irenemstaffordlmt@gmail.com",
            "role": "player"
        }
    ],

    "characters": [
        {
            "id": 1,
            "user_id": 2,
            "name": "Gabrielle"
        },
        {
            "id": 2,
            "user_id": 2,
            "name": "Peter Rabbit"
        },
        {
            "id": 3,
            "user_id": 3,
            "name": "quin's character"
        }
    ],

    "notices": [
        {
            "id": 100001,
            "players": ["irene", "quinn"],
            "characters": ["Peter Rabbit", "quin's character"],
            "message": "This is a dummy message",
            "status": "Open"
        },
    ]
}

export default STORE;