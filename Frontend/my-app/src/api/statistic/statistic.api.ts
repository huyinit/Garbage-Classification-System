/* eslint-disable new-parens */
import axios from "axios";


export default class StatisticApi {
    
    static sendCareerStatistic(re: any) {
        throw new Error("Method not implemented.");
    }
    static host = 'https://api.careerup.inres.ai';

  

    static getAllBinData(): any{
        var config = {
            method: 'GET',
            url: 'http://127.0.0.1:5000/home',
            headers: { }
        };
        return axios(config);
    }

    static getCompartmentDataByBinID(id: string): any{
        
    }



    static getCurrentChartData(): any{
		var config = {
			method: 'GET',
			url: 'http://127.0.0.1:5000/home',
			headers: { }
		};
		return axios(config);
    }

	static getPeriodTimeBarChartData(binId: string, startTime: string, endTime: string): any{ // Lay du lieu bieu do cot du lieu rac theo ngay
        var data = `location=${binId}&start_time=${startTime}&end_time=${endTime}`
        console.log(data)
          var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/home',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };

		
		return axios(config);
	} 

    static resetBinById(binId: string, compartmentId: string): any{
        var config = {
            method: 'get',
            url: `http://127.0.0.1:5000/reset/${binId}/${compartmentId}`,
            headers: { }
          };

        return axios(config);
    }


    static getImage(binId: string, startTime: string, endTime: string): any{ // Lay du lieu bieu do cot du lieu rac theo ngay
        var data = `location=${binId}&start_time=${startTime}&end_time=${endTime}`
        console.log(data)
          var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/get_img',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };

		
		return axios(config);
	} 
    
}