// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial area units (sq in, sq ft, acres) to metric (m²).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function AreaConverterNode() {
    this.addInput("Area", "number");
    this.addOutput("SquareMeters", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "sq inches"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["sq inches", "sq feet", "acres"] });
    
    this.title = "Area Converter";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

AreaConverterNode.prototype.onExecute = function() {
    var area = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "sq inches": factor = 0.00064516; break;
        case "sq feet": factor = 0.092903; break;
        case "acres": factor = 4046.86; break;
        default: factor = 1;
    }
    
    this.setOutputData(0, area * factor);
};

AreaConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var area = this.getInputData(0) || 0;
    var squareMeters = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${area} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`m²: ${squareMeters.toFixed(4)} m²`, 5, 30);

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
AreaConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/area", AreaConverterNode);