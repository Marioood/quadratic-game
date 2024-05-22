//logic shared between the simple and complex problems
function setup() {
	const f1 = document.getElementById("f1");
	const f2 = document.getElementById("f2");
	
	f1.addEventListener("input", updateSmp);
	f2.addEventListener("input", updateSmp);
	this.addEventListener("keydown", event => {
		//check the answer if enter is pressed
		if(event.keyCode == 13) {
			checkAnswer();
		}
	});
	//firefox doesnt clear input boxes when the page is reloaded
	f1.value = "";
	f2.value = "";
	
	updateSmp();
	updateStd();
	createFactorTable();
	createHelpTable();
}

function addInsert(num) {
	if(num == 0) {
		return ``;
	} else {
		return ` ${num > 0 ? "+" : "-"} ${Math.abs(num)}`;
	}
}

function varInsert(num) {
	if(num == 0) {
		return addInsert(num);
	} else if(num == 1) {
		return "x";
	} else {
		return addInsert(num) + "x";
	}
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
			const list = document.createElement("ul");
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

	if(table.style.display == "table") {
		table.style.display = "none";
	} else {
		table.style.display = "table";
	}
}

function createHelpTable() {
	const helpTable = document.getElementById("help-container");
	for(let row = 0; row < 3; row++) {
		const newRow = document.createElement("div");
		for(let dat = 0; dat < 3; dat++) {
			const newInput = document.createElement("input");
			newInput.className = "help-input";
			newInput.type = "number";
			newRow.appendChild(newInput);
		}
		helpTable.appendChild(newRow);
	}
	const sumBox = document.createElement("input");
	sumBox.className = "help-input help-sum";
	sumBox.type = "number";
	helpTable.appendChild(sumBox);
}