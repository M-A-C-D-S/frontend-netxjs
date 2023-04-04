export const frontEndRedirect = (redirectTo) =>{
    if(typeof window === 'undefined') return

    const newPath = redirectTo || encodeURI(window.location.pathname)

    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN}/?redirect=${newPath}`

    return null
}