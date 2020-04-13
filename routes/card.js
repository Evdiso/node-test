const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    const cardCourse = new Card(course.title, course.price, course.size || 1, course.id)
    await Card.add(cardCourse)
    res.redirect('/courses')
});

module.exports = router