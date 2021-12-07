class TempManager {
    constructor(){
        this.cityData = new Array()
    }

    async getDataFromDB(){
        let result = await $.get(`/cities`)
        for(let city of result){
            city["favorite"] = true
        }
        this.cityData = result
    }

    async getCityData(cityName){
        let result = await $.get(`/city/${cityName}`)
        result["favorite"] = false
        this.cityData.push(result)
    }

    async saveCity(city){
        let result = await $.post(`/city`,city)
        for(let c of this.cityData){
            if(c.name === city.name){
                c.temperature = result.temperature;
                c.condition = result.temperature;
                c.conditionPic = result.conditionPic;
                c["favorite"] = true
                return;
            }
        }
        result["favorite"] = true
        this.cityData.push(result)
    }
    
    async removeCity(cityName){
       let result = await $.ajax( {
            url : `/city/${cityName}`,
            type : `DELETE`,
            success : function ( data ) {
                console.log(data)
              
            },
            error : function ( jqXhr, textStatus, errorMessage ) {
                console.log(errorMessage)
                return false;
            }
        });
       if(result){
           for(let i=0; i<this.cityData.length; i++){
               if(this.cityData[i].name === cityName){
                   this.cityData.splice(i,1)
                   return;
               }
           }
       }
    }
}

