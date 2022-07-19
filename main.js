document.forms[0].addEventListener('submit', apiRequest );
document.forms[1].addEventListener('submit', ipGeolocation);
document.forms[2].addEventListener('submit', exchangeRate);
document.forms[3].addEventListener('submit', getGif);

/* ********************Email Validation ********************/
async function apiRequest(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let url;
    if(password.match(/cjcn2526/)) {
        url = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + 'cdb1b806977441be83629fb4f841e7c4' + '&email='+ email;
    } else {
        url = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + 'kkk' + '&email='+ email;
    }
    
    /* **** Console url final ***** */
    console.log(url);
    
    const showResults = async (obj)=>{
        obj.autocorrect = false;
        if (obj.email && obj.is_smtp_valid.value === true) {
            document.getElementById('api-content').innerHTML =
            `Valid Email: ${obj.email}, valid format: ${obj.is_smtp_valid.text}, ${obj.deliverability}`;
            document.getElementById('api-content-div').classList.add('visible', 'green');
            
        } else if (obj.email && obj.is_smtp_valid.value === false) {
            document.getElementById('api-content').innerHTML = `Invalid Email: ${obj.email}, ${obj.deliverability} `;
            document.getElementById('api-content-div').classList.add('visible', 'green');
        }
        else {
            document.getElementById('api-content').innerHTML = `${obj.error.code}! ${obj.error.message}`;
            console.log(obj);
            document.getElementById('api-content-div').classList.add('visible', 'red');
        }
        setTimeout(()=>{document.getElementById('api-content-div').classList.remove('visible', 'green', 'red'); document.getElementById('api-content').innerHTML = ''}, 7000)
    }
    const nfetch = await fetch(url);
    try {
        const emailIsValid = await nfetch.json();
        showResults(emailIsValid);
        
    } catch (error) {
        showResults(error);
        console.error(error);
    }
}

/* *************** IP Geolocation *************************** */
async function ipGeolocation(e) {
    e.preventDefault();
    const password = document.getElementById('password2').value;
    let url;
    if (password.match(/cjcn2526/)){
        url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + 'dad7b450d09f4518a869ba88252891f1';
    } else {
        url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + 'kkk';
    }
    const nfetch = await fetch(url);
    const showResults = async (obj) => {
        const resultsTextDiv = document.getElementById('geolocation-result-div');
        const resultsText = document.getElementById('geolocation-result');
        if (await obj.city) {
            resultsText.innerText = `Valid response! IP: ${await obj.ip_address}, city: ${await obj.city}, region: ${await obj.region}, country: ${await obj.flag.emoji}`;
            resultsTextDiv.classList.add('visible', 'green');
           /*  resultsText.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6572.470335198509!2d'+ obj.longitude+'!3d'+ obj.latitude+'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sar!4v1657991372177!5m2!1spt-BR!2sar" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'     */
        } else {
            console.log(obj);
            resultsText.innerText = `Invalid Response: ${obj.error.code}, ${obj.error.message}`;
            resultsTextDiv.classList.add('visible', 'red');
        }
        setTimeout(()=>{resultsTextDiv.classList.remove('visible','green', 'red'); resultsText.innerText='';},8000);
    }   
    try {
        const result = await nfetch.json();
        console.log(result);
        showResults(result);
    } catch (error) {
        showResults(error)
    }
}
/* *************** Exchange Rates *************************** */
async function exchangeRate(e) {
    e.preventDefault();
    const baseChecked = document.querySelector('input[name="base-currency"]:checked').value;
    const resultChecked = document.querySelector('input[name="result-currency"]:checked').value;
    let url;
    
    url = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=001fe8b1d50e46a99721c520852a3db9&base='+baseChecked+'&target='+resultChecked;
    console.log(url);
    const nfetch = await fetch(url);
    const showResults = (res) => {
        const date = new Date(res.last_updated*1000);
        console.log(date);
        document.getElementById('exchange-result').innerHTML = `1 ${res.base} = <span>${Object.values(res.exchange_rates)[0]}</span> ${Object.keys(res.exchange_rates)[0]} -  (on ${date})`;
        document.getElementById('exchange-result-div').classList.add('visible', 'green');
    }
    const showError = (err)=> {
        document.getElementById('exchange-result').innerText = `Error: 404. Server not found!`;
        document.getElementById('exchange-result-div').classList.add('visible', 'red');
    }
    try {
        const result = await nfetch.json();
        showResults(result)
    } catch (error) {
        console.log(await error);        
        showError(error);
    }
}
/* *********************************** Get Gif ******************************************** */
async function getGif (e) {
    e.preventDefault();
    const textValue = document.getElementById('giphy-text-input').value
    function showResults(obj) {
        const resultDiv = document.getElementById('giphy-result-div');
        resultDiv.firstChild ? resultDiv.firstChild.remove() :resultDiv;
        const newImage = document.createElement('img');
        newImage.setAttribute('src', `${obj.data.images.original.url}`);
        newImage.style.width = '100%';
        resultDiv.appendChild(newImage);
        resultDiv.classList.add('visible');
    }
    function showError(err) {
        alert(err.meta.status);
    }
    const nFetch = async ()=>{
        return (await fetch('https://api.giphy.com/v1/gifs/translate?api_key=&s='+textValue)).json();
    }
    try {
        const result = await nFetch();
        result.meta.status===200 && showResults(result) || showError(result);
        //result.meta.status!==200 && showError(result);
        console.log(result);
    } catch (error) {
        alert(error.message);
    }
}