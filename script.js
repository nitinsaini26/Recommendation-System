const movies = [
    {
        title: "Inception",
        genres: ["Sci-Fi", "Action", "Thriller"],
        director: "Christopher Nolan",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
        title: "The Dark Knight",
        genres: ["Action", "Crime", "Drama"],
        director: "Christopher Nolan",
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
        title: "Pulp Fiction",
        genres: ["Crime", "Drama"],
        director: "Quentin Tarantino",
        actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    },
    {
        title: "Forrest Gump",
        genres: ["Drama", "Romance"],
        director: "Robert Zemeckis",
        actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
    },
    {
        title: "Interstellar",
        genres: ["Sci-Fi", "Drama", "Adventure"],
        director: "Christopher Nolan",
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    {
        title: "Django Unchained",
        genres: ["Drama", "Western"],
        director: "Quentin Tarantino",
        actors: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"]
    },
    {
        title: "The Shawshank Redemption",
        genres: ["Drama"],
        director: "Frank Darabont",
        actors: ["Tim Robbins", "Morgan Freeman"]
    },
    {
        title: "Spirited Away",
        genres: ["Animation", "Adventure", "Family"],
        director: "Hayao Miyazaki",
        actors: ["Rumi Hiiragi", "Miyu Irino"]
    },
    {
        title: "Parasite",
        genres: ["Comedy", "Drama", "Thriller"],
        director: "Bong Joon-ho",
        actors: ["Song Kang-ho", "Choi Woo-shik", "Park So-dam"]
    },
    {
        title: "Arrival",
        genres: ["Sci-Fi", "Drama", "Mystery"],
        director: "Denis Villeneuve",
        actors: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"]
    }
];

const genresInput = document.getElementById('genres');
const directorsInput = document.getElementById('directors');
const actorsInput = document.getElementById('actors');
const recommendButton = document.getElementById('recommendButton');
const resultsContainer = document.getElementById('resultsContainer');

function normalizeInput(input) {
    return input.split(',')
        .map(i => i.trim().toLowerCase())
        .filter(i => i !== '');
}

function calculateMatchScore(movie, userPrefs) {
    let score = 0;

    userPrefs.genres.forEach(pref =>
        movie.genres.some(g => g.toLowerCase().includes(pref)) && (score += 2)
    );
    userPrefs.directors.forEach(pref =>
        movie.director.toLowerCase().includes(pref) && (score += 3)
    );
    userPrefs.actors.forEach(pref =>
        movie.actors.some(a => a.toLowerCase().includes(pref)) && (score += 1)
    );

    return score;
}

function displayRecommendations(recommendations) {
    resultsContainer.innerHTML = '';

    if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 text-center">No matches found. Try different keywords.</p>';
        return;
    }

    recommendations.forEach(movie => {
        const card = document.createElement('div');
        card.className = "bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200";

        card.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-900">${movie.title}</h3>
            <p class="text-sm text-gray-600"><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
            <p class="text-sm text-gray-600"><strong>Director:</strong> ${movie.director}</p>
            <p class="text-sm text-gray-600"><strong>Actors:</strong> ${movie.actors.join(', ')}</p>
            <p class="text-xs text-gray-400 mt-2">Match Score: ${movie.score}</p>
        `;
        resultsContainer.appendChild(card);
    });
}

recommendButton.addEventListener('click', () => {
    const userPreferences = {
        genres: normalizeInput(genresInput.value),
        directors: normalizeInput(directorsInput.value),
        actors: normalizeInput(actorsInput.value)
    };

    const scoredMovies = movies.map(movie => ({
        ...movie,
        score: calculateMatchScore(movie, userPreferences)
    }));

    const recommendations = scoredMovies
        .filter(movie => movie.score > 0)
        .sort((a, b) => b.score - a.score);

    displayRecommendations(recommendations);
});

window.onload = () => {
    resultsContainer.innerHTML = '<p class="text-gray-500 text-center">Enter your preferences and click "Get Recommendations" to see suggestions.</p>';
};
