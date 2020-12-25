import { useCallback } from 'react'

export const useMessage = () => {
    return useCallback( text => {
        if (window.M && text) {

            // window.M появляется из materialize-ui
            // .toast -> позволяет  выдавать  модальное окно  сообщением

            window.M.toast({html: text})
        }
    }, [])
    // [] набор  зависимостей
}
