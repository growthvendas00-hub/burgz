const fs = require('fs');

const marmitaIndex = "C:\\Users\\DELL\\Downloads\\Marmitas Brasil\\marmitas\\index.html";
const burgzIndex = "C:\\Os meus Sites\\Burguez Brasil\\brgz-food34.shop\\index.html";

let marmitaHtml = fs.readFileSync(marmitaIndex, 'utf8');
let burgzHtml = fs.readFileSync(burgzIndex, 'utf8');

// Extract from async function atualizarLocalizacao() { up to escolherLocalizacao();
const matchMarmita = marmitaHtml.match(/async function atualizarLocalizacao\(\) \{[\s\S]*?escolherLocalizacao\(\);/);

if (matchMarmita) {
    const replacement = matchMarmita[0];
    
    const matchBurgz = burgzHtml.match(/\/\/ ── Update UI with location ────────────────────────────────────\s*async function atualizarLocalizacao\(\) \{[\s\S]*?escolherLocalizacao\(\);/);
    
    if (matchBurgz) {
        burgzHtml = burgzHtml.replace(matchBurgz[0], replacement);
        fs.writeFileSync(burgzIndex, burgzHtml);
        console.log("Successfully updated Burgz index.html with Marmitas logic.");
    } else {
        console.log("Could not find the script block in Burguez index.html.");
    }
} else {
    console.log("Could not find the script block in Marmitas index.html.");
}
