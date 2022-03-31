document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if(input !== '') {
        clearinfo()
        aviso('Carregando...')
    

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bd52ff4d9946c5c470136f324c8fd798&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()
        
        console.log(json)

        if(json.cod === 200) {
            showinfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                feels_like: json.main.feels_like,
                humidity: json.main.humidity,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                lat: json.coord.lat,
                lon: json.coord.lon,
                
            })
        } else {
            clearinfo()
            aviso('Não encontramos essa localização.')
        }
    } else {
        clearinfo()
    }
})


function showinfo(json) {
    aviso('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempatualinfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.tempmaxinfo').innerHTML = `${json.tempMax} <sup>ºC</sup>`
    document.querySelector('.tempmininfo').innerHTML = `${json.tempMin} <sup>ºC</sup>`
    document.querySelector('.feelsLikeinfo').innerHTML = `${json.feels_like} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    document.querySelector(`.umidadeinfo`).innerHTML = `${json.humidity} <sup>%</sup>`
    document.querySelector('.descriçao').innerHTML = `${json.description}`
    document.querySelector('.latitudeinfo').innerHTML = `${json.lat}`
    document.querySelector('.longitudeinfo').innerHTML = `${json.lon}`

    document.querySelector('.resultado').style.display = 'block'
}


function clearinfo() {
    aviso('')
    document.querySelector('.resultado').style.display = 'none'

}


function aviso(msg) {
    document.querySelector('.aviso').innerHTML = msg
}