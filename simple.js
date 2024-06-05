//game logic
const DEBUG = false;
let aF1, aF2, aC1, aC2;
let pF1 = -4;
let pF2 = 4;
let pC1 = 1;
let pC2 = 3;

function updateSmp() {
	const smp = document.getElementById("smp");
	//thinks im trying to concatenate these when checking the sum when not converted to a numbah
	aF1 = Number(document.getElementById("f1").value);	
	aF2 = Number(document.getElementById("f2").value);
	aC1 = Number(document.getElementById("c1").value);	
	aC2 = Number(document.getElementById("c2").value);
	//this is complicated, but is necessary for pretty equations
	let txt = enclose(`${coefInsert(aC1)}${addInsert(aF1)}`) + enclose(`${coefInsert(aC2)}${addInsert(aF2)}`);
	if(txt == "xx") {
		smp.innerHTML = "x²"
	} else {
		smp.innerHTML = txt;
	}
}

function updateStd() {
	const std = document.getElementById("std");

	std.innerHTML = `${coefInsert(pC1 * pC2)}²${varInsert((pF1 * pC1) + (pF2 * pC2))} ${addInsert(pF1 * pF2)}`;
	if(DEBUG) {
		std.innerHTML += ` : (${coefInsert(pC1)}${addInsert(pF1)})` + `(${coefInsert(pC2)}${addInsert(pF2)})`;
	}
}

function checkAnswer() {
	const sumCorrect = aF1 + aF2 == pF1 + pF2;
	const factorCorrect = (aF1 * aC1) + (aF2 * aC2) == (pF1 * pC1) + (pF2 * pC2);
	const coefCorrect = aC1 * aC2 == pC1;
	let txt;
	let correct = false;
	let wrongList = new Array();
	//maybe change how errors are detected? sometimes "correct" sums are actually wrong
	//also the solver straight up gets stuff wrong
	//problem: 4x² - 42x + 80 || (2x - 16)(2x - 5)
	//answer:  (x - 8)(4x - 10)
	//in desmos, all of these are identical
	
	//TODO: oh my god this is bad rewrite it
	if(sumCorrect && factorCorrect && coefCorrect) {
		txt = "Correct!";
		newProblem();
		updateStd();
		clear();
		correct = true;
	} else {
		if(!factorCorrect) {
			wrongList.push("sum")
			//txt = "Sum is WRONG!"
		}
		if(!sumCorrect) {
			wrongList.push("factor")
			//txt = "Factor is WRONG!"
		}
		if(!coefCorrect) {
			wrongList.push("coefficient");
		}
		
		txt = wrongList.join() + " are WRONG!!!";
	}

	document.getElementById("status").innerHTML = `${txt} ${correct ? "" : "(Retry and submit)"}`;
}

function addInsert(num) {
	if(num == 0) {
		return "";
	}
	return ` ${num > 0 ? "+" : "-"} ${Math.abs(num)}`;
}

function varInsert(num) {
	if(num == 0) {
		return "";
	} else if(num == 1) {
		return "x";
	} else if(num == -1) {
		return "-x"
	}
	return `${addInsert(num)}x`;
}

function coefInsert(num) {
	if(num == 0) {
		return "";
	} else if(num == 1) {
		return "x";
	} else if(num == -1) {
		return "-x"
	}
	return `${num}x`
}

function enclose(insert) {
	if(insert.length < 2) {
		return insert;
	} else {
		return `(${insert})`
	}
}

function newProblem() {
	//only use even numbers, if you use odds the problem nums will be weird decimals
	const MAX_FAC = 64;
	const MIN_FAC = 16;
	const MAX_COEF = 4;
	
	pF1 = randInt(MAX_FAC) - (MAX_FAC / 2);
	pF2 = randInt(MIN_FAC) - (MIN_FAC / 2);
	pC1 = randInt(MAX_COEF);// - (MAX_COEF / 2);
	pC2 = randInt(MAX_COEF);// - (MAX_COEF / 2);
	//coefficients of zero create funky bugs, so just fudge the numbers
	if(pC1 == 0) {
		pC1++;
	}
	if(pC2 == 0) {
		pC2++;
	}
}