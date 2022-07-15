document.forms[0].addEventListener('submit', apiRequest );
document.forms[1].addEventListener('submit', ipGeolocation)
async function apiRequest(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const url = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + password + '&email='+ email;
    
    /* **** Console url final ***** */
    console.log(url);
    
    const nfetch = await fetch(url);
    const showResults = async (obj)=>{
        if (obj.email) {
            document.getElementById('api-content').innerHTML =
            `Valid Response. Email: ${obj.email}, valid format: ${obj.is_valid_format.text} `;
            console.log(obj);
        } else {
            document.getElementById('api-content').innerHTML = `${obj.error.code}! ${obj.error.message}`;
            console.log(obj);
        }
    }
    try {
        const emailIsValid = await nfetch.json();
        showResults(emailIsValid);
        
    } catch (error) {
        showResults(error);
        console.error(error);
    }
}
async function ipGeolocation(e) {
    e.preventDefault();
    const password = document.getElementById('password2').value;
    const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + password;
    const nfetch = await fetch(url);

    try {
        console.log(await nfetch.json());
    } catch (error) {
        console.error(error);
    }
}