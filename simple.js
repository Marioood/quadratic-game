//game logic

let ansFac1, ansFac2;
let probFac1 = 4;
let probFac2 = -8;

function updateSmp() {
	const smp = document.getElementById("smp");
	//thinks im trying to concatenate these when checking the sum when not converted to a numbah
	ansFac1 = Number(document.getElementById("f1").value);	
	ansFac2 = Number(document.getElementById("f2").value);
	//if an x is alone, there shouldn't be parenthesis (just so it looks nicer)
	smp.innerHTML = `(x${addInsert(ansFac1)})(x${addInsert(ansFac2)})`;
}


function updateStd() {
	const std = document.getElementById("std");

	std.innerHTML = `x²${varInsert(probFac1 + probFac2)} ${addInsert(probFac1 * probFac2)}`;
}

function checkAnswer() {
	const MAX_PROBLEM = 64;
	const MIN_PROBLEM = 16;
	let sumCorrect = ansFac1 + ansFac2 == probFac1 + probFac2;
	let factorCorrect = ansFac1 * ansFac2 == probFac1 * probFac2;
	let txt;
	let correct = false;
	//maybe change how errors are detected? sometimes "correct" sums are actually wrong
	if(sumCorrect && factorCorrect) {
		txt = "Correct!";
		probFac1 = Math.round(randInt(MAX_PROBLEM) - (MAX_PROBLEM / 2));
		probFac2 = Math.round(randInt(MIN_PROBLEM) - (MIN_PROBLEM / 2));
		updateStd();
		correct = true;
	} else if (!sumCorrect && factorCorrect) {
		txt = "Sum is WRONG!"
	} else if(!factorCorrect && sumCorrect) {
		txt = "Factor is WRONG!"
	} else {
		txt = "Factor and sum are both WRONG!!!";
	}

	document.getElementById("status").innerHTML = `${txt} ${correct ? "" : "(Retry and submit)"}`;
}