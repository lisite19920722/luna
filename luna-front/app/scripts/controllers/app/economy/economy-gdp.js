//controller: 'EconomyGdpCtrl'
// 'use strict';
app.controller('EconomyGdpCtrl', ['$scope','$stateParams','ResTool','EconomyRes', function($scope,$stateParams,ResTool,EconomyRes){
    var yearGdpParams = {};
    var yearGdpHeader = {};
    var yearPromise = ResTool.httpGet(EconomyRes.getYearGdp,yearGdpParams,yearGdpHeader);
    yearPromise.then(function(rc){

       $scope.gdprealvalue=rc.data.realYearGdp;
       $scope.gdpforecastvalue=rc.data.forecastYearGdp;
       $scope.gdpgrowratevalue=rc.data.yearGrow;
       $scope.currentYearForecast=rc.data.forecastYearGdp[9];
       $scope.exchange=function(param){
       $scope.yearGDPChart.series[0].type=param;
       $scope.yearGDPChart.series[1].type=param;
       $scope.yearGDPChart.series[2].type='spline';
       };
       $scope.checkdeviation=function(){
        $scope.deviation=!$scope.deviation;
        $scope.errorvalue = rc.data.yearErrorRate;
      };
        $scope.checkforecast=function(){
        $scope.forecast=!$scope.forecast;
      };


        $scope.xAxis= [
                    
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018'
                    
                ];
       $scope.yearGDPChart={
            options: {
              chart: {
                type:'column'
              },
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '年度GDP分析'
            },
            xAxis: {
                categories:$scope.xAxis,
                plotBands:[{
                from: 8.5,
                to:12.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }
                       
                    }
                }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '年度GDP总值（亿元）'
                },
                plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1150,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                type: 'column',
                name: '真实数据',
                data: $scope.gdprealvalue

            }, {
                type: 'column',
                name: '预测数据',
                data: $scope.gdpforecastvalue

            },
            {   
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpgrowratevalue
            }]
        };
    })
    
}]);

app.controller('EconomyGdpDetail', ['$scope','$stateParams','ResTool','EconomyRes', function($scope,$stateParams,ResTool,EconomyRes){
    var now = new Date();
    var nowyear = now.getFullYear();
    console.log(nowyear);
    var yearDetailPromise = ResTool.httpGet(EconomyRes.getYearDetail,{year:nowyear},{});
    yearDetailPromise.then(function(rc){
      $scope.gdpquarterrealvalue = rc.data.realGdpQuarterDetail;
      $scope.gdpquarterforcastvalue = rc.data.forecastGdpQuterDetail;
      $scope.gdpquartergrowratevalue = rc.data.growRate; 
      $scope.monthGDPChart={
        options: {
          chart: {
            type:'column'
          },
        },
        credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                 style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '季度GDP分析'
            },
            xAxis: {
               categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'

                ],
                 plotBands:[{
                from: 3.5,
                to:3.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }

                    }
                }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '季度GDP总值（亿元）'
                },
                 plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1150,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },
            {
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.gdpquarterrealvalue

            }, {
                color:'#434348',
                type: 'column',
                name: '预测数据',
                data: $scope.gdpquarterforcastvalue

            },
            {
                yAxis: 1,
                 color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpquartergrowratevalue
            }]
      };
     
   });
    
    
}])

