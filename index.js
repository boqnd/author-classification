const fs = require('fs')

const aleko = fs.readFileSync('aleko.txt', 'utf8')
const zahari = fs.readFileSync('zahari.txt', 'utf8')
const input = fs.readFileSync('input.txt', 'utf8')
const output = {aleko: 0, zahari: 0}

// this function takes text and returns frequency table for the words in the text.
function countWords(text) {
  // remove special characters from the text, so we can compare only the words. (regex used)
  var wordArr =
    text.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '').
    split(' ')

  const res = {}

  // fill the freq table.
  wordArr.forEach(word => {
    word = word.toLowerCase()
    if (res[word]) res[word] += 1
    else res[word] = 1
  });

  return res
}


function calssify() {
  // take the freq tables of the 3 texts. (two sample texts and input text)
  const alekoMap = countWords(aleko)
  const zahariMap = countWords(zahari)
  const inputMap = countWords(input)

  // object to store result coefficient.
  let res = {aleko: 0, zahari: 0}

  // iterate through the input different words to compare them with the sample freq tables and change the coef accordingly.
  Object.keys(inputMap).forEach(curr => {
    // if the word is not found in both sample texts, nothing happens.
		if (!alekoMap[curr] && !zahariMap[curr]) {
      return
    }

    // if the word is found in only one of the sample texts, the coef of the author is increased with the count of that word in the input text, two times.

    // two times because if it is written by only one of the authors, it's much more likely to be authored by him.
    if (!alekoMap[curr]) {
			res.zahari += 2*inputMap[curr]
			return
		}

    if (!zahariMap[curr]) {
			res.aleko += 2*inputMap[curr]
			return
		}

    // if the word occurs in both sample texts we increase the author coef of the one with more occurences, by the number of occ in the input.
    if (alekoMap[curr] < zahariMap[curr]) res.zahari += inputMap[curr]
    else if (alekoMap[curr] > zahariMap[curr]) res.aleko += inputMap[curr]
		else {
      // if it is equal for both authors, we increase both coef by one.
			res.aleko++
			res.zahari++
		}
  });

  // transform the coefficients into percentages.
  let sum = (res.aleko + res.zahari) || 1
  output.aleko = Math.round( res.aleko / sum * 100 )
  output.zahari = Math.round( res.zahari / sum * 100 )
}

function print() {
  if (output.aleko == output.zahari) {
    console.log("\nThe input can't be classified between Aleko Konstantinov and Zahari Stoyanov.\n")
    return
  }
  console.log(`\nThe input text is ${Math.max(output.aleko, output.zahari)}% more likely to be authored by ${output.aleko > output.zahari ? "Aleko Konstantinov then by Zahari Stoyanov" : "Zahari Stoyanov then by Aleko Konstantinov"}.\n`)
}

(() => {
  calssify()
  print()
})()

     /*
      а а а а в
      б б б б в

      а б б в
      1 2
      2 3

      33 40
      67 60
      */
