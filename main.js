async function deleteMovie( id ) {
	try {
		const res = await fetch(`/delete/${id}`, {
			method: "DELETE"
		})

		const json = await res.json()

		if(res.ok) {
			return location.reload()
		} else {
			return alert("Помилка! " + json.message)
		}

	} catch (e) {
		alert(e.message)
	}
}

async function createMovie(data) {
	try {
		const res = await fetch("/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		const json = await res.json()

		if(res.ok) {
			return location.href = "/"
		} else {
			return alert("Помилка! " + json.message)
		}
	} catch (e) {
		alert(e.message)
	}
}

$(document).ready(function() {
	$(".movieDeleteButton").click( async function(){
		const movieId = $(this).data("movie-id");
		await deleteMovie(movieId);
	});

	$(".singleMovieDeleteButton").click( async function() {
		const movieId = $(this).data("movie-id");
		await deleteMovie(movieId)
	})

	$("#createMovieForm").submit( async function(e) {
		e.preventDefault()

		const formData = new FormData(e.target)
		let formDataObj = {};

		formData.forEach((value, key) => {
			formDataObj[key] = value
		})

		await createMovie(formDataObj)
	})
});