const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const data = require('./database.json');


const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}
function base64Encode(file) {
    return fs.readFileSync(file, { encoding: 'base64' });
}

const certif = "data:image/png;base64," + base64Encode("./certiff.png");
const data_ = {
    test: {
        fullName: "Your Name",
        type: "test",
        url: "http://localhost:8080",
        username: "test",
        password: "test",
        database: "test",
        image: certif
    }
};


const func = async () => {

    try {
        const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files', '--enable-local-file-accesses'] });
        const page = await browser.newPage();
        const content = await compile('index', data_);
        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'index19.pdf',
            format: 'A4',
            landscape: true,
            printBackground: true,
        });

        await browser.close();
        process.exit();
    }
    catch (e) {
        console.log(e);
    }
    return "hello";

}

const hi = func();


