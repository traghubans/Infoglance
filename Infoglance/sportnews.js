//Imports
var NewsAPI = require('newsapi');
var lexrank = require('lexrank');
var news = new NewsAPI('5027ca4ffd74403da5f1568836d4179c');


//function that takes url and creates the summary after reading it
function GetSum(url)
{
  var sum = lexrank.summarizePage(url,7,function (err, sum, text)
  {
    if(err)
      console.log(err);
    else
    {
      //console.log(sum);
      console.log(text);
      //console.log(sum);
    }
  });

}

//API Call to bring in sports news
news.v2.topHeadlines
({
    //Pass in a struct with defined variables
    q: 'Football',
    category: 'sports',
    language: 'en',
    country: 'us'
}).then(response =>
{
  //return a URL that will get read into the lexrank URL
    var url = response.articles[0].url;
    console.log(response.articles[0].url);
    GetSum(url);
})
