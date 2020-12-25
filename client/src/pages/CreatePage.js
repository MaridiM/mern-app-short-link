import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks'
import { AuthContext } from '../context'


const CreatePage = () => {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const history = useHistory()
    const [ link, setLink ] = useState('')

    useEffect(() => {
        // Делает активной форму
        window.M.updateTextFields()
    }, [])

    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',                   // путь запроса
                    'POST',                                 // метод  запроса
                    { from: link },                          // Данные
                    { Authorization: `Bearer ${auth.token}` } // Headers
                )

                history.push(`/detail/${data.link._id}`)
            } catch (error) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}> 
                <div className="input-field">
                    <input 
                        placeholder="Вставьте  ссылку" 
                        id="link" 
                        type="text" 
                        name="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
