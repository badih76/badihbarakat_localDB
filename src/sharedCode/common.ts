export const GetHostURL = () => {
    const env = process.env.NODE_ENV;

    if(env == 'development') return process.env.DEV_HOST_URL;
    else return process.env.PROD_HOST_URL;
}