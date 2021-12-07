let model = new TempManager()
let view = new Renderer()

$(document).ready(async function () {
    loadPage()
})

const loadPage = async function(){
    await model.getDataFromDB()
    view.renderData(model.cityData)
}

const handleSearch = async function(){
    let cityName = $("#cityName-input").val()
    if(cityName === '') 
        alert("Please Enter a City First")
    else{
        await model.getCityData(cityName)
        view.renderData(model.cityData)
    }
}

$("#searchByCity").on('click',handleSearch)

$("#results").on('click',".save",function(){
    let name = $(this).closest('.first').siblings('.second').find('p:nth-child(1)').text()
    let temperature = $(this).closest('.first').siblings('.second').find('p:nth-child(2)').text()
    let condition =  $(this).closest('.first').siblings('.third').find('p:nth-child(2)').text()
    let src = $(this).closest('.first').siblings('.third').find('p:nth-child(1)').find('img').attr('src')
    let icon = regexSrcAttribute(src)
    model.saveCity({
        name: name,
        temperature: temperature,
        condition: condition,
        conditionPic: icon
    })
//     $(this).siblings(".delete").css("visibility", "visible")
//     $(this).css("visibility", "hidden")
    loadPage()
})
function regexSrcAttribute(src) {
    let re = /(\/\w+@)/
    let charsArr = src.match(re)[0].split('')
    charsArr.shift()
    charsArr.pop()
    return charsArr.join('')
}

$('#results').on('click', '.delete', async function () {
    let name = $(this).closest('.first').siblings('.second').find('p:nth-child(1)').text()
    await model.removeCity(name)
    loadPage()
})
