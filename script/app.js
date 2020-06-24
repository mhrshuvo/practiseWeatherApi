//                          Dom variables
const card    = document.querySelector('.card');
const details = document.querySelector('.details');
const image   = document.querySelector('img.time');
const icon    = document.querySelector('.icon img')
const warn    = document.querySelector('.warn');
//                          js variables
const searchForm = document.querySelector('.search-location');
//                          API key
const key ='SIuIVfCXtAmbwRKTV9UUSyBfGvhs8DAb';

//                                              get weather info
const getWeather = async (id) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query =`${id}?apikey=${key}`;

    const responce =await fetch (base+query);
    const data = await responce.json();
    console.log('get weather',data[0]);
    return data[0];

};



//                                              get city info
const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query =`?apikey=${key}&q=${city}`;

    const responce = await fetch( base+query );
    const data = await responce.json();
    console.log('get city',data[0]);
    return data[0];

};
//                               test both function working properly or not


// getCity('dhaka').then((data)=>{
//     return getWeather(data.Key);
// }).then((data) =>{
//     console.log(data);
// })
// .catch((err) =>{
//     console.log(err);
// });





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
            warn.classList.add('d-none');
            updateUI(data);
            
        })
        .catch((err) =>{
            console.log('error');
            if(warn.classList.contains('d-none')){
                warn.classList.remove('d-none');
            }
        });

});