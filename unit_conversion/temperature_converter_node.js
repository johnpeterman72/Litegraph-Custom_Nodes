// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts temperature between Celsius, Fahrenheit, and Kelvin scales and displays the conversion equations.
// Created: July 04, 2025, 12:43 PM CST
// Fixed: January 7, 2025

function TemperatureConverterNode() {
    this.addInput("Temperature", "number");
    this.addOutput("Celsius", "number");
    this.addOutput("Fahrenheit", "number");
    this.addOutput("Kelvin", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "Celsius" // Default input unit
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["Celsius", "Fahrenheit", "Kelvin"] });
    
    this.title = "Temp Converter";
    this.color = "#FF5722";
    this.bgcolor = "#E64A19";
    this.size = [220, 160];
    this.resizable = true; // ✅ Allow manual resizing
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
        default:
            celsius = temp;
            fahrenheit = (temp * 9/5) + 32;
            kelvin = temp + 273.15;
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
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${temp} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Celsius: ${celsius.toFixed(2)} °C`, 5, 30);
    ctx.fillText(`Fahrenheit: ${fahrenheit.toFixed(2)} °F`, 5, 45);
    ctx.fillText(`Kelvin: ${kelvin.toFixed(2)} K`, 5, 60);

    ctx.restore();
    
    // ✅ Only resize if necessary
    var minWidth = 220;
    var minHeight = 160;
    if (this.size[0] < minWidth || this.size[1] < minHeight) {
        this.size = [Math.max(this.size[0], minWidth), Math.max(this.size[1], minHeight)];
        this.setDirtyCanvas(true, true);
    }
};

// ✅ Make node resizable
TemperatureConverterNode.prototype.onResize = function(size) {
    var minWidth = 220;
    var minHeight = 160;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("thermo/temp_converter", TemperatureConverterNode);