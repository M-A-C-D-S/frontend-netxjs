export const serverSideRedirect = (ctx,redirect)=>{
    const newPath = redirect || encodeURI(ctx.resolvedUrl)

    return {
        props: {},
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_LOGIN}/?redirect=${newPath}`,
          permanent: false
        }
      }
}