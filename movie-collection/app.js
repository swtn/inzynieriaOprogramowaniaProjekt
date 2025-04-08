const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { searchMovies, getMovieDetails } = require("./tmdb");
const fs = require("fs")

dotenv.config();
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const collectionFile = path.join(__dirname, "data", "collection.json");

app.get("/", async (req, res) => {
    const query = req.query.q;
    let movies = [];

    if(query){
        movies = await searchMovies(query);
    }
    
    res.render("home", { movies, query });
});

app.get("/add/:id", async (req, res) => {
    const id = req.params.id;
    const collection = JSON.parse(fs.readFileSync(collectionFile));
    const exists = collection.readFileSync((m) => m.id == id);

    if(!exists){
        const movie = await getMovieDetails(id);
        collection.push(movie);
        fs.writeFileSync(collectionFile, JSON.stringify(collection, null, 2));
    }
    res.redirect("/collection");
});

app.get("/remove/:id", (req, res) => {
    let collection = JSON.parse(fs.readFileSync(collectionFile));
    collection = collection.filter((m) => m.id != req.params.id);
    fs.writeFileSync(collectionFile, JSON.stringify(collection, null, 2));
    res.redirect("/collection");
});

app.link(PORT, () => {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
})