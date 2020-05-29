const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('./neo4j/users.csv');
writeUsers.write('id:ID(User),user_id,username,recommended,steam_purchaser,numProducts,numReviews,icon,player_type,xp,friend_level,steam_level\n', 'utf8');

const playerTypes = ['Power Player', '3 Years of Service', 'Walking Tall', 'Amber'];
function writeOneHundredThousandUsers(writer, encoding, callback) {
  let i = 100000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const user_id = id;
      const username = faker.internet.userName();
      const recommended = faker.random.boolean();
      const steam_purchaser = faker.random.boolean();
      const numProducts = faker.random.number(500);
      const numReviews = faker.random.number(500);
      const icon = faker.image.imageUrl();
      const player_type = faker.random.arrayElement(playerTypes);
      const xp = faker.random.number(1000);
      const friend_level = faker.random.number(50);
      const steam_level = faker.random.number(1000);
      const data = `${id},${user_id},${username},${recommended},${steam_purchaser},${numProducts},${numReviews},${icon},${player_type},${xp},${friend_level},${steam_level}\n`;
      console.log(`User # ${id} of ${i} users successfully written.`);
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeOneHundredThousandUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
