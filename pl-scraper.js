const axios = require('axios');
const cheerio = require('cheerio');
const readline = require("readline");
const scrapeData = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// const url = 'https://www.businesslist.ph/company/301673/bits-balmediano-information-technology-solution';

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
      case 'hello':
        console.log('world!');
        break;
      default:
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }
    rl.prompt();
})
// rl.question("Enter url: ", url => {
//     axios(url)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const scrapeData = [];

//         const name = $('.cmp_details_in > .info > #company_name').text();
//         const address = $('.cmp_details_in > .info > .location').text();
//         const city = $('.cmp_details_in > .info > .location > a').first().text();
//         const state = $('.cmp_details_in > .info > .location').children().eq(1).text();
//         const phone = $('.cmp_details_in > .info > .phone').text();
//         const website = $('.cmp_details_in > .info > .weblinks').text();
//         const description = $('.cmp_more > .info > .desc').text();

//         scrapeData.push({
//             name,
//             address,
//             city,
//             state,
//             phone,
//             website,
//             description
//         });
//         console.log('\n\nScrape Data: ');
//         console.log(scrapeData);
//         rl.close();
//     })
//     .catch(console.error);
// });

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
