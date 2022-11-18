// For Contact Form
function submitData() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let phone_number = document.getElementById("phone_number").value;
	let subject = document.getElementById("subject").value;
	let message = document.getElementById("message").value;

	// console.log(name, email, phone_number, subject, message);

	let link = document.createElement("a");
	link.href = `mailto:${email}?subject=${subject}&body=Halo nama saya ${name}, pesan saya ${message}, silahkan kontak nomor saya di ${phone_number}. Terimakasih.`;
	link.click();
}

// For My Project
let data = [];

function addData(event) {
	event.preventDefault();
	let project_name = document.getElementById("project_name").value;
	let startDate = new Date(document.getElementById("start_date").value);
	let endDate = new Date(document.getElementById("end_date").value);
	let description = document.getElementById("description").value;
	let image_input = document.getElementById("image").files;

	// Validation
	if (project_name == "") {
		return alert("Project Name tidak boleh kosong!");
	} else if (isNaN(startDate)) {
		// Reff: https://stackoverflow.com/questions/64665493/validate-empty-date-input
		return alert("Start Date tidak boleh kosong!");
	} else if (isNaN(endDate)) {
		return alert("End Date tidak boleh kosong!");
	} else if (description == "") {
		return alert("Description tidak boleh kosong!");
	} else if (image_input.length == 0) {
		return alert("Image tidak boleh kosong!");
	}

	// Image
	image = URL.createObjectURL(image_input[0]);

	// For Checkbox
	// Reff: https://www.geeksforgeeks.org/how-to-get-all-checked-values-of-checkbox-in-javascript/
	let technologies = [];
	let technologies_input =
		document.getElementsByClassName("technologies_input");
	for (let i = 0; i < technologies_input.length; i++) {
		if (technologies_input[i].checked) {
			// Hahaha.. Entahlah ini gimana logikanya
			let techIconHTML = `<span class="icon-list">
		<img src="./assets/img/${technologies_input[i].value}.svg" alt="Icon" />
	</span>`;
			technologies.push(techIconHTML);
		}
	}
	// console.log(technologies);

	let project_item = {
		project_name,
		startDate,
		endDate,
		technologies,
		description,
		image,
	};
	data.push(project_item);
	// console.log(data);
	renderProject();
}

function renderProject() {
	document.getElementById("project_list").innerHTML = "";

	for (let i = 0; i < data.length; i++) {
		document.getElementById(
			"project_list"
		).innerHTML += `<div class="list-item">
							<div class="img-wrap">
								<img
									src="${data[i].image}"
									alt="Image"
									class="image"
								/>
							</div>
							<h3 class="title"><a href="./project-detail.html">${data[i].project_name}</a>
							</h3>
							<span class="duration">${distanceDate(
								data[i].endDate,
								data[i].startDate
							)}</span>
							<p class="description">${data[i].description}</p>
							<div class="technologies">
							${data[i].technologies.join(" ")}
							</div>
							<div class="action">
								<a class="btn edit" href="#!" class="btn"
									>Edit</a
								>
								<a class="btn delete" href="#!" class="btn"
									>Delete</a
								>
							</div>
						</div>`;
	}
}
function distanceDate(endDate, startDate) {
	let distance = endDate - startDate; // in millisecond

	let distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30);
	let distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24);

	if (distanceMonth > 0) {
		if (distanceDay % 30 >= 1) {
			return `${distanceMonth} month ${distanceDay % 30} days`;
		}
		return `${distanceMonth} month`;
	} else if (distanceDay > 0) {
		return `${distanceDay} days`;
	} else {
		return `0 days`;
	}
}
