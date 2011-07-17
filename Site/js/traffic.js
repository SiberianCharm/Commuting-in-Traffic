


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
	$("#question").html('<div class="inside clearfix"><p class="large heading">' + question[0].question_heading + '</p><p>' + question[0].question_content + '</p></div>');
}

HHH.LoadOptions = function(questionID){
	var option = jlinq.from(HHH.Data.options)
	.equals("option_question", questionID.toString())
	.select();
	$("#options").html("");
	for(i=0; i < option.length; i++)
	{
		console.log("you are in here", option[i].option_name);
		$("#options").append('<div id="opt_'+ option[i].option_next_question + 'class="button" onclick="HHH.OptionClick"><span>' + option[i].option_name + '</span> <br />' + option[i].option_about + '</div>' );
	}
}

HHH.LoadFact = function(questionID){
	var fact = jlinq.from(HHH.Data.facts)
	.equals("fact_question", questionID)
	.select();
	$(".inside").children("p").val(fact.anecdote);
}











