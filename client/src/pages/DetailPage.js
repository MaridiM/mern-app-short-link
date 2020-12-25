import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, LinkCard } from '../components'
import { AuthContext } from '../context'

import { useHttp } from '../hooks'

const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [ link, setLink ] = useState(null)
    const linkId = useParams().id // Берет  значение из роута /link/:id
    
    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, "GET", null, {Authorization: `Bearer ${token}`})
            setLink(fetched)
        } catch( error ) {}
    }, [token, request, linkId])


    useEffect(() => {
        getLink()
    }, [getLink])

    if( loading ) {
        return <Loader />
    }
    return (
        <>
            { (!loading && link) && <LinkCard link={ link } /> }   
        </>
    )
}

export default DetailPage
