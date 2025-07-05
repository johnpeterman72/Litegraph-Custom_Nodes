// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial energy units (BTU) to metric (J).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function EnergyConverterNode() {
    this.addInput("Energy", "number");
    this.addOutput("Joules", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "BTU"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["BTU", "kWh", "cal"] });
    
    this.title = "Energy Converter";
    this.color = "#3F51B5";
    this.bgcolor = "#303F9F";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

EnergyConverterNode.prototype.onExecute = function() {
    var energy = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "BTU": factor = 1055.06; break; // BTU to J
        case "kWh": factor = 3600000; break; // kWh to J  
        case "cal": factor = 4.184; break; // cal to J
        default: factor = 1;
    }
    
    this.setOutputData(0, energy * factor);
};

EnergyConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var energy = this.getInputData(0) || 0;
    var joules = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${energy} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Joules: ${joules.toFixed(2)} J`, 5, 30);

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
EnergyConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/energy", EnergyConverterNode);