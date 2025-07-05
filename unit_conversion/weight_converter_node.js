// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial weight units (oz, lb) to metric (kg).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 7, 2025

function WeightConverterNode() {
    this.addInput("Weight", "number");
    this.addOutput("Kilograms", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "ounces"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["ounces", "pounds", "tons", "stones"] });
    
    this.title = "Weight Converter";
    this.color = "#FF9800";
    this.bgcolor = "#F57C00";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

WeightConverterNode.prototype.onExecute = function() {
    var weight = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "ounces": factor = 0.0283495; break;
        case "pounds": factor = 0.453592; break;
        case "tons": factor = 907.185; break; // short ton to kg
        case "stones": factor = 6.35029; break; // stone to kg
        default: factor = 0.0283495; // default to ounces
    }
    
    this.setOutputData(0, weight * factor);
};

WeightConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var weight = this.getInputData(0) || 0;
    var kilograms = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${weight} ${this.properties.inputUnit}`, 5, 15);
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
WeightConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/weight", WeightConverterNode);