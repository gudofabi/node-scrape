const axios = require('axios');
const cheerio = require('cheerio');
const readline = require("readline");
const xlsx = require("xlsx");

// https://www.businesslist.ph/company/263811/gigz-superclub
const wb = xlsx.readFile("Reference.csv", {cellDates: true});
const ws = wb.Sheets["Sheet1"];

const wsData = xlsx.utils.sheet_to_json(ws);

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

                const name = $('.cmp_details_in > .info > #company_name').text();
                const address = $('.cmp_details_in > .info > .location').text();
                const city = $('.cmp_details_in > .info > .location > a').first().text();
                const state = $('.cmp_details_in > .info > .location').children().eq(1).text();
                const phone = $('.cmp_details_in > .info > .phone').text();
                const website = $('.cmp_details_in > .info > .weblinks').text();
                const description = $('.cmp_more > .info > .desc').text();

                wsData.push({
                    'Listing Title': name,
                    'Listing SEO Title': name,
                    'Listing Email': '',
                    'Listing URL': '',
                    'Listing Address': address,
                    'Listing Country': 'Philippines',
                    'Listing Country Abbreviation': 'PHP',
                    'Listing Region': '',
                    'Listing Region Abbreviation': '',
                    'Listing State': state,
                    'Listing State Abbreviation': '',
                    'Listing City': city,
                    'Listing Postal Code': '',
                    'Listing Phone': phone,
                    'Listing Short Description': '',
                    'Listing Long Description': description,
                    'Listing SEO Description': '',
                    'Listing Keywords':'',
                    'Listing Renewal Date': '',
                    'Listing Status': 'active',
                    'Listing Level': 'silver',
                    'Listing Category 1': '',
                    'Listing Category 2': '',
                    'Listing Category 3': '',
                    'Account Username': '',
                    'Account Password': '',
                    'Account Contact First Name': '',
                    'Account Contact Last Name': '',
                    'Account Contact Company': '',
                    'Account Contact Address': '',
                    'Account Contact Country': 'Philippines',
                    'Account Contact State': state,
                    'Account Contact City': city,
                    'Account Contact Postal Code': '',
                    'Account Contact Phone': phone,
                    'Account Contact Email': '',
                    'Account Contact URL': ''
                });
                console.log('\nLoading....');
                console.log(wsData.length);
                console.log('Success: New Data Added! ');
                
            })
            .catch(console.error);
        });
        break;
      case '2':
        // name
        const date = new Date();
        const fulldate = date.toLocaleTimeString();
        // new book
        const newWB = xlsx.utils.book_new();
        const newWS = xlsx.utils.json_to_sheet(wsData);

        // Append the sheet
        xlsx.utils.book_append_sheet(newWB, newWS, "New Data");
        xlsx.writeFile(newWB, 'New Data File-'+ fulldate.replace(/:/g, '') +'.csv');
        
        // close
        rl.close();
        
        break;
      default:
        console.log(`Just type 1 to scrape and 2 to download: `);
        break;
    }
    rl.prompt();
})


rl.on("close", function() {
    console.log("\nFin!");
    process.exit(0);
});
