const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
██╗  ██╗    ███╗   ██╗ ██████╗ ██████╗ ███████╗ █████╗ ██╗     ███████╗
╚██╗██╔╝    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██║     ██╔════╝
 ╚███╔╝     ██╔██╗ ██║██║   ██║██████╔╝█████╗  ███████║██║     ███████╗
 ██╔██╗     ██║╚██╗██║██║   ██║██╔══██╗██╔══╝  ██╔══██║██║     ╚════██║
██╔╝ ██╗    ██║ ╚████║╚██████╔╝██║  ██║███████╗██║  ██║███████╗███████║
╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
${chalk.green('Note : use this tool at 11.00 to 16.00 so as not to get banned')}
${chalk.red('Type : X TOOL BY NOREALS')}
By : ${chalk.red('@Only_NoRealss')} - ${chalk.green('X CHEAT DEVELOPER SINCE 2019')}
`);

    const auth = rs.question('[+] Enter your auth token : ');
    console.log('');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Wrong cookie or Expired cookie !`));
            break;

        } else if (result.includes('User')) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns;
            
            console.log(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | ${chalk.yellow(`Trophy : ${trophy}`)} | ${chalk.blue(`Crown : ${crown}`)}`));
            await sleep(2500);

        } else if (result == 'YOUR ACCOUNT HAS BANNED!!') {

            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Banned !`));
            break;
            
        } else if (result == 'SERVER_ERROR') {

            continue;
            
        }
    }
    

})();
