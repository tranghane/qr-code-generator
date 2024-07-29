/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
// import qrC from "qr-image-color";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    { message: "Enter URL: ", name: "URL" },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var inputURL = answers.URL;

    if (validURL(inputURL)) {
        var qr_svg = qr.image("www.youtube.com");
        qr_svg.pipe(fs.createWriteStream("qr_img.png"));
        fs.writeFile("URL.txt", inputURL, (err) => {
            if (err) throw err;
            console.log("file written successfully");
        })
    
    }else {
        console.log("INVALID URL");
    }




    // var svg_string = qr.imageSync("I love QR!", { type: "svg" });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
  