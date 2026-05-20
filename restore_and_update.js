const fs = require('fs');
const path = require('path');

const backupDir = "C:\\Os meus Sites\\DeliveryPt\\brgz-food34.shop\\produtos";
const targetDir = "C:\\Os meus Sites\\Burguez Brasil\\brgz-food34.shop\\produtos";

const dirs = fs.readdirSync(backupDir);

for (const dir of dirs) {
    if (dir.startsWith("combo")) {
        const backupFile = path.join(backupDir, dir, 'index.html');
        const targetFile = path.join(targetDir, dir, 'index.html');
        
        if (fs.existsSync(backupFile)) {
            // 1. Restore from backup
            let content = fs.readFileSync(backupFile, 'utf8');
            
            // 2. Safe replace
            const regex = /<script>\s*function finalizar\(\)\s*\{[\s\S]*?<\/script>/;
            const newScript = '<script src="../../js/pix-checkout.js"></script>\n\t<script>\n\t\tfunction finalizar() {\n\t\t\tiniciarPixUI();\n\t\t}\n\t</script>';
            
            content = content.replace(regex, newScript);
            fs.writeFileSync(targetFile, content);
            console.log('Restored and updated ' + targetFile);
        }
    }
}
