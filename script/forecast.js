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


