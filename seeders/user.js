import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),

        password: "password123",
        bio: faker.lorem.paragraph(),
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);
    console.log(`Created ${numUsers} users.`);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};




export {
     createUser
};

