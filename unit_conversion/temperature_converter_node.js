// Metadata
// Author: Your Name
// Version: 1.0
// Description: A node that converts temperature between Celsius, Fahrenheit, and Kelvin scales and displays the conversion equations.
// Created: July 04, 2025, 12:43 PM CST

function TemperatureConverterNode() {
    this.addInput("Temperature", "number");
    this.addOutput("Celsius", "number");
    this.addOutput("Fahrenheit", "number");
    this.addOutput("Kelvin", "number");
    this.properties = {
        padding: 10,
        inputUnit: "Celsius", // Default input unit
        units: ["Celsius", "Fahrenheit", "Kelvin"]
    };
    this.addWidget("combo", "Input Unit", "Celsius", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Temp Converter";
    this.color = "#FF5722";
    this.bgcolor = "#E64A19";
    this.size = [220, 160];
    this.pos = [100, 400];
}

TemperatureConverterNode.prototype.onExecute = function() {
    var temp = this.getInputData(0) || 0;
    var celsius, fahrenheit, kelvin;

    // Convert based on input unit
    switch (this.properties.inputUnit) {
        case "Celsius":
            celsius = temp;
            fahrenheit = (temp * 9/5) + 32;
            kelvin = temp + 273.15;
            break;
        case "Fahrenheit":
            celsius = (temp - 32) * 5/9;
            fahrenheit = temp;
            kelvin = (temp - 32) * 5/9 + 273.15;
            break;
        case "Kelvin":
            celsius = temp - 273.15;
            fahrenheit = (temp - 273.15) * 9/5 + 32;
            kelvin = temp;
            break;
    }

    this.setOutputData(0, celsius);
    this.setOutputData(1, fahrenheit);
    this.setOutputData(2, kelvin);
};

TemperatureConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var temp = this.getInputData(0) || 0;
    var celsius = this.getOutputData(0) || 0;
    var fahrenheit = this.getOutputData(1) || 0;
    var kelvin = this.getOutputData(2) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${temp} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Celsius: ${celsius.toFixed(2)} °C`, 5, 40);
    ctx.fillText(`Fahrenheit: ${fahrenheit.toFixed(2)} °F`, 5, 60);
    ctx.fillText(`Kelvin: ${kelvin.toFixed(2)} K`, 5, 80);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/temp_converter", TemperatureConverterNode);