// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial angle units (degrees) to metric (radians).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function AngleConverterNode() {
    this.addInput("Angle", "number");
    this.addOutput("Radians", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "degrees"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["degrees"] });
    
    this.title = "Angle Converter";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

AngleConverterNode.prototype.onExecute = function() {
    var angle = this.getInputData(0) || 0;
    var factor = Math.PI / 180; // degrees to radians
    this.setOutputData(0, angle * factor);
};

AngleConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var angle = this.getInputData(0) || 0;
    var radians = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${angle} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Radians: ${radians.toFixed(4)} rad`, 5, 30);

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
AngleConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/angle", AngleConverterNode);