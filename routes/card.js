const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const card = await Card.getAll()
    const coast = card.reduce((accumulator, currentValue) => accumulator + currentValue.size * +currentValue.price, 0)
    const allCard = {
        card: card,
        coast: coast
    }
    
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        allCard
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    const cardCourse = new Card(course.title, course.price, course.size || 1, course.id)
    await Card.add(cardCourse)
    res.redirect('/courses')
});

module.exports = router