const request = require('request-promise');

const wishlist = [
    'Mecanico   ',
    'Mecânico   '
]

const spotlights = [
    'G610',
    'G810',
    'G910',
    'G513',
    'RGB'
]

var lastWishlistCount = 0;
var lastSpotlightCount = 0;

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

    var wishlistCount = 0;
    var spotlightCount = 0;

    for (let i in keys) {
        const product = products[keys[i]];

        for (let j in wishlist) {
            if (product.produto.toLowerCase().includes(wishlist[j].trim().toLowerCase()) && product.quantidade != 0) {
                var isSpotlight = false;
                wishlistCount++;

                for(let k in spotlights) {
                    if (product.produto.toLowerCase().includes(spotlights[k].toLowerCase())) {
                        isSpotlight = true;
                        break;
                    }
                }

                if(isSpotlight) {
                    spotlightCount++;
                    console.log(`\x1b[45m\x1b[4m${wishlist[j]}\x1b[45m\x1b[4m - ${product.produto} - \x1b[1m\x1b[45m\x1b[4mR$ ${product.vlr_oferta}\x1b[45m\x1b[0m`);
                    console.log(`\x1b[43mhttps://www.kabum.com.br/produto/${product.codigo}\x1b[0m`);
                } else {
                    
                    console.log(`\x1b[0m${wishlist[j]}\x1b[0m - ${product.produto} - \x1b[42mR$ ${product.vlr_oferta}\x1b[0m`);
                }
            }
        }
    }

    console.log();

    if(wishlistCount != lastWishlistCount) {
        console.log(`\x1b[45mWishlist : ${wishlistCount}\x1b[0m`);
    } else {
        console.log(`Wishlist : ${wishlistCount}`);
    }
    
    if(spotlightCount != lastSpotlightCount) {
        console.log(`\x1b[45mSpotlight: ${spotlightCount}\x1b[0m`);
    } else {
        console.log(`Spotlight: ${spotlightCount}`);
    }

    lastSpotlightCount = spotlightCount;
    lastWishlistCount = wishlistCount;
}

getOffers();
setInterval(getOffers, 60000);
