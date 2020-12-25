import React from 'react'
import { Link } from 'react-router-dom'

const LinksList = ({links}) => {
    if (!links) { 
        return <p>У вас нет ссылок</p>
    }
    return (
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Оригинальная</th>
              <th>Сокращенная</th>
              <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
        { 
            links && links.map( (link, i) => { 
                return ( 
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Открыть</Link>
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
      </table>
    )
}

export default LinksList
