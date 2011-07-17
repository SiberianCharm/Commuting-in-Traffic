


HHH = {};
HHH.Data = {};
///URL


//Object Methods

HHH.LoadGame = function(){
	HHH.PopulatePage(1);	
}

HHH.OptionClick = function(){
	var nextQuestionID = this.id.split("_")[1];
	HHH.PopulatePage(nextQuestionID);
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

/*HHH.Transition = function(){
//Transition animation
	$(".photo").fadeOut();
	$(".photo").attr("src", "new url");
	$(".photo").fadeIn();
} */


HHH.PopulatePage = function(questionID){
	HHH.LoadQuestion(questionID);
	HHH.LoadOptions(questionID);
	HHH.LoadFact(questionID);
}


HHH.LoadQuestion = function(questionID){
	var question = jlinq.from(HHH.Data.questions)
	.equals("ID", questionID.toString())
	.select();
	$("#question").html('<div class="inside clearfix"><p class="large heading">' + question[0].question_heading + '</p><p>' + question[0].question_content + '</p></div><div class="options"></div>');
}

HHH.LoadOptions = function(questionID){
	var option = jlinq.from(HHH.Data.options)
	.equals("option_question", questionID.toString())
	.select();
	$("#options").html("");
	for(i=0; i < option.length; i++)
	{
		console.log($("#question").children(".options"));
		$("#question").children(".options").append('<div id="opt_'+ option[i].option_next_question + '" class="button"><span>' + option[i].option_name + '</span> <br />' + option[i].option_about + '</div>' );
		$("#opt_" + option[i].option_next_question).live("click", HHH.OptionClick);
	}
}

HHH.LoadFact = function(questionID){
	var fact = jlinq.from(HHH.Data.facts)
	.equals("fact_question", questionID)
	.select();
	console.log(fact[0].fact_did_you_know_short);
	$("#fact").children("div").children()[2].innerHTML= fact[0].fact_did_you_know_short;
	$("#fact_image").attr("src", fact[0].fact_thumbnail);
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









