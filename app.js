
// let input = document.getElementById('input').value
let parent = document.querySelector('.current')
let fore = document.querySelector('.forecast')
let parents = document.querySelector('section')

let forecast = `http://api.weatherapi.com/v1/forecast.json?key=d37ffd8a84034c42a2760906222812&q=Fergana`
let Api =  `http://api.weatherapi.com/v1/current.json?key=d37ffd8a84034c42a2760906222812&q=Fergana`
$('.lines img').click(function(){
  
    if($(this).attr('src') ==="./weatherImages/x.svg" ){
        $(this).attr('src', "./weatherImages/filter-left.svg")
        $('.chapter').css({left:-300, top: 0,})
    }
    else{
        $('.chapter').css({left: 0, top: 0,})
        $(this).attr('src', "./weatherImages/x.svg")
        
    }
})
$('h4').click(function (){
    $('.chapter').css({left:-300, top: 0,})
    $('.lines img').attr('src', "./weatherImages/filter-left.svg")
})
$('#for').click(function(){
    $('.current').css('display', 'none')
    $('.forecast').css('display', 'inline-block')

})
$('#cur').click(function(){
    $('.forecast').css('display', 'none')
    $('.current').css('display', 'flex')

})



async function getforecast(forecast){
    let res = await fetch(forecast)
    let data = await res.json()
    return data
}


async function rendering(api){
    let databased = await getforecast(api)
    fore.innerHTML = ''
    let files = databased.forecast.forecastday
    files.forEach(async (e) => {
        const contents = await e
        contents.hour.forEach( async (e) =>{
            let inf = await e
            
                    fore.innerHTML += ` 
                    <div class="content">
                        <h5>${inf.time}</h5>
                       
                        <div class="text">${inf.condition.text}</div>
                        <div class="forc">
                            <img src="${inf.condition.icon}" alt="">
                            <div class="gradus">
                                <p>${inf.temp_c}</p>
                                <span>&#9675</span>
                                <h4> C</h4>
                            </div>
                            <div class="humidities"><img src="./weatherImages/droplet.svg" alt=""><span>${inf.humidity}%</span></div>
                        </div>
                    </div>`
        })

    })

}
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter' ) {
        let input = document.getElementById('input').value
        renderHTML(`http://api.weatherapi.com/v1/current.json?key=d37ffd8a84034c42a2760906222812&q=${input}`)
        rendering(`http://api.weatherapi.com/v1/forecast.json?key=d37ffd8a84034c42a2760906222812&q=${input}`)
        $('#input').val('')
    }
    
});


    $('#search').click(function(){
        
       let input = document.getElementById('input').value
        renderHTML(`http://api.weatherapi.com/v1/current.json?key=d37ffd8a84034c42a2760906222812&q=${input}`)
        rendering(`http://api.weatherapi.com/v1/forecast.json?key=d37ffd8a84034c42a2760906222812&q=${input}`)
        $('#input').val('')
    } )
rendering(forecast)



async function Getdata(Api){
    let res= await fetch(Api)
    let database = await res.json()
    return database
}

async function renderHTML(api){
    let data = await Getdata(api)
    if(data.current.is_day === 1){
        data.current.is_day = 'Day'
        $('main').css('color', '#000')
        $('main img').css('filter', " invert(0%) sepia(10%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(115%)")
        $('.container').css('background-image', "url('./weatherImages/day.PNG')")
        $('input').removeClass('inp')
        $('input').css('color', '#000')
        $('.search').css('border-color', '#000')
    }
    else{
        data.current.is_day = 'Night'
        $('.container').css('background-image', "url('./weatherImages/night.PNG')")
        $('main').css('color', '#fff')
        $('main img').css('filter', " invert(100%) sepia(100%) saturate(0%) hue-rotate(100deg) brightness(100%) contrast(115%)")
        $('input').addClass('inp')
        $('input').css('color', '#fff')
        $('.search').css('border-color', '#fff')
        $('.chapter').css('background', '#0741e0' )
    }
    parent.innerHTML = `
    
    <div class="city">
    <h1>${data.location.country}</h1>
    <h1>${data.location.name}</h1>
    <h2> ${ data.current.is_day}</h2>
    </div>
<div class="vk">
    <div class="extra">
        <div class="operation">
        
            <p>${data.current.temp_c}</p>
            <span>&#9675</span>
             <div class="gr"> C</div>
        </div>
        <div class="cloud">
            <p>${data.current.condition.text}</p>
            <div class="city-name">
                <p>${data.location.name},</p>
                <p>${data.location.country}</p>
            </div>
        </div>

    </div>
    <div class="measure">
        <div class="icon" >  <img src="${data.current.condition.icon}" alt="icon"> </div>
        <div class="humidity"><img class="img"  src="./weatherImages/droplet.svg" alt=""><p>${data.current.humidity}%</p></div>
    </div>

</div>`
}



renderHTML(Api)