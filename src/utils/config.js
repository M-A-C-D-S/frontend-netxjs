
export const api = "http://localhost:5000"

export const requestConfig = (method, data, token = null, image)=>{
    let config

    if(image){
        config={
            method,
            body: data,
            headers: {},
        }
    } else if(method === "DELETE" || data === null){
        config = {
            method,
            headers: {},
            }
        } else {
            config = {
                method,
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}