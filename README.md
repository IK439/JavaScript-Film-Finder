# JavaScript-Film-Finder

## Description

Film Finder is an interactive web app that allows users to discover random movies based on their preferred genre using the TMDB API.
Users can:

* Select a movie genre from a dropdown.
* Get a random movie with poster, title, release date, cast, and overview.
* Like or dislike movies to keep track of favorites and avoid repeats.

The app uses JavaScript to fetch data dynamically, display movie details, and manage user interactions.

## Coding Techniques

* **API Integration:** Fetches genres, movies, detailed info, and cast from the TMDB API.
* **DOM Manipulation:** Dynamically creates and updates HTML elements for movies and lists.
* **Event Handling:** Handles user interactions with buttons, dropdowns, and forms.
* **Randomization:** Selects random movies from API results for variety.
* **State Management:** Maintains liked and disliked movies arrays and renders them dynamically.
* **Modular Code:** Separates helper functions and main logic into distinct JS files.
* **Responsive Styling:** Uses CSS for layout, typography, and visual appeal.

## File Structure

```
index.html     - Main HTML structure of the app with dropdown, buttons, and containers for movie info.
style.css      - CSS file controlling layout, colors, fonts, and button styles.
script.js      - Main JavaScript file handling TMDB API requests, random movie selection, and display logic.
helpers.js     - Helper functions for dropdown population, display creation, and managing liked/disliked movies.
```

## Example Output

### Movie Display

After selecting a genre and clicking "Let's Play!", a random movie is displayed with:

* Poster image
* Title
* Release Date
* Top 5 cast members
* Movie overview

Users can then click 👍 Like or 👎 Dislike to add the movie to their respective lists.

### Liked and Disliked Movies

```
👍 Liked Movies
- Inception
- The Dark Knight

👎 Disliked Movies
- Twilight
- Cats
```

## Getting Started

1. Create a TMDB account and generate an API key.
2. Insert your TMDB API key into `script.js` at the `tmdbKey` variable.
3. Open `index.html` in a browser.
4. Select a genre and click "Let's Play!" to start discovering movies.
5. Use the 👍 and 👎 buttons to keep track of liked and disliked movies.
