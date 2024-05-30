const {
	app
} = require("./server.config");

const {
	withDBRead,
	updateDB
} = require("./utils")


app.get("/", (req, res) => {
	withDBRead(res, (data) => {
		res.render("index", {
			movies: data.movies
		})
	})
})

app.get("/movies/:id", (req, res) => {
	const movieId = req.params.id;
	withDBRead(res, (data) => {
		const movie = data.movies.find(item => item.id === movieId);

		if(!movie) {
			return res.redirect("/")
		}

		res.render("movie", { movie })
	})
})

app.get("/add", (req, res) => {
	res.render("add")
})
app.post("/add", (req, res) => {
	const formData = req.body;
	const timestamp = new Date().getTime();

	const fields = ['title', 'genre', 'duration', 'director', 'year'];

	for(const key in formData) {
		if(!fields.includes(key)) {
			return res.status(400).json({ message: "Некоректні поля!" })
		}
	}

	withDBRead(res, ({ movies }) => {
		movies.push({
			id: timestamp.toString(),
			...formData
		})

		updateDB(movies)

		return res.status(200).json({ message: "Фільм успішно створено!" })
	})
})

app.delete("/delete/:id", (req, res) => {
	const movieId = req.params.id;

	withDBRead(res, ({ movies }) => {
		const movieIndex = movies.findIndex(item => item.id === movieId);

		if(movieIndex === -1) {
			return res.status(400).json({ message: "Фільм не існує!" })
		} else {
			const newMovieList = movies.filter(item => item.id !== movieId);

			updateDB(newMovieList)

			return res.status(200).json({ message: "Фільм успішно видалено!" })
		}
	})

})