// Metadata
// Author: Inspired by https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts between any two length units, with selectable input and output units.
// Created: July 05, 2025, 11:42 AM CST

function UniversalLengthConverterNode() {
    this.addInput("Length", "number");
    this.addOutput("Converted Length", "number");
    this.properties = {
        padding: 50,
        inputUnit: "meters",
        outputUnit: "meters",
        units: [
            "nanometers", "micrometers", "millimeters", "centimeters", "meters", "kilometers",
            "inches", "feet", "yards", "miles", "nautical miles",
            "astronomical units", "light-years", "parsecs",
            "fathoms", "chains", "rods", "furlongs", "angstroms"
        ]
    };
    
    // Conversion factors to meters
    this.conversionFactors = {
        "nanometers": 1e-9,
        "micrometers": 1e-6,
        "millimeters": 1e-3,
        "centimeters": 1e-2,
        "meters": 1,
        "kilometers": 1e3,
        "inches": 0.0254,
        "feet": 0.3048,
        "yards": 0.9144,
        "miles": 1609.344,
        "nautical miles": 1852,
        "astronomical units": 149597870700,
        "light-years": 9460730472580800,
        "parsecs": 30856775814671900,
        "fathoms": 1.8288,
        "chains": 20.1168,
        "rods": 5.0292,
        "furlongs": 201.168,
        "angstroms": 1e-10
    };

    // Add combo widget for input unit
    this.addWidget(
        "combo",
        "Input Unit",
        this.properties.inputUnit,
        (value) => {
            this.properties.inputUnit = value;
            this.setDirtyCanvas(true, true);
            this.graph.setDirtyCanvas(true);
        },
        { values: this.properties.units }
    );

    // Add combo widget for output unit
    this.addWidget(
        "combo",
        "Output Unit",
        this.properties.outputUnit,
        (value) => {
            this.properties.outputUnit = value;
            this.setDirtyCanvas(true, true);
            this.graph.setDirtyCanvas(true);
        },
        { values: this.properties.units }
    );

    this.title = "ccccUniversal Length Converter";
    this.size = [100, 100];
    this.pos = [100, 100];
}

UniversalLengthConverterNode.prototype.onExecute = function() {
    var length = this.getInputData(0) || 0;
    // Convert input to meters
    var meters = length * this.conversionFactors[this.properties.inputUnit];
    // Convert meters to output unit
    var output = meters / this.conversionFactors[this.properties.outputUnit];
    this.setOutputData(0, output);
};

UniversalLengthConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var length = this.getInputData(0) || 0;
    // Perform conversion for display
    var meters = length * this.conversionFactors[this.properties.inputUnit];
    var output = meters / this.conversionFactors[this.properties.outputUnit];
    
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${length.toFixed(2)} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Output: ${output.toFixed(2)} ${this.properties.outputUnit}`, 5, 40);

    ctx.restore();
    // Set node size dynamically
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, 120 + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/universal_length", UniversalLengthConverterNode);