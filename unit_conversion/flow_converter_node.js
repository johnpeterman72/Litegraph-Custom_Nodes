// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial flow units (gpm) to metric (L/s).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function FlowConverterNode() {
    this.addInput("Flow", "number");
    this.addOutput("LitersPerSecond", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "gpm"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["gpm", "cfm", "L/min"] });
    
    this.title = "Flow Converter";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

FlowConverterNode.prototype.onExecute = function() {
    var flow = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "gpm": factor = 0.0630902; break; // gpm to L/s
        case "cfm": factor = 0.471947; break; // cfm to L/s
        case "L/min": factor = 0.0166667; break; // L/min to L/s
        default: factor = 1;
    }
    
    this.setOutputData(0, flow * factor);
};

FlowConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var flow = this.getInputData(0) || 0;
    var litersPerSecond = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${flow} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`L/s: ${litersPerSecond.toFixed(4)} L/s`, 5, 30);

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
FlowConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/flow", FlowConverterNode);