import React, { useState, useEffect, useContext } from 'react'

import { useHttp, useMessage } from '../hooks'
import { AuthContext } from '../context/'

const AuthPage = () => {
    const auth = useContext(AuthContext) // Подключаем контекст
    const message = useMessage()
    const { loading, error, request, clearError }  = useHttp()

    const [ form, setForm ] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        // Делает активной форму
        window.M.updateTextFields()
    }, [])


    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form})
            message(data.message)
        } catch (error) {}
    }


    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId) //передаем в  контекст  даные из бд
        } catch (error) {}
    }

    return (
        <div className="row">
            <div className='col s6 offset-s3'>
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="E-Mail" 
                                    id="email" 
                                    type="text" 
                                    name='email'
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">E-Mail</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="Пароль" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                            >Войти</button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >Регистрация</button>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default AuthPage
