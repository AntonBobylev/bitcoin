export default defineEventHandler(async (event) => {
    const uri = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    const response  = await $fetch(uri);

    if (!response) {
        return null;
    }

    let rate = response['bpi']['USD']['rate'];
    if (rate.includes(',')) {
        rate = rate.replace(',', '');
    }
    
    return rate;
});
