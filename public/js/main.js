// const async = require("hbs/lib/async");

let searchbtn = document.getElementById('searchbtn')
let cityName = document.getElementById('cityName')
let city = document.getElementById('city')
let temp_status = document.getElementById('temp-status')
let temp_num = document.getElementById('temp_num')
let temp = document.getElementById('temp')
let day = document.getElementById('day')
let date = document.getElementById('date')
let temp_deg=document.getElementById('temp_deg')
let weather_status = document.getElementById('weather_status');

const getday = () =>{
    var weekday = new Array(7);
    weekday[1]='Monday';
    weekday[2]='Tuesday';
    weekday[3]='Wednesday';
    weekday[4]='Thursday';
    weekday[0]='Sunday';
    weekday[5]='Friday';
    weekday[6]='Saturday';

    let dayobj = new Date();
    let today = weekday[dayobj.getDay()];
    day.innerText = today;
    // console.log(today)
}

const getdate = () =>{
    var weekday = [
        "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec",
    ];

    let datobj = new Date();
    let date_num = datobj.getDate();
    let month = weekday[datobj.getMonth()];
    let hr = datobj.getHours();
    let min = datobj.getMinutes();
    // let sec = datobj.getSeconds();
    let zon = "am";
    if(hr>11){        
        zon="pm";
        if(hr>12) hr -= 12;
    }
    if(min<10){
        min = "0" + min;
    }
    let today = date_num +" "+ month + " " + hr + ":" + min + " " + zon  ;
    date.innerText = today
    console.log(today)
}

var searchfunc = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;
    console.log("cityval is " + cityval);
    if (cityval === "") {
        city.innerText = "Please enter the city name...";
        temp.innerText="";
        temp_status.innerText="";
    }
    else {
        city.innerText = cityval;
        getday();
        getdate();
        try {
            let urlto = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=e8abae0881b619f734245bf39c46af0e`
            const response = await fetch(urlto)
            const data = await response.json();
            const arrData = [data];
            // console.log(arrData[0].main.temp)
            console.log(data)
            // document.write(arrData)      
            temp_num.innerText=arrData[0].main.temp;
            // temp.innerText=temp_num.innerText + temp_deg.innerText;
            weather_status.innerText=arrData[0].weather[0].main;
            
            let temp_icon = arrData[0].weather[0].main;
            if (temp_icon == 'Clear') {
                // temp_status.innerHTML='<i class="fa-solid fa-sun-bright"></i>'
                temp_status.innerHTML='<i class="fa-solid fa-sun"></i>'
            }else if (temp_icon == 'Clouds') {
                temp_status.innerHTML='<i class="fa-solid fa-cloud"></i>'
            }else if (temp_icon == 'Rain') {
                temp_status.innerHTML='<i class="fa-solid fa-cloud-rain"></i>'
            }else{
                temp_status.innerHTML='<i class="fa-solid fa-cloud-sun"></i>'
                // temp_status.innerHTML='<i class="fa-solid fa-sun"></i>'
            }
        } catch {
            city.innerText = "please enter the city name again..."
            temp_num.innerText="";
            temp_status.innerText="";
        }
    }
    // alert('it is working')
}
searchbtn.addEventListener('click', searchfunc)