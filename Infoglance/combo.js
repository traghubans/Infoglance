/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 *This skill takes the top headline for whatever category you decide and then summarizes the article
 **/

'use strict';
const Alexa = require('alexa-sdk');
const lexrank = require('lexrank');
const NewsAPI = require('newsapi');
const Q = require('q');
const news = new NewsAPI('5027ca4ffd74403da5f1568836d4179c');



const APP_ID = 'amzn1.ask.skill.f4992d13-a722-49c9-9ee3-884c5ab930d5';
const SKILL_NAME = 'InfoGlance';
const GET_FACT_MESSAGE = "Here's the news: ";
const HELP_MESSAGE = 'Ask me for a quick run down!';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//Get Summary function
function GetSum(url,obj)
{
        //takes in the url and creates a paragraph
        lexrank.summarizePage(url,7,function(err, sum, text)
        {
            if(err)
                console.log(err);
            else
            {
                //Uses the event to invoke response.speak and .emit
                console.log(text);
                obj.response.speak(text);
                obj.emit(':responseReady');
            }
        });


}


//Handlers are the switch statements for alexa programming

const handlers = {
    'LaunchRequest': function ()
    {
        this.emit('GetSummary');
    },
    'GetSummary': function ()
    {
        //API call to return the top headline for whatever query and category you decide
        news.v2.topHeadlines
        ({
            q: 'Football',
            category: 'sports',
            language: 'en',
            country: 'us'
        }).then(response =>
        {
            //Returns URL needed for second API call
            var url = response.articles[0].url;
            console.log(response.articles[0].url);
            //console.log(this);

            //Calls function to return the summarized text
            GetSum(url,this);
        })
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
