const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const resultsBase = 'allure-results';
if (!fs.existsSync(resultsBase)) {
 console.error("No existe la carpeta de resultados.");
 process.exit(1);
}

const folders = fs.readdirSync(resultsBase).filter(f => fs.lstatSync(path.join(resultsBase, f)).isDirectory()).sort().reverse();
if (folders.length === 0) {
 console.error("No hay carpetas de resultados disponibles.");
 process.exit(1);
}

const latestResults = path.join(resultsBase, folders[0]);
const reportName = folders[0].replace('results_', 'report_');
const reportPath = path.join('allure-reports', reportName);

console.log(`Generando reporte en: ${reportPath}`);
try {
 execSync(`npx allure generate ${latestResults} -o ${reportPath} --clean`);
 console.log(`Reporte creado con éxito.`);
 console.log(`Para verlo ejecuta: npx allure open ${reportPath}`);
} catch (error) {
 console.error("Error generando el reporte:", error.message);
}

const latestPath = path.join('allure-reports', 'latest');

if (fs.existsSync(latestPath)) {
  fs.rmSync(latestPath, { recursive: true, force: true });
}

fs.cpSync(reportPath, latestPath, { recursive: true });

console.log(`Carpeta de reporte latest actualizado en: ${latestPath}`);
console.log(`Para ver el último reporte en la carpeta latest, ejecuta: npm run report`);