async function getWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=ce2678d6f38140418f7125948240905`);
    const data = await response.json();
    console.log(data);
    return data;
}

function formatForecast (data) {
        const current = {temp_c: data.current.temp_c, temp_f: data.current.temp_f, condition: data.current.condition.text, icon: data.current.condition.icon};
        const tomorrow = {temp_c: data.forecast.forecastday[1].day.maxtemp_c, temp_f: data.forecast.forecastday[1].day.maxtemp_f, condition: data.forecast.forecastday[1].day.condition.text, icon: data.forecast.forecastday[1].day.condition.icon};
        const next_day = {temp_c: data.forecast.forecastday[2].day.maxtemp_c, temp_f: data.forecast.forecastday[2].day.maxtemp_f, condition: data.forecast.forecastday[2].day.condition.text, icon: data.forecast.forecastday[2].day.condition.icon};
    
        return {current, tomorrow, next_day}
}

function handleRender (weather, unit) {

    if (unit === 'Fahrenheit') {
        const todayCardTemp = document.getElementById('today-card-temp');
        todayCardTemp.innerHTML = weather.current.temp_f + `&deg;` + 'F';

        const tomorrowCardTemp = document.getElementById('tomorrow-card-temp');
        tomorrowCardTemp.innerHTML = weather.tomorrow.temp_f + `&deg;` + 'F';

        const nextDayCardTemp = document.getElementById('next-day-card-temp');
        nextDayCardTemp.innerHTML = weather.next_day.temp_f + `&deg;` + 'F';
    } else {
        const todayCardTemp = document.getElementById('today-card-temp');
        todayCardTemp.innerHTML = weather.current.temp_c + `&deg;` + 'C';

        const tomorrowCardTemp = document.getElementById('tomorrow-card-temp');
        tomorrowCardTemp.innerHTML = weather.tomorrow.temp_c + `&deg;` + 'C';

        const nextDayCardTemp = document.getElementById('next-day-card-temp');
        nextDayCardTemp.innerHTML = weather.next_day.temp_c + `&deg;` + 'C';
    }

    const todayIcon = document.getElementById('today-icon')
    todayIcon.src=weather.current.icon;

    const tomorrowIcon = document.getElementById('tomorrow-icon')
    tomorrowIcon.src=weather.tomorrow.icon;

    const nextDayIcon = document.getElementById('next-day-icon')
    nextDayIcon.src=weather.next_day.icon;

    const todayCondition = document.getElementById('today-condition');
    todayCondition.innerHTML = weather.current.condition;

    const tomorrowCondition = document.getElementById('tomorrow-condition');
    tomorrowCondition.innerHTML = weather.tomorrow.condition;

    const nextDayCondition = document.getElementById('next-day-condition');
    nextDayCondition.innerHTML = weather.next_day.condition;
}


( function initalize() {
const modal = document.getElementById("myModal");

const form = document.querySelector(".modal__form");
const formInput = document.querySelector(".modal__input");
const unitInput = document.getElementById('unit');

const cardTitles = document.querySelectorAll('.weather-card__location');



form.onsubmit = async function(event) {
    event.preventDefault(); 
    const modalContent = document.querySelector(".modal__content");
    modalContent.innerHTML = '';
    modalContent.innerHTML = `<p>Loading...</p>`
    const city = formInput.value;
    const unit = unitInput.value;


    cardTitles.forEach(title => {
        title.textContent = city;
    })

    

    const rawData = await getWeather(city);
    const formattedData = formatForecast(rawData);
    handleRender(formattedData, unit);

    modal.style.display = "none";
  }

  
})();

