$(function () {
    $('#chart-container').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        exporting: { enabled: false } ,
        title: {
            text: 'Emails Allison and her exes exchanged',
            style:{
                color: '#5e5e5e',
                align: 'center',
                font:"normal 14px 'Vollkorn',Georgia, serif"
            }
        },
        legend:{
          itemStyle: {
            color: '#5e5e5e',
            align: 'center',
            font:"normal 13px 'Vollkorn',Georgia, serif"
          }
        
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { 
                year: '20%y'
            },
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
        yAxis: {
            min: 0,
            title:'',
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
         
        tooltip: {
            headerFormat: '<span style="font: bold 12px \'Vollkorn\',Georgia, serif; color:#5e5e5e;">{series.name}</span><br>',
            pointFormat: '<span style="font:normal  12px \'Vollkorn\',Georgia, serif; color:#5e5e5e;">{point.x:%b %e,  20%y}: {point.y:f} emails</span>'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: 'ex 5',
            color:'#cccccc',
            data:[
              [Date.UTC(  2014  , 4 , 24  ),  2],
              [Date.UTC(  2014  , 6 , 9 ),  3],
              [Date.UTC(  2014  , 6 , 17  ),  3],
              [Date.UTC(  2014  , 7 , 1 ),  2],
              [Date.UTC(  2014  , 7 , 8 ),  2],
              [Date.UTC(  2014  , 7 , 14  ),  2],
              [Date.UTC(  2014  , 7 , 29  ),  4],
              [Date.UTC(  2014  , 8 , 3 ),  1],
              [Date.UTC(  2014  , 8 , 6 ),  1],
              [Date.UTC(  2014  , 8 , 7 ),  1],
              [Date.UTC(  2014  , 8 , 10  ),  1],
              [Date.UTC(  2014  , 8 , 12  ),  1],
              [Date.UTC(  2014  , 8 , 13  ),  4],
              [Date.UTC(  2014  , 8 , 18  ),  2],
              [Date.UTC(  2014  , 8 , 19  ),  2],
              [Date.UTC(  2014  , 8 , 20  ),  1],
              [Date.UTC(  2014  , 8 , 22  ),  1],
              [Date.UTC(  2014  , 8 , 25  ),  3],
              [Date.UTC(  2014  , 8 , 26  ),  4],
              [Date.UTC(  2014  , 8 , 27  ),  1],
              [Date.UTC(  2014  , 8 , 28  ),  1],
              [Date.UTC(  2014  , 9 , 3 ),  4],
              [Date.UTC(  2014  , 9 , 4 ),  7],
              [Date.UTC(  2014  , 9 , 8 ),  1],
              [Date.UTC(  2014  , 9 , 9 ),  8],
              [Date.UTC(  2014  , 9 , 12  ),  2],
              [Date.UTC(  2014  , 9 , 13  ),  3],
              [Date.UTC(  2014  , 9 , 14  ),  4],
              [Date.UTC(  2014  , 9 , 15  ),  3],
              [Date.UTC(  2014  , 9 , 17  ),  1],
              [Date.UTC(  2014  , 9 , 18  ),  2],
              [Date.UTC(  2014  , 9 , 23  ),  3],
              [Date.UTC(  2014  , 9 , 27  ),  1],
              [Date.UTC(  2014  , 9 , 28  ),  1],
              [Date.UTC(  2014  , 9 , 29  ),  3],
              [Date.UTC(  2014  , 9 , 30  ),  1],
              [Date.UTC(  2014  , 10  , 5 ),  3],
              [Date.UTC(  2014  , 10  , 7 ),  2],
              [Date.UTC(  2014  , 10  , 9 ),  2],
              [Date.UTC(  2014  , 10  , 15  ),  2],
              [Date.UTC(  2014  , 10  , 17  ),  1],
              [Date.UTC(  2014  , 10  , 20  ),  2],
              [Date.UTC(  2014  , 10  , 21  ),  1],
              [Date.UTC(  2014  , 10  , 26  ),  1],
              [Date.UTC(  2014  , 10  , 31  ),  1],
              [Date.UTC(  2014  , 11  , 3 ),  4],
              [Date.UTC(  2014  , 11  , 4 ),  3],
              [Date.UTC(  2014  , 11  , 10  ),  1],
              [Date.UTC(  2014  , 11  , 14  ),  5],
              [Date.UTC(  2014  , 11  , 16  ),  1],
              [Date.UTC(  2014  , 11  , 17  ),  1],
              [Date.UTC(  2014  , 11  , 18  ),  1],
              [Date.UTC(  2014  , 11  , 27  ),  1],
              [Date.UTC(  2015  , 1 , 11  ),  2],
              [Date.UTC(  2015  , 1 , 12  ),  2],
              [Date.UTC(  2015  , 2 , 23  ),  2],
              [Date.UTC(  2015  , 4 , 14  ),  2]
            
            ]
        
        }]
    });
});