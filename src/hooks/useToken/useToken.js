import { useEffect, useState } from "react"

const useToken = email =>{
    const [token, setToken] = useState('')
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [tokenLoading, setTokenLoading] = useState(false)

    
    useEffect(()=>{
        if(email){
            setTokenLoading(true)
            fetch(`https://bookish-server.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data =>{
                setIsInitialRender(false)
                console.log(data)
                if(data.accessToken){
                    setTokenLoading(false)
                    localStorage.setItem('accessToken', data.accessToken);
                    setToken(data.accessToken)
                }
                
            })
        }
    },[email, isInitialRender])
    return [token, tokenLoading]
}

export default useToken