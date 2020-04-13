const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Card {
	constructor(title, price, size, id) {
		this.title = title
		this.price = price
		this.size = size
		this.id = id
	}

	static async add(course) {
		let card = await Card.getAll()
		let idx = null;
		if (card.length) {
			idx = card.findIndex(item => item.id === course.id)
		}
		console.log(idx);
		
		if (idx === -1) { 
			card.push(course) 
		} else {
			card = card.map(item => {
				if (item.id === course.id) {
					item.size = item.size + course.size
				}
				return item
			})
		}

		return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        JSON.stringify(card),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
	}

	static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
}

module.exports = Card