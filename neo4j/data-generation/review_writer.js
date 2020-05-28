const faker = require('faker');
const fs = require('fs');
const writeOpts = {highWaterMark: 2 ** 16 }; // 65536

const writeGames = fs.createWriteStream('./neo4j/games.csv', writeOpts);
writeGames.write('id:ID(Game),game_id,currentGame,reviewCount\n', 'utf8')

const writeReviews = fs.createWriteStream('./neo4j/reviews.csv', writeOpts);
writeReviews.write('id:ID(Review),review_id,game_id,game_reviews,rating,hours,description,helpful,funny,date_posted,thread_length,user_id\n', 'utf8');





let reviewIds = 0;
function writeReviewsForEachGame(count, game_id) {
  let data = '';
  for(i=0; i< count; i++){
      reviewIds += 1;
      const review_id = reviewIds;
      const rating = faker.random.number(count);
      const hours = faker.finance.amount(0, 100, 1);
      const description = faker.lorem.sentences(4);
      const helpful = faker.random.number(1000);
      const funny = faker.random.number(1000);
      const date_posted = faker.date.past();
      const thread_length = faker.random.number(50);
      const user_id = faker.random.number(100000);
      data += `${reviewIds},${review_id},${game_id},${count},${rating},${hours},${description},${helpful},${funny},${date_posted},${thread_length},${user_id}\n`;
      console.log(`Review # ${reviewIds} successfully written.`);
  }
  writeReviews.write(data);
}

 function writeTenMillionGames(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      const reviewCount = faker.random.number(10);
      i -= 1;
      id += 1;
      const game_id = id;
      const currentGame = faker.commerce.productName();
      const data = `${id},${game_id},${currentGame},${reviewCount}\n`;
      console.log(`Game # ${id} written. ${i} games remaining`);
      writeReviewsForEachGame(reviewCount, id);
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

console.time('Duration');
writeTenMillionGames(writeGames, 'utf-8', () => {
  writeGames.end();
});
console.timeEnd('Duration');

