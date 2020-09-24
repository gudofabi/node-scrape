const axios = require('axios');
const cheerio = require('cheerio');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
      case '1':
        rl.question("Enter url: ", url => {
            axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const scrapeData = [];

                const name = $('.cmp_details_in > .info > #company_name').text();
                const address = $('.cmp_details_in > .info > .location').text();
                const city = $('.cmp_details_in > .info > .location > a').first().text();
                const state = $('.cmp_details_in > .info > .location').children().eq(1).text();
                const phone = $('.cmp_details_in > .info > .phone').text();
                const website = $('.cmp_details_in > .info > .weblinks').text();
                const description = $('.cmp_more > .info > .desc').text();

                scrapeData.push({
                    name,
                    address,
                    city,
                    state,
                    phone,
                    website,
                    description
                });
                console.log('\n\nScrape Data: ');
                console.log(scrapeData);
                
            })
            .catch(console.error);
        });
        break;
      case '2':
        rl.close();
        break;
      default:
        console.log(`Just type 1 to scrape and 2 to quit: `);
        break;
    }
    rl.prompt();
})


rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
