// This use dc and crossfilter concept , coded by Rajat
//
function print_filter(filter) {
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }


  d3.csv('/static/data/saleonly.csv',function(error,data){

    if(error) return console.warn(error);

   // console.log(data);

  //  var parseDate = d3.time.format('%Y/%m/%d');

    data.forEach(function(d){
        d.Cust_Id=+d.Cust_Id;
        d.Prod_Code=+data.Prod_Code;
        d.BU=d.BU;
         tempDate = new Date(d.Purchase_Date);
         d.date = tempDate;

       // data.purchasedate=parseDate(data.PURCHASE_DATE);
        d.Invoice_no=+d.Invoice_no;
        d.Sold_Units=+d.Sold_Units;
        d.Unit_Price=+d.Unit_Price;
        d.Total_Sale=+d.Total_Sale;
       // console.log(typeof tempDate);
    });


    d3.csv("/static/data/saleonly.csv", function(d) {
        
        return {
          Cust_Id : +d.Cust_Id,
          Prod_Code : +d.Prod_Code,
          BU:d.BU,
          Purchase_Date:d.Purchase_Date,
          Invoice_no:+d.Invoice_no,
          Sold_Units:+d.Sold_Units,
          Unit_Price:+d.Unit_Price,
          Total_Sale:+d.Total_Sale,
        
        };
      }, 
      function(dataJ) {
        console.log(dataJ);
      



    // Create a crossfilter instance
var cf = crossfilter(dataJ);

var all = cf.groupAll();

//Total Sales for 2 quarters
var sumTotal = all.reduceSum(function(d){ return d.Total_Sale; }).value();
console.log(sumTotal);


// Define Dimensions
var buTypeDim = cf.dimension( function (d) { return d.BU;})
var saleTypeDim = cf.dimension( function(d){ return d.Total_Sale;})
var dateTypeDim = cf.dimension(function(d){ return d.date;})
var soldunitsTypeDim = cf.dimension(function(d){ return d.Sold_Units;})
var prodcodeTypeDim=cf.dimension(function(d){ return d.Prod_Code;})
//Date dimension
var dateDimension = cf.dimension(function(d){ return d.date;});

//Group business and sales
var buTypeGroup = buTypeDim.group().reduceCount(function(d){ return d.BU;});
var saleTypeGroup = buTypeDim.group().reduceSum(function(d) {return Math.round(d.Total_Sale);});

//Render Row Chart By BU, number of sales transacted
var buTypeChart = dc.rowChart("#BuType")
                    .width(400)
                    .height(200)
                    .elasticX(true)
                    .dimension(buTypeDim)
                    .group(buTypeGroup)
                    .colors(d3.scale.category10());
                  
//RenderRow chart by Revenue each BU brings in
 var saleTypeChart = dc.rowChart('#SaleType')
                          .width(500)
                          .height(200)
                         .elasticX(true)
                        .dimension(saleTypeDim)
                        .group(saleTypeGroup)
                        //.data(function(group){return group.top(10);})
                        .colors(d3.scale.category10())
                      

    //For Pie chart

    var typeDimension = cf.dimension(function(d){ return d.BU; });
    var typeGroup = typeDimension.group().reduceSum(function(d){ return d.Total_Sale; });
    

var pieChart = dc.pieChart("#PieType")
                    .width(500)
                    .height(200)
                   // .radius(60)
                   // .innerRadius(80)
                   // .renderLabel(false)
                    .title(function(d){ console.log(d); return d.key + ':$'+Math.round(d.value); })
                    .colors(d3.scale.category10())
                    .transitionDuration(1500)
                    .dimension(typeDimension)
                    .group(typeGroup)
                    .legend(dc.legend().x(1200).y(5).itemHeight(12).gap(5));
      

// For bubble chart
var scatterDimension = cf.dimension(function(d){ return [d.Sold_Units,d.Unit_Price]; });
var scatterGroup = scatterDimension.group().reduceSum(function(d){return d.Sold_Units >200;});

//For scatter chart
var scatDim = cf.dimension(function(d){ return [d.Total_Sale,d.Sold_Units]; });
var scatGroup = scatDim.group();

//Render bubble chart , note products are filtered based on volume above 200 sold
var bubble = dc.bubbleChart("#BubbleType")
    .width(580)
    .height(320)
    .margins({top:40,bottom:60,right:10,left:40})
    .dimension(scatterDimension)
    .group(scatterGroup)
    .clipPadding(0)
    //.colorAccessor(function(d){ return d.key[0]; })
     .colors(d3.scale.category20b())
    //.colors(colorbrewer.RdPu[3]).colorDomain([220,400])
    .keyAccessor(function(d){ return d.key[0]; })
    .valueAccessor(function(d){ return d.key[1]; })
    .radiusValueAccessor(function(d){ return d.value; })
    .maxBubbleRelativeSize(0.05)
    .yAxisLabel("Unit_Price")
    .xAxisLabel("Sold_Units")
    .title(function(d){ return 'x: '+d.key[0]+', y: '+d.key[1]+', val: '+d.value; })
    .r(d3.scale.linear().domain([2,10]))
    .y(d3.scale.linear().domain([0,100]))
    .x(d3.scale.linear().domain([210,700]));
    bubble.yAxis().ticks(5);


//Render bar chart , another way of representing sales revenue by business
var bar = dc.barChart('#BarType')
            .width(300)
            .height(300)
            .margins({top:10, right:10, bottom:40, left:100})
            .dimension(buTypeDim)
            .group(saleTypeGroup)
            .x(d3.scale.ordinal().domain(['Healthcare','Food Services','JanSan']))
            .colorAccessor(function(d){ return d.key[0]; })
            .colors(d3.scale.category20b())
            .xUnits(dc.units.ordinal)
            .barPadding(0.2)
            .outerPadding(0.1);

  //Render scatter chart another way of presenting sale by product
 var scatter = dc.scatterPlot("#ScatterType")
                .width(580)
                .height(300)
                .margins({top:10,bottom:40,right:20,left:40})
                .brushOn(false)
                .dimension(scatDim)
                .group(scatGroup)
                .symbolSize(8)
                .clipPadding(10)
                .colorAccessor(function(d){ return d.value; })
                .colors(d3.scale.category20b())
                .yAxisLabel("Sold_Units")
                .xAxisLabel("Total Sales")
                .x(d3.scale.linear().domain([0,15000]));
                scatter.yAxis().ticks(20);
 
// Someday will complete table

//var dateTable = dc.dataTable('#sale-table')
//                  .width(300)
 //                 .height(300)
  //                .dimension(dateDimension)
  //                .showGroups(false)
      // .size(5)
   //             .group(function(d){ return d.date; })
   //             .columns([{label:'Date',format: function(d){ return d.date.getMonth()+'/'+d.date.getFullYear(); }},
    //            'BU',
   //             'Total_Sale',
   //             ])
    //           .sortBy(function(d){ return d.date; })
    //           .order(d3.ascending);
                  
// Most important step of all, render your graphs all at 1 instance , aha :)
dc.renderAll();
  });

});

