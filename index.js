const fs = require('fs')

const aleko = fs.readFileSync('aleko.txt', 'utf8')
const zahari = fs.readFileSync('zahari.txt', 'utf8')
const input = fs.readFileSync('input.txt', 'utf8')
const output = {aleko: 0, zahari: 0}

function countWords(text) {
  var wordArr = text.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '').split(' ')

  const res = {}

  wordArr.forEach(word => {
    word = word.toLowerCase()
    if (res[word]) res[word] += 1
    else res[word] = 1
  });

  return res
}

function calssify() {
  const alekoMap = countWords(aleko)
  const zahariMap = countWords(zahari)
  const inputMap = countWords(input)

  let res = {aleko: 0, zahari: 0}

  Object.keys(inputMap).forEach(curr => {
		if (!alekoMap[curr] && !zahariMap[curr]) {
      return
    }

    if (!alekoMap[curr]) {
			res.zahari += 2
			return
		}

    if (!zahariMap[curr]) {
			res.aleko += 2
			return
		}

    if (alekoMap[curr] < zahariMap[curr]) res.zahari++
    else if (alekoMap[curr] > zahariMap[curr]) res.aleko++
		else {
			res.aleko++
			res.zahari++
		}
  });

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