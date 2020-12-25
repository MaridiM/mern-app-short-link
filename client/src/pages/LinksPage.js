import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks'
import { AuthContext } from '../context'
import { Loader, LinksList } from '../components'

const LinksPage = () => {
    const { request, loading } = useHttp()
    const [ links, setLinks ] = useState([])
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (error) {}
    }, [request, token])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && <LinksList links={links} />}
        </>
    )
}

export default LinksPage
