// from week 14 and 15 - Class 1-3 excercise 05; forEach

//DROPDOWN MENU FIRST//
d3.json("samples.json").then(function(passdata)
{
  passdata.names.forEach(function(passdata)
  {
    d3.select("#Dataset").append("option")
      .property("value", passdata)  
      .text(passdata)
  });
//https://stackoverflow.com/questions/16823757/d3-selectelement-not-working-when-code-above-the-html-element
//ASK tj, dk, OR ERIC (OR COOPER ON "OPTION")


//INITIALIZE TABLE AND CHARTS//
table(passdata.names[0]);
charts(passdata.names[0]);

});

//AS PER COOPER --> optionChanged, then "getElement" ById -- not class //
function optionChanged(passdata)
{
  table(passdata);
  charts(passdata);
}

//CREATE TABLE//
function table(data)
{
    d3.json("samples.json").then(function(passdata)
    {

      var selection = passdata.metadata
        .filter(input => input.id == data)[0];
      
      // console.log(selection);

      document.getElementById('id').innerHTML = selection.id;
      document.getElementById('ethnicity').innerHTML = selection.ethnicity;
      document.getElementById('gender').innerHTML = selection.gender;
      document.getElementById('age').innerHTML = selection.age;
      document.getElementById('location').innerHTML = selection.location;
      document.getElementById('bbtype').innerHTML = selection.bbtype;
      document.getElementById('wfreq').innerHTML = selection.wfreq;
    
  });
};

//CHARTS//
  function charts(data) 
  {
    d3.json("samples.json").then(function(passdata)
    {      
      var selection = passdata.samples
        .filter(input => input.id == data)[0];
      
        // BUBBLE CHART //
      var bubble_chart = 
      [
        {
          x: selection.otu_ids,
          y: selection.sample_values,
          mode: "markers",
          text: selection.otu_labels,
          marker: {
            size: selection.sample_values,
            color:"rgb(142,124,195)"
          }
        }
      ];

      var bubble_layout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "y",
      };
    
      Plotly.newPlot("bubble_chart", bubble_chart, bubble_layout);      
      
      //BAR CHART //ARRPW.JS WEEK 14 DAY 2, EXC 6
      var bar_chart = 
      [
        {
          x: selection.sample_values.slice(0,10),
          y: selection.otu_ids.slice(0, 10)
            .map(sub_id => `OTU # ${sub_id}`),
          orientation: "h",
          type: "bar",
          text: selection.otu_labels,
          marker:
          {
            color:"rgb(142,123,195)",
            opacity: 0.6,
            line: {
              color:'rg(8,48,107)',
              width:1.5
            }
          }
          ,
        }
      ];
  
      var layout_bar_chart = {
        title: "Top 10 Bacteria Cultures",
      };
  
      Plotly.newPlot("bar_chart", bar_chart, layout_bar_chart);

    });
  }