/*app.controller('EconomyGdpCtrl', ['$scope','$stateParams','qService','forecastFactory_gdp',function($scope,$stateParams,qService,forecastFactory_gdp) {
    var year;
     $scope.expression=true;
     $scope.vicemonthdeviation=false;
     $scope.yearchoose=2015;
     $scope.txtexpression="季度GDP预测采用的是基于时间序列的自回归积分滑动平均模型，通过该模型分析预测得出：第四季度经济增速保持稳定。";
    var promise = qService.tokenHttpGet(forecastFactory_gdp.query,{tableName:'gdpForecastData',year:year});
    $scope.changeyear=function(param){
       year=param;
       if (year>2015) {
        $scope.expression=false;
        $scope.yearchoose=2016;
        $scope.txtexpression="季度GDP预测采用的是基于时间序列的自回归积分滑动平均模型，通过该模型分析预测得出：较上一年GDP增速相比基本保持稳定。";
        // $scope.vicemonthdeviation=true;
        // $scope.monthdeviation=false;
       }else{
        $scope.expression=true;
        $scope.yearchoose=2015;
        $scope.txtexpression="季度GDP预测采用的是基于时间序列的自回归积分滑动平均模型，通过该模型分析预测得出：第四季度经济增速保持稳定。";
        // $scope.vicemonthdeviation=false;
        // $scope.monthdeviation=true;
       };
       $scope.vicemonthdeviation=false;
       $scope.monthdeviation=false;
       $scope.monthforecast=false;
       var promise = qService.tokenHttpGet(forecastFactory_gdp.query,{tableName:'gdpForecastData',year:year});
        promise.then(function(rc) {
         
        // console.log(rc.data);
        //alert(rc.data);
         // var  i=9+(year-2015);

        $scope.gdprealvalue=rc.data[0];
        $scope.forecastvalue=rc.data[1][8];
        $scope.gdpforecastvalue=rc.data[1];
        $scope.errorvalue=rc.data[2];
        $scope.gdpquarterrealvalue=rc.data[3];
        $scope.gdpquarterforcastvalue=rc.data[4];
        $scope.gdpgrowratevalue=rc.data[5];
        $scope.gdpquartergrowratevalue=rc.data[6];
        $scope.firstindustryvalue=rc.data[7];
        $scope.secondindustryvalue=rc.data[8];
        $scope.thirdindustryvalue=rc.data[9];
        $scope.thisyearfirstindustryvalue=rc.data[10];
        $scope.thisyearfirstindustryfcvalue=rc.data[11];
        $scope.thisyearfirstindustrygrowvalue=rc.data[12];
        $scope.thisyearsecondindustryvalue=rc.data[13];
        $scope.thisyearsecondindustryfcvalue=rc.data[14];
        $scope.thisyearsecondindustrygrowvalue=rc.data[15];
        $scope.thisyearthirdindustryvalue=rc.data[16];
        $scope.thisyearthirdindustryfcvalue=rc.data[17];
        $scope.thisyearthirdindustrygrowvalue=rc.data[18];
        $scope.xAxis= rc.data[19];

       $scope.deviation=false;
       $scope.forecast=false;
       $scope.industrydetail=false;
       $scope.title = $stateParams.title;
      $scope.checkdeviation=function(){
        $scope.deviation=!$scope.deviation;
      };
      $scope.checkforecast=function(){
        $scope.forecast=!$scope.forecast;
      };
      $scope.exchange=function(param){
        $scope.yearGDPChart.series[0].type=param;
        $scope.yearGDPChart.series[1].type=param;
      };
      $scope.monthexchange=function(param){
        $scope.monthGDPChart.series[0].type=param;
        $scope.monthGDPChart.series[1].type=param;
      };
      $scope.monthcheckdeviation=function(){
        if (year==2015) {
            $scope.vicemonthdeviation=false;
        $scope.monthdeviation=!$scope.monthdeviation;
        }else if (year==2016) {
            $scope.monthdeviation=false;
            $scope.vicemonthdeviation=!$scope.vicemonthdeviation;
        };
      };
      $scope.monthcheckforecast=function(){
        $scope.monthforecast=!$scope.monthforecast;
      };
      $scope.industrycheckdetail=function(){
        $scope.industrydetail=!$scope.industrydetail;
      };
      $scope.industryexchange=function(param){
        $scope.industryyearGDPChart.options.chart.type=param;
      };


       

      $scope.monthGDPChart={
        options: {
          chart: {
            type:'column'
          },
        },
        credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                 style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '季度GDP分析'
            },
            xAxis: {
               categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'

                ],
                 plotBands:[{
                from: 3.5,
                to:3.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }

                    }
                }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '季度GDP总值（亿元）'
                },
                 plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1150,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },
            {
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.gdpquarterrealvalue

            }, {
                color:'#434348',
                type: 'column',
                name: '预测数据',
                data: $scope.gdpquarterforcastvalue

            },
            {
                yAxis: 1,
                 color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpquartergrowratevalue
            }]
      };
     
   });
    };










 $scope.industrychangeyear=function(param){
       year=param;
       $scope.thisyear=param;
       var promise = qService.tokenHttpGet(forecastFactory_gdp.query,{tableName:'gdpForecastData',year:year});
        promise.then(function(rc) {
         
        // console.log(rc.data);
        //alert(rc.data);
         // var  i=9+(year-2015);

        $scope.gdprealvalue=rc.data[0];
        $scope.forecastvalue=rc.data[1][8];
        $scope.gdpforecastvalue=rc.data[1];
        $scope.errorvalue=rc.data[2];
        $scope.gdpquarterrealvalue=rc.data[3];
        $scope.gdpquarterforcastvalue=rc.data[4];
        $scope.gdpgrowratevalue=rc.data[5];
        $scope.gdpquartergrowratevalue=rc.data[6];
        $scope.firstindustryvalue=rc.data[7];
        $scope.secondindustryvalue=rc.data[8];
        $scope.thirdindustryvalue=rc.data[9];
        $scope.thisyearfirstindustryvalue=rc.data[10];
        $scope.thisyearfirstindustryfcvalue=rc.data[11];
        $scope.thisyearfirstindustrygrowvalue=rc.data[12];
        $scope.thisyearsecondindustryvalue=rc.data[13];
        $scope.thisyearsecondindustryfcvalue=rc.data[14];
        $scope.thisyearsecondindustrygrowvalue=rc.data[15];
        $scope.thisyearthirdindustryvalue=rc.data[16];
        $scope.thisyearthirdindustryfcvalue=rc.data[17];
        $scope.thisyearthirdindustrygrowvalue=rc.data[18];
        $scope.xAxis= rc.data[19];

       $scope.deviation=false;
       $scope.forecast=false;
       $scope.title = $stateParams.title;
      $scope.checkdeviation=function(){
        $scope.deviation=!$scope.deviation;
      };
      $scope.checkforecast=function(){
        $scope.forecast=!$scope.forecast;
      };
      $scope.exchange=function(param){
        $scope.yearGDPChart.series[0].type=param;
        $scope.yearGDPChart.series[1].type=param;
      };
      $scope.monthexchange=function(param){
        $scope.monthGDPChart.series[0].type=param;
        $scope.monthGDPChart.series[1].type=param;
      };
      $scope.monthcheckdeviation=function(){
        $scope.monthdeviation=!$scope.monthdeviation;
      };
      $scope.monthcheckforecast=function(){
        $scope.monthforecast=!$scope.monthforecast;
      };
      $scope.industrycheckdetail=function(){
        $scope.industrydetail=!$scope.industrydetail;
      };
      $scope.industryexchange=function(param){
        $scope.industryyearGDPChart.options.chart.type=param;
      };
      $scope.primaryGDPChart={
        chart: {

            },
            credits:{
                enabled:false,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第一产业本年度GDP分析'
            },
            xAxis: {
                categories: [
                    '第一季度',
                    '',
                    '第三季度',
                    ''

                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第一产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.thisyearfirstindustryvalue

            }, {
                color:'#434348',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearfirstindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearfirstindustrygrowvalue
            }]

      };
      $scope.secondGDPChart={
        chart: {

            },
            credits:{
                enabled:false,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第二产业本年度GDP分析'
            },
            xAxis: {
                categories: [
                    '第一季度',
                    '',
                    '第三季度',
                    ''

                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第二产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.thisyearsecondindustryvalue

            }, {
                color:'#434348',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearsecondindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearsecondindustrygrowvalue
            }]

      };
      $scope.thirdGDPChart={
        chart: {

            },
            credits:{
                enabled:false,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第三产业本年度GDP分析'
            },
            xAxis: {
                
                categories: [
                    '第一季度',
                    '',
                    '第三季度',
                    ''

                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第三产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.thisyearthirdindustryvalue

            }, {
                color:'#434348',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearthirdindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearthirdindustrygrowvalue
            }]

        };
   });
    };





    promise.then(function(rc) {

        // console.log(rc.data);
        //alert(rc.data);
        
        $scope.gdprealvalue=rc.data[0];
        $scope.forecastvalue=rc.data[1][8];
        $scope.gdpforecastvalue=rc.data[1];
        $scope.errorvalue=rc.data[2];
        $scope.gdpquarterrealvalue=rc.data[3];
        $scope.gdpquarterforcastvalue=rc.data[4];
        $scope.gdpgrowratevalue=rc.data[5];
        $scope.gdpquartergrowratevalue=rc.data[6];
        $scope.firstindustryvalue=rc.data[7];
        $scope.secondindustryvalue=rc.data[8];
        $scope.thirdindustryvalue=rc.data[9];
        $scope.thisyearfirstindustryvalue=rc.data[10];
        $scope.thisyearfirstindustryfcvalue=rc.data[11];
        $scope.thisyearfirstindustrygrowvalue=rc.data[12];
        $scope.thisyearsecondindustryvalue=rc.data[13];
        $scope.thisyearsecondindustryfcvalue=rc.data[14];
        $scope.thisyearsecondindustrygrowvalue=rc.data[15];
        $scope.thisyearthirdindustryvalue=rc.data[16];
        $scope.thisyearthirdindustryfcvalue=rc.data[17];
        $scope.thisyearthirdindustrygrowvalue=rc.data[18];
        $scope.xAxis= [
                    
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018'
                    
                ];
       
       $scope.deviation=false;
       $scope.forecast=false;
       $scope.industrydetail=false;
       $scope.title = $stateParams.title;
      $scope.checkdeviation=function(){
        $scope.deviation=!$scope.deviation;
      };
      $scope.checkforecast=function(){
        $scope.forecast=!$scope.forecast;
      };
      $scope.exchange=function(param){
        $scope.yearGDPChart.series[0].type=param;
        $scope.yearGDPChart.series[1].type=param;
      };
      $scope.monthexchange=function(param){
        $scope.monthGDPChart.series[0].type=param;
        $scope.monthGDPChart.series[1].type=param;
      };
      $scope.monthcheckdeviation=function(){
        $scope.monthdeviation=!$scope.monthdeviation;
      };
      $scope.monthcheckforecast=function(){
        $scope.monthforecast=!$scope.monthforecast;
      };
      $scope.industrycheckdetail=function(){
        $scope.industrydetail=!$scope.industrydetail;
        $scope.thisyear=2015;
      };
      $scope.industryexchange=function(param){
        $scope.industryyearGDPChart.options.chart.type=param;
      };  

   
        $scope.yearGDPChart={
            options: {
              chart: {
                type:'column'
              },
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '年度GDP分析'
            },
            xAxis: {
                categories:$scope.xAxis,
                plotBands:[{
                from: 8.5,
                to:12.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }
                       
                    }
                }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '年度GDP总值（亿元）'
                },
                plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1150,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                type: 'column',
                name: '真实数据',
                data: $scope.gdprealvalue

            }, {
                type: 'column',
                name: '预测数据',
                data: $scope.gdpforecastvalue

            },
            {   
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpgrowratevalue
            }]
        };
  
      $scope.monthGDPChart={
        options: {
          chart: {
            type:'column'
          },
        },
        credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                 style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '季度GDP分析'
            },
            xAxis: {
               categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'
                    
                ],
                //  plotBands:[{
                // from: 2.5,
                // to:3.5,
                // color:'rgba(68, 170, 213, .2)',
                // label: {
                //         text: '预测区',
                //         verticalAlign: 'top',
                //         style: {
                //             fontSize: '12px',
                //             fontWeight: 600
                //         }
                       
                //     }
                // }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '季度GDP总值（亿元）'
                },
                 plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1050,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },
            {
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                type: 'column',
                name: '真实数据',
                data: $scope.gdpquarterrealvalue

            }, {
                type: 'column',
                name: '预测数据',
                data: $scope.gdpquarterforcastvalue

            },
            {   
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpquartergrowratevalue
            }]
      };

      $scope.industryyearGDPChart={
        options: {
          chart: {
            type:'column'
          },
        },
        credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                 style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '按年度分产业GDP分析'
            },
            xAxis: {
                categories: [
                    
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018'
                    
                ],
                 plotBands:[{
                from: 8.5,
                to:12.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }
                       
                    }
                }]
            },
            yAxis: {
                min: 0,
                title: {
                    text: '年度GDP总值（亿元）'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#929bce',
                name: '第一产业',
                data: $scope.firstindustryvalue

            }, {
                color:'#2E8B57',
                name: '第二产业',
                data: $scope.secondindustryvalue

            },
            {   color:'#465299',
                name: '第三产业',
                data: $scope.thirdindustryvalue
            }]
      };
      $scope.primaryGDPChart={
        chart: {
                
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第一产业本年度GDP分析'
            },
            xAxis: {
                labels:{
                    step:2,
                },
                
                categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'
                    
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第一产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{

                type: 'column',
                name: '真实数据',
                data: $scope.thisyearfirstindustryvalue

            }, {
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearfirstindustryfcvalue

            },
            {   
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearfirstindustrygrowvalue
            }]
      
      };
      $scope.secondGDPChart={
        chart: {
                
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第二产业本年度GDP分析'
            },
            xAxis: {
                labels:{
                    step:2,
                },
                categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'
                    
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第二产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
             
                type: 'column',
                name: '真实数据',
                data: $scope.thisyearsecondindustryvalue

            }, { 
               
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearsecondindustryfcvalue

            },
            {   
               
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearsecondindustrygrowvalue
            }]
      
      };
      $scope.thirdGDPChart={
        chart: {
                
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第三产业本年度GDP分析'
            },
            xAxis: {
                labels:{
                    step:2,
                },
                categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'
                    
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第三产业季度GDP总值（亿元）'
                }
            },{
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
               
                type: 'column',
                name: '真实数据',
                data: $scope.thisyearthirdindustryvalue

            }, {
               
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearthirdindustryfcvalue

            },
            {   
                
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearthirdindustrygrowvalue
            }]
      
        };
   });
   
}]);
*/