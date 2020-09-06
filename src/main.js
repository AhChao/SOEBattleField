var globalVariable = {
	battleStatus : 0,
	redCost : 6,
	redCostDetail : 6,
	mainTimer : "",
	mainTimeSec : 240
}
function init() {
	var faction = "alien";
	displaySimpleCost("alien");
	refreshRedCost();
}
function displaySimpleCost(faction){
	var redArea = document.getElementById('redSimpleButtonArea');
	var costRange = [1,10];
	var innerHtmlText = "";
	for(var i = costRange[0]; i<=costRange[1];i++)
	{
		innerHtmlText += "<button class ='red simple-cost' onclick='minusCost(this.innerHTML)'style='color:#FFF;'>"+i+"</button>"
	}
	redArea.innerHTML = innerHtmlText;
}
function startBattle(){
	if(globalVariable.battleStatus == 1) return;
	globalVariable.mainTimer = setInterval(secondPass, 1000);
	globalVariable.battleStatus = 1;
	document.getElementById("startBattleBtn").classList.add("disabled");
}
function resetBattle(){
	globalVariable.mainTimeSec = 240;
	globalVariable.redCost = 6;
	globalVariable.redCostDetail = 6;
	globalVariable.battleStatus = 0;
	document.getElementById("startBattleBtn").classList.remove("disabled");
	clearInterval(globalVariable.mainTimer);
	refreshRedCost();
	refreshTimerText();
}
function secondPass(){
	if (globalVariable.redCost < 10)
	{ 
		globalVariable.redCostDetail += energyPerSecond(); 
		globalVariable.redCost = Math.floor(globalVariable.redCostDetail);
	}
	globalVariable.mainTimeSec -=1;
	refreshTimerText();
	refreshRedCost();
	if(globalVariable.mainTimeSec <= 0 ) clearInterval(globalVariable.mainTimer);
}
function energyPerSecond()
{
	var baseEnergy = 0.25;
	var timeStep = [240,180,120,60];
	var multiStep = [1,1.5,2,2.5];
	for(var i in timeStep)
	{
		if (timeStep[i]>=globalVariable.mainTimeSec) continue;
		return multiStep[i] * baseEnergy;
	}
}
function minusCost(num){
	globalVariable.redCostDetail -= num ;
	globalVariable.redCost -= num ;
	refreshRedCost();
}
function refreshRedCost()
{
	var costBar = document.getElementsByClassName('progress')[0];
	costBar.setAttribute('style', "background : linear-gradient(90deg, #b71c1c "+globalVariable.redCost*10 + "%, #FFF "+globalVariable.redCost*10+"% );");
	document.getElementById("redSimpleCostValue").innerHTML = globalVariable.redCost;
}
function refreshTimerText()
{
	document.getElementById("timerText").innerHTML = Math.floor(globalVariable.mainTimeSec/60) +":"+(globalVariable.mainTimeSec%60).toString().padStart(2, "0");
}