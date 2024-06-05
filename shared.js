//non-game || setup logic
let facsHide = false;
function setup() {
	addInputUpdater("f1");
	addInputUpdater("f2");
	addInputUpdater("c1");
	addInputUpdater("c2");
	
	document.getElementById("faccellinput").addEventListener("input", event => {
		const input = Math.abs(document.getElementById("faccellinput").value);
		const output = document.getElementById("faccellcell");
		let error = true;
		let warningTxt;
		
		while(output.firstChild) {
			output.removeChild(output.firstChild);
		}
		//99999900 most entries
		if(input > 1e+8) {
			warningTxt = "number to big";
		} else if(input == 0) {
			warningTxt = "cant do zero";
		} else if(input != Math.round(input)) {
			warningTxt = "number not whole";
		} else {
			arrayToList(factorsOf(input), output);
			error = false;
		}
		
		if(error) {
			const warning = document.createElement("p");
			warning.innerText = warningTxt;
			output.appendChild(warning);
		}
	});
	
	this.addEventListener("keydown", event => {
		//check the answer if enter is pressed
		if(event.keyCode == 13) {
			checkAnswer();
		}
	});
	newProblem();
	updateSmp();
	updateStd();
	createFactorTable();
	createHelpTable();
	toggleFactorTable();
}

function addInputUpdater(id) {
	const element = document.getElementById(id);
	element.addEventListener("input", updateSmp);
	//firefox doesnt clear input boxes when the page is reloaded
	element.value = null;
}

function factorsOf(num) {
	let factors = new Array(1);

	for(let i = 1; i <= num / i; i++) {
		//if the remainder is 0, you can multiply by dat (that % gets the remainder)
		if(num % i == 0) {
			factors.push(`${i} &sdot; ${num / i}`); 
		}
	}

	return factors;
}

function createFactorTable() {
	const FACTOR_TABLE_WIDTH = 10;
	const FACTOR_TABLE_HEIGHT = 10;
	const facList = document.getElementById("faclist");

	for(let row = 0; row < FACTOR_TABLE_HEIGHT; row++) {
		const tableHead = document.createElement("tr");
		for(let head = 1; head <= FACTOR_TABLE_WIDTH; head++) {
			const tableData = document.createElement("th");
			tableData.innerHTML = head + (FACTOR_TABLE_WIDTH * row);
			tableHead.appendChild(tableData);
		}
		facList.appendChild(tableHead);

		const tableRow = document.createElement("tr");
		for(let dat = 1; dat <= FACTOR_TABLE_WIDTH; dat++) {
			const tableData = document.createElement("td");
			//const list = document.createElement("ul");
			arrayToList(factorsOf(dat + (FACTOR_TABLE_WIDTH * row)), tableData);
			tableRow.appendChild(tableData);
		}
		facList.appendChild(tableRow);
	}
}

function randInt(max) {
	return Math.floor(Math.random() * max);
}

function arrayToList(array, element) {
	for(let i = 1; i < array.length; i++) {
		const item = document.createElement("p");
		item.innerHTML = array[i];
		element.appendChild(item);
	}
}

function toggleFactorTable() {
	const table = document.getElementById("table-container");
	const facButton = document.getElementById("fac-button");
	
	if(facsHide) {
		table.className = "table-container";
		facButton.innerText = "Hide Factor Table";
		facsHide = false;
	} else {
		table.className = "hidden";
		facButton.innerText = "Show Factor Table";
		facsHide = true;
	}
}

function createHelpTable() {
	//just manually write this in html, its pointless as js
	const helpTable = document.getElementById("help-container");
	for(let row = 0; row < 3; row++) {
		const newRow = document.createElement("div");
		for(let dat = 0; dat < 3; dat++) {
			const newInput = document.createElement("input");
			newInput.className = "help-input";
			newInput.type = "number";
			newInput.id = `h${dat + 1 + (row * 3)}`;
			newRow.appendChild(newInput);
		}
		helpTable.appendChild(newRow);
	}
	const sumBox = document.createElement("input");
	sumBox.className = "help-input help-sum";
	sumBox.type = "number";
	sumBox.id = "h10";
	helpTable.appendChild(sumBox);
}

function clear() {
	/*const help = document.getElementById("help-container");
	for(const kiddie of help.children) {
		kiddie.value = null;
	}*/
	const set = (id) => {
		const element = document.getElementById(id);
		element.value = null;
	}
	//function inputs
	set("f1");
	set("f2");
	set("c1");
	set("c2");
	updateSmp();
	//help table
	set("h1");
	set("h2");
	set("h3");
	set("h4");
	set("h5");
	set("h6");
	set("h7");
	set("h8");
	set("h9");
	set("h10");
}