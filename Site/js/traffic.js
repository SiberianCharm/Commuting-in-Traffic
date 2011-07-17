


HHH = {};
HHH.Data = {};
///URL


//Object Methods

HHH.LoadGame = function(){
	HHH.PopulatePage(1);	
}

HHH.OptionClick = function(){
	var nextQuestionID = $(this).id().split("_")[1];
	
}


HHH.GetData = function(){
	$.ajax({
		url: "http://izzycjohnston.com/gdihhh/php/cit_json.php",
		dataType: "json",
		crossDomain: "true",
		success: function(data){
			HHH.Data = data;
			console.log(data);
			HHH.LoadGame();
		}
	}) 
}();



//Page Utils

HHH.MouseOverQuestion = function(){

	$("#question").children("button").mouseover(function()
	{
		$(this).toggleClass("highlight");
	});
}

HHH.MouseOverMenu = function(){

	$(".heading").children("button").mouseover(function()
	{
		$(this).toggleClass("menu-highlight");
	});
}

HHH.Transition = function(){
//Transition animation
	$(".photo").fadeOut();
	$(".photo").attr("src", "new url");
	$(".photo").fadeIn();
}


HHH.PopulatePage = function(questionID){
	HHH.LoadQuestion(questionID);
	HHH.LoadOptions(questionID);
	HHH.LoadFact(questionID);
}


HHH.LoadQuestion = function(questionID){
	var question = jlinq.from(HHH.Data.questions)
	.equals("ID", questionID)
	.select();
	$("#question").val('<div class="inside clearfix"><p class="large heading">' + question.question_heading + "</p><p>" + question.content + "</p></div>");
	var location = question.question_location;
	HHH.setIcon(location);
	HHH.setProgress(location);
}

/*HHH.setIcon = function(locationID){
	var location = jlinq.from(HHH.Data.locations)
	.equals("ID", locationID)
	$("#icon").val('<img src="'+ locations.location_icon + "'/>");
}*/

HHH.LoadOptions = function(questionID){
	var options = jlinq.from(HHH.Data.options)
	.equals("option_question", questionID)
	.select();
	for(i=0; i < options.length; i++)
	{
<<<<<<< HEAD
		$(".options").append('<div id="opt_'+ option.option_next_question + 'class="button" onclick="HHH.OptionClick"><span>' option.name + '</span> <br />' + option.about + '</div>' );
=======
		console.log($("#question").children(".options"));
		$("#question").children(".options").append('<div id="opt_'+ option[i].option_next_question + '" class="button" onclick="HHH.OptionClick"><span>' + option[i].option_name + '</span> <br />' + option[i].option_about + '</div>' );
>>>>>>> 7340001211a38f78a618018f40b1d4d7e0595f70
	}
}

HHH.LoadFact = function(questionID){
	var fact = jlinq.from(HHH.Data.facts)
	.equals("fact_question", questionID)
	.select();
<<<<<<< HEAD
	$(".inside").children("p").val(fact.anecdote);
}

HHH.getProgress = function (questionID){
	var progressIcon = 
=======
	console.log(fact[0].fact_did_you_know_short);
	$("#fact").children("div").children()[2].innerHTML= fact[0].fact_did_you_know_short;
	$("#fact_image").attr("src", fact[0].fact_thumbnail);
>>>>>>> 7340001211a38f78a618018f40b1d4d7e0595f70
}

//Google Analytics tracking
var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-19096645-3']);
 _gaq.push(['_trackPageview']);

 (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();









