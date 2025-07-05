// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial force units (lbf) to metric (N).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function ForceConverterNode() {
    this.addInput("Force", "number");
    this.addOutput("Newtons", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "lbf"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["lbf", "kgf", "N"] });
    
    this.title = "Force Converter";
    this.color = "#8BC34A";
    this.bgcolor = "#689F38";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

ForceConverterNode.prototype.onExecute = function() {
    var force = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "lbf": factor = 4.44822; break; // lbf to N
        case "kgf": factor = 9.80665; break; // kgf to N  
        case "N": factor = 1; break; // N to N
        default: factor = 1;
    }
    
    this.setOutputData(0, force * factor);
};

ForceConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var force = this.getInputData(0) || 0;
    var newtons = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${force} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Newtons: ${newtons.toFixed(4)} N`, 5, 30);

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
ForceConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/force", ForceConverterNode);