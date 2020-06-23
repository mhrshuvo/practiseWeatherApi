//                          Dom variables
const card    = document.querySelector('.card');
const details = document.querySelector('.details');
const image   = document.querySelector('img.time');
const icon    = document.querySelector('.icon img')
//                          js variables
const searchForm = document.querySelector('.search-location');




const updateUI = (data) =>{
//                  update details template
details.innerHTML =
 `
    <h5 class="my-3">${data.cityDetiles.EnglishName}</h5>
    <div class="my-3">${data.cityweather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${data.cityweather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
`;
//                       update images
const iconsrc = `img/icons/${data.cityweather.WeatherIcon}.svg`;
icon.setAttribute('src', iconsrc);

let timesrc =null;
if (data.cityweather.IsDayTime){
    timesrc = 'img/day.svg';
    console.log('day')
}else{
    timesrc = 'img/night.svg';
    console.log('night')
}

image.setAttribute('src', timesrc);

if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
}
};

const updateCity = async (city) =>{

    //console.log(city);

    const cityDetiles = await getCity(city);
    const cityweather = await getWeather(cityDetiles.Key);

    return {
        cityDetiles , cityweather
    }

};

searchForm.addEventListener('submit', (e) =>{
    //           get city value

    e.preventDefault();
    const city=searchForm.city.value.trim();
    searchForm.reset();

    updateCity(city)
        .then((data) =>{
            updateUI(data);
        })
        .catch((err) =>{
            console.log('error')
        });

});