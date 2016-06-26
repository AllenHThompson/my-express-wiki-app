var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
     response.redirect('/homepage');
});

app.get('/:pageName', function(request, response) {
     var pageName = request.params.pageName;
     var pageView = "pages/" + pageName + ".txt";
     fs.readFile(pageView, function(err, data) {
          if (err) {
               response.render('placeholder.hbs', { pageName: pageName });
               return;
     }
     var content = data.toString();
     response.send(content);
     });
});

app.get('/:pageName/edit', function(request, response) {
     var pageName = request.params.pageName;
     response.render('edit.hbs', { pageName: pageName });
});

app.post('/:pageName/save', function(request, response) {
     var pageName = request.params.pageName;
     var data = request.body;
     fs.writeFile("pages/" + pageName + ".txt", data.saveEdit, function(err) {
          if (err) {
               console.log(err);
               return;
          }
     });
     response.redirect('/' + pageName);
});

app.listen(3000, function() {
     console.log('Listening on Port 3000.');
});
