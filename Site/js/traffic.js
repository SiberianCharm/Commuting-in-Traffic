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

HHH.WireUpDialog = function(){
	$( "#dialog" ).dialog({
		 autoOpen: false,
		 width: "900px"
			});
		
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
	HHH.WireUpDialog();
	HHH.LoadQuestion(questionID);
	HHH.LoadOptions(questionID);
}


HHH.LoadQuestion = function(questionID){
	var question = jlinq.from(HHH.Data.questions)
	.equals("ID", questionID.toString())
	.select();
	$("#question").html('<div class="inside clearfix"><p class="large heading">' + question[0].question_heading + '</p><p>' + question[0].question_content + '</p></div><div class="options"></div>');
	var location = question[0].question_location;
	var fact = question[0].question_fact;
	HHH.setIcon(location);
	HHH.LoadFact(fact);
	//HHH.setProgress(location);
}

HHH.setIcon = function(locationID){
		console.log(locationID)
		var location = jlinq.from(HHH.Data.locations)
		.equals("ID", locationID)
		.select();
		$("#icon").html("<img src='style/images/icons/big/" + location[0].location_icon + ">");
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

HHH.LoadFact = function(factID){
	var fact = jlinq.from(HHH.Data.facts)
	.equals("ID", factID)
	.select();
	console.log(fact[0].fact_did_you_know_short);
	$("#fact").children("div").children()[2].innerHTML= fact[0].fact_did_you_know_short + ' <br /><br/><button class="button heading" id="show_modal">Learn more</button>';
	$("#fact_image").attr("src", fact[0].fact_thumbnail);
	console.log(fact[0].fact_anecdote_header, fact[0].fact_anecdote)
	$("#fact_anectdote_header").html(fact[0].fact_anecdote_header);
	$("#fact_anectdote_header").next("p").html(fact[0].fact_anecdote);
	$("#fact_image_learnmore").next("p").val(fact[0].fact_did_you_know_long);
	$("#fact_image_learnmore").attr("src", fact[0].fact_image);
	$(".heading.learn_more").html(fact[0].fact_did_you_know_short);
	$( "#show_modal" ).live("click", function() {
		$( "#dialog" ).dialog( "open" );
		});
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


