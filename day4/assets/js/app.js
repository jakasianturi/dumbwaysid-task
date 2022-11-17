let data = [];

function addData(event) {
	event.preventDefault();
	let project_name = document.getElementById("project_name").value;
	let description = document.getElementById("description").value;

	// For Checkbox
	// Reff: https://www.geeksforgeeks.org/how-to-get-all-checked-values-of-checkbox-in-javascript/
	let technologies_input =
		document.getElementsByClassName("technologies_input");
	let technologies = [];
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

	// Image
	let image_input = document.getElementById("image").files;
	if (image_input.length > 0) {
		image = URL.createObjectURL(image_input[0]);
	}
	let project_item = {
		image,
		project_name,
		technologies,
		description,
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
							<h3 class="title">${data[i].project_name}</h3>
							<span class="duration">Duration: 3 Month</span>
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
