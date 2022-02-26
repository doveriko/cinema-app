export let seed = {
    rooms: [
        {
            name: 'Jerezano',
            id: 1,
            ticketUnitPrice: 5.50
        },
        {
            name: 'Lealas',
            id: 2,
            ticketUnitPrice: 6.00
        },
        {
            name: 'Delicias',
            id: 3,
            ticketUnitPrice: 7.00
        }
    ],
    movies: [
        {
            id: 1,
            title: "Jumanji",
            description: "The story centers on a supernatural board game that releases jungle-based hazards upon its players with every turn they take. As a boy in 1969, Alan Parrish became trapped inside the game itself while playing with his friend Sarah Whittle. Twenty-six years later, siblings Judy and Peter Shepherd find the game, begin playing and then unwittingly release the now-adult Alan. After tracking down Sarah, the quartet resolves to finish the game in order to reverse all of the destruction it has caused.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/jumanji.JPG"
        },
        {
            id: 2,
            title: "Inglourious Basterds",
            description: "A few Jewish soldiers are on an undercover mission to bring down the Nazi government and put an end to the war. Meanwhile, a woman wants to avenge the death of her family from a German officer.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/malditos.JPG"
        },
        {
            id: 3,
            title: "Jurassic Park",
            description: "Jurassic Park is a 1993 American science fiction adventure giant monster film directed by Steven Spielberg and produced by Kathleen Kennedy and Gerald R. Molen.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/jurassic.JPG"
        },
        {
            id: 4,
            title: "The Jungle Book",
            description: "Mowgli is a boy brought up in the jungle by a pack of wolves. When Shere Khan, a tiger, threatens to kill him, a panther and a bear help him escape his clutches.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/libro.JPG"
        },
        {
            id: 5,
            title: "Papá Piquillo",
            description: "When his young grandson suffers an accident, Papá Piquillo does everything to take him to be treated in Australia.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/papa.JPG"
        },
        {
            id: 6,
            title: "Billy Elliot",
            description: "The life of 11-year-old Billy Elliot, a coal miner's son in Northern England, is forever changed one day when he stumbles upon a ballet class during his weekly boxing lesson. Before long, he finds himself in dance, demonstrating the kind of raw talent seldom seen by the class' exacting instructor, Mrs. Wilkinson. With a tart tongue and a never-ending stream of cigarettes in her hand, Mrs. Wilkinson's zest for teaching is revived when she sees Billy's potential.",
            imageUrl: "https://github.com/doveriko/cinema-app/blob/master/client/public/covers/billy.JPG"
        }
    ],
    sessions: [
        // Cine Jerezano (room.id = 1)
        {
            id: 1,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 1,
            roomId: 1
        },
        {
            id: 2,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 1,
            roomId: 1
        },
        {
            id: 3,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 2,
            roomId: 1
        },
        {
            id: 4,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 2,
            roomId: 1
        },
        {
            id: 5,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 3,
            roomId: 1
        },
        {
            id: 6,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 3,
            roomId: 1
        },
        {
            id: 7,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 4,
            roomId: 1
        },
        {
            id: 8,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 4,
            roomId: 1
        },
        {
            id: 9,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 5,
            roomId: 1
        },
        {
            id: 10,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 5,
            roomId: 1
        },
        {
            id: 11,
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 6,
            roomId: 1
        },
        {
            id: 12,
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 6,
            roomId: 1
        },
        {
            id: 13,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 1,
            roomId: 1
        },
        {
            id: 14,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 1,
            roomId: 1
        },
        {
            id: 15,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 2,
            roomId: 1
        },
        {
            id: 16,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 2,
            roomId: 1
        },
        {
            id: 17,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 3,
            roomId: 1
        },
        {
            id: 18,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 3,
            roomId: 1
        },
        {
            id: 19,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 4,
            roomId: 1
        },
        {
            id: 20,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 4,
            roomId: 1
        },
        {
            id: 21,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 5,
            roomId: 1
        },
        {
            id: 22,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 5,
            roomId: 1
        },
        {
            id: 23,
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 6,
            roomId: 1
        },
        {
            id: 24,
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 6,
            roomId: 1
        },
        {
            id: 25,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 1,
            roomId: 1
        },
        {
            id: 26,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 1,
            roomId: 1
        },
        {
            id: 27,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 2,
            roomId: 1
        },
        {
            id: 28,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 2,
            roomId: 1
        },
        {
            id: 29,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 1
        },
        {
            id: 30,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 1
        },
        {
            id: 31,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 1
        },
        {
            id: 32,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 1
        },
        {
            id: 33,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 5,
            roomId: 1
        },
        {
            id: 34,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 5,
            roomId: 1
        },
        {
            id: 35,
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 6,
            roomId: 1
        },
        {
            id: 36,
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 6,
            roomId: 1
        },
        {
            id: 37,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 1,
            roomId: 1
        },
        {
            id: 38,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 1,
            roomId: 1
        },
        {
            id: 39,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 2,
            roomId: 1
        },
        {
            id: 40,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 2,
            roomId: 1
        },
        {
            id: 41,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 3,
            roomId: 1
        },
        {
            id: 42,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 3,
            roomId: 1
        },
        {
            id: 43,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 4,
            roomId: 1
        },
        {
            id: 44,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 4,
            roomId: 1
        },
        {
            id: 45,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 5,
            roomId: 1
        },
        {
            id: 46,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 5,
            roomId: 1
        },
        {
            id: 47,
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 6,
            roomId: 1
        },
        {
            id: 48,
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 6,
            roomId: 1
        },
        {
            id: 49,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 1,
            roomId: 1
        },
        {
            id: 50,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 1,
            roomId: 1
        },
        {
            id: 51,
            time: "2020-01-17T22:00:00.000Z", // viernes
            movieId: 1,
            roomId: 1
        },
        {
            id: 52,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 2,
            roomId: 1
        },
        {
            id: 53,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 2,
            roomId: 1
        },
        {
            id: 54,
            time: "2020-01-17T21:30:00.000Z", // viernes
            movieId: 2,
            roomId: 1
        },
        {
            id: 55,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 3,
            roomId: 1
        },
        {
            id: 56,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 3,
            roomId: 1
        },
        {
            id: 57,
            time: "2020-01-17T22:00:00.000Z", // viernes
            movieId: 3,
            roomId: 1
        },
        {
            id: 58,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 4,
            roomId: 1
        },
        {
            id: 59,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 4,
            roomId: 1
        },
        {
            id: 60,
            time: "2020-01-17T22:30:00.000Z", // viernes
            movieId: 4,
            roomId: 1
        },
        {
            id: 61,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 5,
            roomId: 1
        },
        {
            id: 62,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 5,
            roomId: 1
        },
        {
            id: 63,
            time: "2020-01-17T22:00:00.000Z", // viernes
            movieId: 5,
            roomId: 1
        },
        {
            id: 64,
            time: "2020-01-17T12:30:00.000Z", // viernes
            movieId: 6,
            roomId: 1
        },
        {
            id: 65,
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 6,
            roomId: 1
        },
        {
            id: 66,
            time: "2020-01-17T21:30:00.000Z", // viernes
            movieId: 6,
            roomId: 1
        },
        {
            id: 67,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 1,
            roomId: 1
        },
        {
            id: 68,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 1,
            roomId: 1
        },
        {
            id: 69,
            time: "2020-01-18T22:00:00.000Z", // sábado
            movieId: 1,
            roomId: 1
        },
        {
            id: 70,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 2,
            roomId: 1
        },
        {
            id: 71,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 2,
            roomId: 1
        },
        {
            id: 72,
            time: "2020-01-18T21:30:00.000Z", // sábado
            movieId: 2,
            roomId: 1
        },
        {
            id: 73,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 3,
            roomId: 1
        },
        {
            id: 74,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 3,
            roomId: 1
        },
        {
            id: 75,
            time: "2020-01-18T22:00:00.000Z", // sábado
            movieId: 3,
            roomId: 1
        },
        {
            id: 76,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 4,
            roomId: 1
        },
        {
            id: 77,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 4,
            roomId: 1
        },
        {
            id: 78,
            time: "2020-01-18T22:30:00.000Z", // sábado
            movieId: 4,
            roomId: 1
        },
        {
            id: 79,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 5,
            roomId: 1
        },
        {
            id: 80,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 5,
            roomId: 1
        },
        {
            id: 81,
            time: "2020-01-18T22:00:00.000Z", // sábado
            movieId: 5,
            roomId: 1
        },
        {
            id: 82,
            time: "2020-01-18T12:30:00.000Z", // sábado
            movieId: 6,
            roomId: 1
        },
        {
            id: 83,
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 6,
            roomId: 1
        },
        {
            id: 84,
            time: "2020-01-18T21:30:00.000Z", // sábado
            movieId: 6,
            roomId: 1
        },
        {
            id: 85,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 1,
            roomId: 1
        },
        {
            id: 86,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 1,
            roomId: 1
        },
        {
            id: 87,
            time: "2020-01-19T22:00:00.000Z", // domingo
            movieId: 1,
            roomId: 1
        },
        {
            id: 88,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 2,
            roomId: 1
        },
        {
            id: 89,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 2,
            roomId: 1
        },
        {
            id: 90,
            time: "2020-01-19T21:30:00.000Z", // domingo
            movieId: 2,
            roomId: 1
        },
        {
            id: 91,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 3,
            roomId: 1
        },
        {
            id: 92,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 3,
            roomId: 1
        },
        {
            id: 93,
            time: "2020-01-19T22:00:00.000Z", // domingo
            movieId: 3,
            roomId: 1
        },
        {
            id: 94,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 4,
            roomId: 1
        },
        {
            id: 95,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 4,
            roomId: 1
        },
        {
            id: 96,
            time: "2020-01-19T22:30:00.000Z", // domingo
            movieId: 4,
            roomId: 1
        },
        {
            id: 97,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 5,
            roomId: 1
        },
        {
            id: 98,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 5,
            roomId: 1
        },
        {
            id: 99,
            time: "2020-01-19T22:00:00.000Z", // domingo
            movieId: 5,
            roomId: 1
        },
        {
            id: 100,
            time: "2020-01-19T12:30:00.000Z", // domingo
            movieId: 6,
            roomId: 1
        },
        {
            id: 101,
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 6,
            roomId: 1
        },
        {
            id: 102,
            time: "2020-01-19T21:30:00.000Z", // domingo
            movieId: 6,
            roomId: 1
        },
        // Cine Lealas (room.id = 2)
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-17T21:30:00.000Z", // viernes
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-17T22:00:00.000Z", // viernes
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-17T22:30:00.000Z", // viernes
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-18T21:30:00.000Z", // sábado
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-18T22:00:00.000Z", // sábado
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-18T22:30:00.000Z", // sábado
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-19T21:30:00.000Z", // domingo
            movieId: 2,
            roomId: 2
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-19T22:00:00.000Z", // domingo
            movieId: 3,
            roomId: 2
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 4,
            roomId: 2
        },
        {
            time: "2020-01-19T22:30:00.000Z", // domingo
            movieId: 4,
            roomId: 2
        },
        // Cine Delicias (room.id = 3)
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-13T17:30:00.000Z", // lunes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-13T20:30:00.000Z", // lunes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-14T17:30:00.000Z", // martes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-14T20:30:00.000Z", // martes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-15T17:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-15T20:30:00.000Z", // miércoles
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-16T17:30:00.000Z", // jueves
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-16T20:30:00.000Z", // jueves
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-17T21:30:00.000Z", // viernes
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-17T22:00:00.000Z", // viernes
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-17T18:30:00.000Z", // viernes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-17T22:30:00.000Z", // viernes
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-18T21:30:00.000Z", // sábado
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-18T22:00:00.000Z", // sábado
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-18T18:30:00.000Z", // sábado
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-18T22:30:00.000Z", // sábado
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-19T21:30:00.000Z", // domingo
            movieId: 6,
            roomId: 3
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-19T22:00:00.000Z", // domingo
            movieId: 3,
            roomId: 3
        },
        {
            time: "2020-01-19T18:30:00.000Z", // domingo
            movieId: 4,
            roomId: 3
        },
        {
            time: "2020-01-19T22:30:00.000Z", // domingo
            movieId: 4,
            roomId: 3
        },
    ],
    seats: [
        {
            area: 'Front',
            number: 1,
            roomId: 1
        },
        {
            area: 'Front',
            number: 2,
            roomId: 1
        },
        {
            area: 'Front',
            number: 3,
            roomId: 1
        },
        {
            area: 'Middle',
            number: 1,
            roomId: 1
        },
        {
            area: 'Middle',
            number: 2,
            roomId: 1
        },
        {
            area: 'Middle',
            number: 3,
            roomId: 1
        },
        {
            area: 'Back',
            number: 1,
            roomId: 1
        },
        {
            area: 'Back',
            number: 2,
            roomId: 1
        },
        {
            area: 'Back',
            number: 3,
            roomId: 1
        },
        {
            area: 'Front',
            number: 1,
            roomId: 2
        },
        {
            area: 'Front',
            number: 2,
            roomId: 2
        },
        {
            area: 'Front',
            number: 3,
            roomId: 2
        },
        {
            area: 'Middle',
            number: 1,
            roomId: 2
        },
        {
            area: 'Middle',
            number: 2,
            roomId: 2
        },
        {
            area: 'Middle',
            number: 3,
            roomId: 2
        },
        {
            area: 'Back',
            number: 1,
            roomId: 2
        },
        {
            area: 'Back',
            number: 2,
            roomId: 2
        },
        {
            area: 'Back',
            number: 3,
            roomId: 2
        },
        {
            area: 'Front',
            number: 1,
            roomId: 3
        },
        {
            area: 'Front',
            number: 2,
            roomId: 3
        },
        {
            area: 'Front',
            number: 3,
            roomId: 3
        },
        {
            area: 'Middle',
            number: 1,
            roomId: 3
        },
        {
            area: 'Middle',
            number: 2,
            roomId: 3
        },
        {
            area: 'Middle',
            number: 3,
            roomId: 3
        },
        {
            area: 'Back',
            number: 1,
            roomId: 3
        },
        {
            area: 'Back',
            number: 2,
            roomId: 3
        },
        {
            area: 'Back',
            number: 3,
            roomId: 3
        }
    ],
    offsiteProducts: [
        {
            name: 'Drink',
            unitPrice: 3.50,
            description: "Choose from our selections of soda, water and beer",
            imageUrl: "https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/softdrink.jpg"
        },
        {
            name: 'Full Menu: Drink + Popcorns',
            unitPrice: 7.50,
            description: "Get it all for a bargain",
            imageUrl: "https://media.istockphoto.com/photos/cinema-objects-picture-id498956113?k=6&m=498956113&s=612x612&w=0&h=EeMPBS_j6DmPnWjXgOWNX1Ydw8SNInhJ_VImIpm_BQY="
        },
        {
            name: 'Popcorns',
            unitPrice: 5.00,
            description: "Who wouldn't want to enjoy the movie with a bucket of popcorns?",
            imageUrl: "https://wholefully.com/wp-content/uploads/2017/06/movie-theatre-popcorn-800x1200-720x540.jpg"
        }
    ]
}