export {getData}
async function getData(url) {
    const nfetch = fetch(url);
    try {
        const data = (await nfetch).json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
