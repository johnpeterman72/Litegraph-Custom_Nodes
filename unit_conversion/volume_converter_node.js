// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.1 - Fixed combo widget and sizing issues
// Description: A node that converts imperial volume units (fl oz, gal, cu ft) to metric (L).
// Created: July 04, 2025, 12:48 PM CST
// Fixed: January 6, 2025

function VolumeConverterNode() {
    this.addInput("Volume", "number");
    this.addOutput("Liters", "number");
    
    this.properties = {
        padding: 10,
        inputUnit: "fl oz"
    };
    
    // ✅ Fixed combo widget with proper binding
    this.addWidget("combo", "Input Unit", this.properties.inputUnit, function(v) {
        this.properties.inputUnit = v;
        this.setDirtyCanvas(true, true);
    }.bind(this), { values: ["fl oz", "gallons", "cu feet", "cu inches"] });
    
    this.title = "Volume Converter";
    this.color = "#00BCD4";
    this.bgcolor = "#0097A7";
    this.size = [200, 120];
    this.resizable = true; // ✅ Allow manual resizing
}

VolumeConverterNode.prototype.onExecute = function() {
    var volume = this.getInputData(0) || 0;
    var factor = 1;
    
    switch (this.properties.inputUnit) {
        case "fl oz": factor = 0.0295735; break;
        case "gallons": factor = 3.78541; break;
        case "cu feet": factor = 28.3168; break;
        case "cu inches": factor = 0.0163871; break;
        default: factor = 1;
    }
    
    this.setOutputData(0, volume * factor);
};

VolumeConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var volume = this.getInputData(0) || 0;
    var liters = this.getOutputData(0) || 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(`Input: ${volume} ${this.properties.inputUnit}`, 5, 15);
    ctx.fillText(`Liters: ${liters.toFixed(4)} L`, 5, 30);

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
VolumeConverterNode.prototype.onResize = function(size) {
    var minWidth = 200;
    var minHeight = 120;
    this.size[0] = Math.max(size[0], minWidth);
    this.size[1] = Math.max(size[1], minHeight);
};

LiteGraph.registerNodeType("convert/volume", VolumeConverterNode);