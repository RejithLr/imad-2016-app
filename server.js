var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one':{
    	title: 'Article One - Browser Apps',
	heading: 'Article One - Browser',
	date: 'Oct 8, 2016',
	content:`
	    <p> This is my first article. This is my first article. </p> 
	    <p> This is my first article. This is my first article. </p> 
	    <p> This is my first article. This is my first article. </p>`
},
    'article-two':{
	title: 'Article Two - Mobile Apps',
	heading: 'Article Two - Mobile',
	date: 'Nov 10, 2016',
	content:`
	    <p> This is my second article. This is my second article. </p> 
	    <p> This is my second article. This is my second article. </p> 
	    <p> This is my second article. This is my second article. </p>`
},
    'article-three':{
	title: 'Article Three - Web  Apps',
	heading: 'Article Three - Web',
	date: 'Dec 12, 2016',
	content:`
	    <p> This is my third article. This is my third article. </p> 
	    <p> This is my third article. This is my third article. </p> 
	    <p> This is my third article. This is my third article. </p>`
}
};

function createTemplate(data){
    
    var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	
    var htmlTemplate= 
     `<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
            <div class="container">
                <div>
                    <a href="/"> Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                   ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`
    ;
    
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

/*
app.get('/article-one', function(req,res){
       //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
       res.send(createTemplate(articleOne));
});
*/

app.get('/:articleName', function(req,res){
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

/*
app.get('/article-two', function(req,res){
       res.send(createTemplate(articleTwo));
});
*/

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
