// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial pressure units (psi) to metric (Pa).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function PressureConverterNode() {
    this.addInput("Pressure", "number");
    this.addOutput("Pascals", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "psi"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["psi", "bar", "atm", "kPa"] });
    
    this.title = "Pressure Converter";
    this.color = "#9E9E9E";
    this.bgcolor = "#757575";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

PressureConverterNode.prototype.onExecute = function() {
    var pressure = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "psi": factor = 6894.76; break; // psi to Pa
        case "bar": factor = 100000; break; // bar to Pa
        case "atm": factor = 101325; break; // atm to Pa
        case "kPa": factor = 1000; break; // kPa to Pa
        default: factor = 1;
    }
    
    this.setOutputData(0, pressure * factor);
};

PressureConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var pressure = this.getInputData(0) || 0;
    var pascals = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${pressure} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Pascals: ${pascals.toFixed(2)} Pa`, 5, 30);

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
PressureConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/pressure", PressureConverterNode);