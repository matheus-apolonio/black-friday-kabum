const request = require('request-promise');

const wishlist = [
    'WaterCooler',
    'Mecanico',
    'Mecânico'
]

const spotlights = [
    'Corsair',
    'Logitech'
]

async function getOffers() {
    process.stdout.write('\033c');
    const response = await request({
        url: 'https://blackfriday.kabum.com.br/data.json?campanha=blackfriday',
        method: 'GET',
        json: true,
        headers: {
            referrer: 'blackfriday.kabum.com.br'
        }
    });

    const products = response.produtos;
    const keys = Object.keys(response.produtos);

    for (let i in keys) {
        const product = products[keys[i]];

        for (let j in wishlist) {
            if (product.produto.toLowerCase().includes(wishlist[j].toLowerCase()) && product.quantidade != 0) {

                for(let k in spotlights) {
                    if (product.produto.toLowerCase().includes(spotlights[k].toLowerCase())) {
                        console.log(`\x1b[45m\x1b[4m${wishlist[j]}\x1b[45m\x1b[4m - ${product.produto} - \x1b[1m\x1b[45m\x1b[4mR$ ${product.vlr_oferta}\x1b[45m\x1b[0m`);
                        break;
                    }
                    
                    console.log(`\x1b[0m${wishlist[j]}\x1b[0m - ${product.produto} - \x1b[42mR$ ${product.vlr_oferta}\x1b[0m`);
                }
            }
        }
    }
}

getOffers();
setInterval(getOffers, 60000);
