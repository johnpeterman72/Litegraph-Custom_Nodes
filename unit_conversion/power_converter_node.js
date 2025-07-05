// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial power units (hp) to metric (W).
// Created: July 04, 2025, 12:48 PM CST

function PowerConverterNode() {
    this.addInput("Power", "number");
    this.addOutput("Watts", "number");
    this.properties = {
        padding: 10,
        inputUnit: "hp",
        units: ["hp"]
    };
    this.addWidget("combo", "Input Unit", "hp", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Power Converter";
    this.color = "#F44336";
    this.bgcolor = "#D32F2F";
    this.size = [200, 120];
    this.pos = [800, 500];
}

PowerConverterNode.prototype.onExecute = function() {
    var power = this.getInputData(0) || 0;
    var factor = 745.7; // hp to W
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
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${power} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Watts: ${watts.toFixed(2)} W`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/power", PowerConverterNode);