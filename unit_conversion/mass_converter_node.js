// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial mass units (oz, lb) to metric (kg).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function MassConverterNode() {
    this.addInput("Mass", "number");
    this.addOutput("Kilograms", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "ounces"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["ounces", "pounds", "grams", "tonnes"] });
    
    this.title = "Mass Converter";
    this.color = "#FFEB3B";
    this.bgcolor = "#FBC02D";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

MassConverterNode.prototype.onExecute = function() {
    var mass = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "ounces": factor = 0.0283495; break; // oz to kg
        case "pounds": factor = 0.453592; break; // lb to kg
        case "grams": factor = 0.001; break; // g to kg
        case "tonnes": factor = 1000; break; // tonnes to kg
        default: factor = 1;
    }
    
    this.setOutputData(0, mass * factor);
};

MassConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var mass = this.getInputData(0) || 0;
    var kilograms = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${mass} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Kilograms: ${kilograms.toFixed(4)} kg`, 5, 30);

    ctx.restore();
    
    // ✅ Only resize if necessary
    var minWidth = 200;
    var minHeight = 120;
    if (this.size[0] < minWidth || this.size[1] < minHeight) {
        this.size = [Math.max(this.size[0], minWidth), Math.max(this.size[1], minHeight)];
        this.setDirtyCanvas(true, true);
    }
};

// ✅ Make node resizable
MassConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/mass", MassConverterNode);