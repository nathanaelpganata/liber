require("dotenv").config({ path: ".local.env" });
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Book = require("../models/book");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Not Connected to database", err);
    });

for (let i = 0; i <= 100; i++) {
    const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.firstName(),
        releaseDate: faker.date.past(),
        genre: faker.helpers.arrayElement(["horror", "action", "fantasy"]),
        rating: faker.string.numeric({ min: 1, max: 5 }),
        price: faker.string.numeric({ min: 10, max: 100 }),
        description: faker.lorem.paragraphs(2),
        publisher: faker.lorem.words(1),
        language: faker.helpers.arrayElement(["english", "japanese", "french"]),
        isbn10: faker.string.numeric({ min: 1000000000, max: 9999999999 }),
        isbn13: faker.string.numeric({
            min: 1000000000000,
            max: 9999999999999,
        }),
    });
    book.save()
        .then(() => {
            console.log("Book created successfully");
            if (i === 100) {
                mongoose.disconnect();
            }
        })
        .catch((err) => console.log(err));
}
