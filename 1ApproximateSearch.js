const fs = require('fs');
const readline = require('readline');
const levenshtein = require('fast-levenshtein');

// Read and parse words from a file (assumes one word per line)
function loadWordsFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data.split(/\r?\n/).map(word => word.trim()).filter(word => word.length > 0);
    } catch (err) {
        console.error('Error reading file:', err);
        process.exit(1);
    }
}

// Find top K closest matches based on Levenshtein distance
function findClosestMatches(inputWord, words, k = 3) {
    const distances = words.map(word => ({
        word,
        distance: levenshtein.get(inputWord, word)
    }));

    // Sort words based on distance (lower is better)
    distances.sort((a, b) => a.distance - b.distance);

    return distances.slice(0, k).map(entry => entry.word);
}

// Interactive command-line interface
function startInteractiveSearch(words) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Type a word and press Enter to find similar words. Type 'exit' to quit.");

    rl.on('line', (input) => {
        const trimmedInput = input.trim().toLowerCase();
        if (trimmedInput === 'exit') {
            rl.close();
            return;
        }

        const matches = findClosestMatches(trimmedInput, words);
        console.log("Suggestions:", matches.join(', ') || "No matches found.");
    });

    rl.on('close', () => {
        console.log("Goodbye!");
        process.exit(0);
    });
}

// Load words and start interactive search
const words = loadWordsFromFile('words.txt');  // Ensure this file exists with a list of words
startInteractiveSearch(words);