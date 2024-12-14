// Settings
const sheetId = "1AGfkydWzyDFXXhp1UVum4y11c1hoXl2ZF1pAZLle8BA";
const sheetTab = "工作表1";

// Container is the element that will hold the data
let container = document.getElementById("data");

// Class that gets applied to each item
let itemClass = "item";

// Other Settings
const sheet = "https://opensheet.vercel.app/" + sheetId + "/" + sheetTab;
let output = "";

fetch(sheet)
	.then((res) => res.json())
	.then((data) => {
		data.forEach((row) => {
			// Get Data from each row...
			var country = row.Country;
			var population = row.Population;
			var land = row["Land Area"];
			var density = row.Density;

			// HTML Component
			var itemHtml = `
				<div data-label="Country">${country}</div>
				<div data-label="Population">${population}</div>
				<div data-label="Land Area">${land}</div>
				<div data-label="Density">${density}</div>
				`;

			// Convert Line Breaks
			itemHtml = itemHtml.replace("\n", "<br />");
			output += '<div class="' + itemClass + '">' + itemHtml + "</div>";
		});

		// Render Data
		container.innerHTML = output;
	});


    