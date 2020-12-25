
const router = require('express').Router()
const shortid = require('shortid')

const Link = require('../models/link.model')
// authMiddleware = из  токена вытаскиваем userId который заложили при авторизации
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const BASE_URL = process.env.BASE_URL
        const { from } = req.body

        const code = shortid.generate() // Генерирует код
        
        // проверка наличия ссылки в бд
        const existing = await Link.findOne({ from })
        
        if( existing ) {
            return res.status( 200 ).json({link: existing})
        }
        
        const to = BASE_URL + '/t/' + code
        // /t/ -> сокращено  to
        
        const link = new Link({
            code, to, from, owner: req.user.userId // Получаем req.user.userId из authMiddleware
        })
        await link.save()
        
        return res.status(201).json({ link })

    } catch (error) {
         res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId}) // Получаем req.user.userId из authMiddleware
        res.status(200).json(links)

    } catch (error) {
         res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
    }
})



router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) 

        res.status(200).json(link)

    } catch (error) {
         res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
    }
})

module.exports = router