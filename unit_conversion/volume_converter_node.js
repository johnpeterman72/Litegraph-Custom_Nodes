// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial volume units (fl oz, gal) to metric (L).
// Created: July 04, 2025, 12:48 PM CST

function VolumeConverterNode() {
    this.addInput("Volume", "number");
    this.addOutput("Liters", "number");
    this.properties = {
        padding: 10,
        inputUnit: "fl oz",
        units: ["fl oz", "gallons"]
    };
    this.addWidget("combo", "Input Unit", "fl oz", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Volume Converter";
    this.color = "#00BCD4";
    this.bgcolor = "#0097A7";
    this.size = [200, 120];
    this.pos = [1200, 500];
}

VolumeConverterNode.prototype.onExecute = function() {
    var volume = this.getInputData(0) || 0;
    var factor = 1;
    switch (this.properties.inputUnit) {
        case "fl oz": factor = 0.0295735; break;
        case "gallons": factor = 3.78541; break;
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
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${volume} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Liters: ${liters.toFixed(2)} L`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/volume", VolumeConverterNode);