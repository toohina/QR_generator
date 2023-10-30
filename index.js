/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        type:'string',
        name: 'url',
        message: 'Enter the URL you would like to generate a QR code for:'
    }
  ])
  .then((answers) => {
    console.log(answers.url);
    var qr_png = qr.image(answers.url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qr.png'));

    fs.writeFile('theURL.txt',answers.url,function(err){
        if (err) throw err;
        else console.log("success");
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });



