/**
 * 去掉多余的/
 * @param url 
 */
const formatURL = (url:string):string => {
    return url.replace(/\/\//g, '/');
}
export default formatURL;