const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

rl.question("Enter a string: ", (input) => {
    if (isPalindrome(input)) {
        console.log(`The string '${input}' is a palindrome.`);
    } else {
        console.log(`The string '${input}' is not a palindrome.`);
    }
    rl.close();
});