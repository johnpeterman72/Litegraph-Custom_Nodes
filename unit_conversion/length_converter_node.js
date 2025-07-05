// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial length units (in, ft, yd, mi) to metric (m).
// Created: July 04, 2025, 12:48 PM CST

function LengthConverterNode() {
    this.addInput("Length", "number");
    this.addOutput("Meters", "number");
    this.properties = {
        padding: 10,
        inputUnit: "inches",
        units: ["inches", "feet", "yards", "miles"]
    };
    this.addWidget("combo", "Input Unit", "inches", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Length Converter";
    this.color = "#4CAF50";
    this.bgcolor = "#2E7D32";
    this.size = [200, 120];
    this.pos = [100, 500];
}

LengthConverterNode.prototype.onExecute = function() {
    var length = this.getInputData(0) || 0;
    var factor = 1;
    switch (this.properties.inputUnit) {
        case "inches": factor = 0.0254; break;
        case "feet": factor = 0.3048; break;
        case "yards": factor = 0.9144; break;
        case "miles": factor = 1609.344; break;
    }
    this.setOutputData(0, length * factor);
};

LengthConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var length = this.getInputData(0) || 0;
    var meters = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${length} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Meters: ${meters.toFixed(2)} m`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/length", LengthConverterNode);