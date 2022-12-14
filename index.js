const fs = require('fs')

const aleko = fs.readFileSync('aleko.txt', 'utf8')
const zahari = fs.readFileSync('zahari.txt', 'utf8')
const input = fs.readFileSync('input.txt', 'utf8')

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

    const alekoFreq = inputMap[curr] / alekoMap[curr]
    const zahriFreq = inputMap[curr] / zahariMap[curr]

    if (alekoFreq < zahriFreq) res.zahari++
    else if (alekoFreq > zahriFreq) res.aleko++
		else {
			res.aleko++
			res.zahari++
		}
  });

  return res;
}


console.log(calssify());
