/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - sample_values
 * index 3 - otu_labels
*/
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}

// convert int to UTO # format
function int2label(num) {
  return "UTO" + num.toString();
}

  
d3.json("samples.json").then(function(data) {
  var ids = unpack(data.samples, 'id');
  for (var i = 0; i < ids.length; i++) {
    $('#selDataset').append($('<option></option>').val(i).html(ids[i]));
  }


// Grab values from the response json object to build the plots
var metadata =data.metadata;
var sample_values = unpack(data.samples, 'sample_values');
var otu_ids = unpack(data.samples, 'otu_ids');
var otu_labels= unpack(data.samples, 'otu_labels');


// Display the default plot
function init() {
  var initdata = [{
    x: sample_values[0].slice(0, 10).reverse(),
    y: otu_ids[0].slice(0, 10).map(int2label).reverse(),
    type: "bar",
    text: otu_labels[0],
    hovertemplate: '%{text}',
    orientation: 'h',
  }];
  //console.log(sample_values[0])
  //console.log( otu_ids[0])
  //console.log( otu_labels[0])
  
  var layout = {
     title: "'Bar' Chart"
  };  
  
  Plotly.newPlot("bar", initdata, layout);
}



// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  //console.log(sample_values[dataset].slice(0, 10).reverse());

  var newdata = [{
    x: sample_values[dataset].slice(0, 10).reverse(),
    y: otu_ids[dataset].slice(0, 10).map(int2label).reverse(),
    type: "bar",
    text: otu_labels[dataset],
    hovertemplate: '%{text}',
    orientation: 'h',
  }];

  // Update the restyled plot's values
  Plotly.restyle("bar", "x", [sample_values[dataset].slice(0, 10).reverse()]);
  Plotly.restyle("bar", "y", [otu_ids[dataset].slice(0, 10).map(int2label).reverse()]);

  //Display each key-value pair from the metadata JSON object
  $('#sample-metadata').text("");
  $('#sample-metadata').append('id: ' + data.metadata[dataset]["id"] + '</br>' + 
        'ethnicity: ' + data.metadata[dataset]["ethnicity"] + '</br>' + 
        'gender: ' + data.metadata[dataset]["gender"] + '</br>' + 
        'age: ' + data.metadata[dataset]["age"] + '</br>' + 
        'location: ' + data.metadata[dataset]["location"] + '</br>' + 
        'bbtype: ' + data.metadata[dataset]["bbtype"] + '</br>' + 
        'wfreq: ' + data.metadata[dataset]["wfreq"]);
};





init();

});

  
    
    
    
    
   