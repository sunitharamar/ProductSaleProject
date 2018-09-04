
function loadsample(sample){
    var url = `/sample/${sample}`;
    Plotly.d3.json(url,function(error,response){
        if(error){ 
            return console.warn(error);
        }
       
    });
}
