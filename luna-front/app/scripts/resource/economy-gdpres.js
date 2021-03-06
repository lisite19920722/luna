angular.module('luna')
  .factory('EconomyRes', ['$resource','BASE_URL', function($resource,BASE_URL) {
    return {
    getYearGdp: function (headers){
      return $resource(BASE_URL+'/economy/yearGdp', {}, {
        get: {
          method: 'GET',
          headers: headers
        },
      });
    },
    getYearDetail: function(headers){
      return $resource(BASE_URL+"/economy/gdpDetail/:year", {
        year:'@year'
      }, {
        get:{
          method:'GET',
          headers: headers
        }
      });
    },
    getIndustryDetail: function(headers){
      return $resource(BASE_URL+"/economy/industryDetail", {

      }, {
        get:{
          method:'GET',
          headers: headers
        }
      })
    },
    getYearIndustryDetail: function(headers){
      return $resource(BASE_URL+"/economy/getIndustryDetail/:year", {
        year:"@year"
      }, {
        get:{
          method:'GET',
          headers:headers
        }
      })
    }
  };
}])