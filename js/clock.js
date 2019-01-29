const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

let secPosition = 0;

const circle = document.querySelector("#circleMarker");

let turnClockRed = () => {
	circle.classList.add("circle-red");
	circle.classList.remove("circle");
}

let turnClockWhite = () => {
	circle.classList.add("circle");
	circle.classList.remove("circle-red");
}

let shakeClock = () => {
	circle.classList.add("clock-explosion");
}

let removeShakeClock = () => {
	circle.classList.remove("clock-explosion");
}

let resetClock = () => {
	turnClockWhite();
	secPosition = 0;
	removeShakeClock();
}

function runTheClock() {

	secPosition = secPosition + 2;

	HOURHAND.style.transform = "rotate("+ secPosition + "deg)";
	MINUTEHAND.style.transform = "rotate("+ secPosition + "deg)";
	SECONDHAND.style.transform = "rotate("+ secPosition + "deg)";

	if(secPosition > 275 && secPosition < 300){
		turnClockRed();
	}else if(secPosition >= 300){
		shakeClock();
		turnClockRed();	
	}else{
		turnClockWhite();
	}
}
