const source = $('#cities-template').html()
const template = Handlebars.compile(source)
class Renderer {

    constructor(){
        
    }
    renderData(cities){
        $('#results').empty()
        const data = {cities:cities}
        let newHtml = template(data)
        $('#results').append(newHtml)
    }
}