const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const authMiddleware = require('../middlewares/auth.middleware')


//  /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некорректный E-Mail').isEmail(),
        check('password', 'Пароль должен иметь от 6 до 32 символов')
            .isLength({min: 6, max: 32})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({ email })

            if ( candidate ) {
                res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({message: 'Пользователь создан'})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
        }
})

//  /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Некорректный E-Mail').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден'})
        }
         
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова'})
        }
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        

        res.status(200).json({ token, userId: user._id })

    } catch (error) {
         res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
    }
})

//  /api/auth/verify
router.post('/verify', authMiddleware, async (req, res) => {
    try {
        res.status(200).json({message: "Вы авторизованы"})
    } catch (error) {
        res.status(500).json({message: "Что то пошло не так. Попробуйте еще раз"})
    }
})

module.exports = router