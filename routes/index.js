const path = require('path');
const ejs = require('ejs');

module.exports = (req, res) => {
  const viewsDir = path.join(__dirname, 'views');
  
  ejs.renderFile(path.join(viewsDir, 'index.ejs'), { 
    title: 'Strona główna',
    message: 'Witaj w mojej aplikacji!'
  }, (err, str) => {
    if (err) {
      res.status(500).send('Error rendering template');
    } else {
      res.status(200).send(str);
    }
  });
};