var watson = require('watson-developer-cloud');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

var app = express();
var personality_insights = new PersonalityInsightsV3({
   username: '8e6e7927-3343-491b-9932-81a81835f4a5',
   password: 'XgTNfJyoEkIt',
   version_date: '2016-10-20'
});

// Setup static public directory
app.use(express.static(path.join(__dirname , './public')));
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/pi-analyze', function(req, res) {
 
console.log("### Input BODY is: " + JSON.stringify(req.body));
console.log("### Input Text is: " + req.body.text);

var contentItems = Array();
contentItems[0] = {
	 "content": req.body.text, 
	 "contenttype": "text/plain", 
	 "created": 1447639154000,
	 "id": "666073008692314113",
	 "language": "ja"
 };

var params = {
  // Get the content items from the JSON file.
  content_items: contentItems,
  consumption_preferences: true,
  raw_scores: true,
  headers: {
    'accept-language': 'ja',
    'accept': 'application/json'
  }
};

personality_insights.profile(params, function(error, response) {
  if (error)
    console.log('Error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
       res.header("Content-Type", "application/json; charset=utf-8");
       res.send(response);
  }
);
});


// 安倍首相所信表明抜粋
var st =  "世界一への執念。";
 st = st + "歴代最多のメダルラッシュとなったリオ五輪では、世界の強豪たちに真っ向勝負を挑み、最後の一瞬まで勝利を諦めない選手たちの姿に、日本中が感動しました。";
 st = st + "四年後の東京オリンピック・パラリンピックは、必ずや、世界一の大会にする。何としても、成功させなければなりません。同時に、我が国の「未来」を切り拓く。私たちもまた、世界一暮らしやすい国、世界一信頼される国を目指し、新たなスタートを切る時です。";
 st = st + "参議院選挙で、自由民主党と公明党の連立与党は、目標の改選過半数を大きく上回る勝利を得ることができました。";
 st = st + "「この道を、力強く、前へ」";
 st = st + "これが、選挙で示された国民の意思であります。安定的な政治基盤の上に、しっかりと結果を出していく。国民の負託に応えていく決意であります。";
 st = st + "この国会に求められていることは、目の前の課題から逃げることではありません。挑戦です。いかに困難な課題にもチャレンジし、建設的な議論を行って「結果」を出すことであります。";
 st = st + "一億総活躍、地方創生、農政新時代、そして地球儀を俯瞰する外交。安倍内閣は「未来」への挑戦を続けます。世界の真ん中で輝く、日本の「未来」を、皆さん、共に切り拓いていこうではありませんか。";

app.get('/', function(req, res) {

var personality_insights = watson.personality_insights({
   username: '8e6e7927-3343-491b-9932-81a81835f4a5',
   password: 'XgTNfJyoEkIt',
  version: 'v2'
});

console.log("### Input Text is: " + st);

personality_insights.profile({
   text: st,
   content_type:'text/plain',
   language:'ja',
   accept_language:'ja'
   },
   function (err, response) {
     if (err)
       console.log('error:', err);
     else
       console.log(JSON.stringify(response, null, 2));
       res.send('### Response from PI:' + JSON.stringify(response, null, 2));
 }); 
 }); 

var port = process.env.PORT || 3000;
app.listen(port);
console.log("### Start listening on port " + port);
