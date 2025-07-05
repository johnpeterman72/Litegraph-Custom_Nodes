// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial power units (hp) to metric (W).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function PowerConverterNode() {
    this.addInput("Power", "number");
    this.addOutput("Watts", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "hp"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["hp", "kW", "BTU/hr"] });
    
    this.title = "Power Converter";
    this.color = "#F44336";
    this.bgcolor = "#D32F2F";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

PowerConverterNode.prototype.onExecute = function() {
    var power = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "hp": factor = 745.7; break; // hp to W
        case "kW": factor = 1000; break; // kW to W
        case "BTU/hr": factor = 0.293071; break; // BTU/hr to W
        default: factor = 1;
    }
    
    this.setOutputData(0, power * factor);
};

PowerConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var power = this.getInputData(0) || 0;
    var watts = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${power} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Watts: ${watts.toFixed(2)} W`, 5, 30);

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
PowerConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/power", PowerConverterNode);