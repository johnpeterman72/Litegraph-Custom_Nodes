// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial velocity units (mph) to metric (m/s).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function VelocityConverterNode() {
    this.addInput("Velocity", "number");
    this.addOutput("MetersPerSecond", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "mph"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["mph", "km/h", "ft/s", "knots"] });
    
    this.title = "Velocity Converter";
    this.color = "#CDDC39";
    this.bgcolor = "#AFB42B";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

VelocityConverterNode.prototype.onExecute = function() {
    var velocity = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "mph": factor = 0.44704; break; // mph to m/s
        case "km/h": factor = 0.277778; break; // km/h to m/s
        case "ft/s": factor = 0.3048; break; // ft/s to m/s
        case "knots": factor = 0.514444; break; // knots to m/s
        default: factor = 1;
    }
    
    this.setOutputData(0, velocity * factor);
};

VelocityConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var velocity = this.getInputData(0) || 0;
    var metersPerSecond = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${velocity} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`m/s: ${metersPerSecond.toFixed(4)} m/s`, 5, 30);

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
VelocityConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/velocity", VelocityConverterNode);