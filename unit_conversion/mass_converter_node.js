// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial mass units (oz, lb) to metric (kg).
// Created: July 04, 2025, 12:48 PM CST

function MassConverterNode() {
    this.addInput("Mass", "number");
    this.addOutput("Kilograms", "number");
    this.properties = {
        padding: 10,
        inputUnit: "ounces",
        units: ["ounces", "pounds"]
    };
    this.addWidget("combo", "Input Unit", "ounces", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Mass Converter";
    this.color = "#FFEB3B";
    this.bgcolor = "#FBC02D";
    this.size = [200, 120];
    this.pos = [1100, 500];
}

MassConverterNode.prototype.onExecute = function() {
    var mass = this.getInputData(0) || 0;
    var factor = 1;
    switch (this.properties.inputUnit) {
        case "ounces": factor = 0.0283495; break;
        case "pounds": factor = 0.453592; break;
    }
    this.setOutputData(0, mass * factor);
};

MassConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var mass = this.getInputData(0) || 0;
    var kilograms = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${mass} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Kilograms: ${kilograms.toFixed(2)} kg`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/mass", MassConverterNode);