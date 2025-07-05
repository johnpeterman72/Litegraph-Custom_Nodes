// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial angle units (degrees) to metric (radians).
// Created: July 04, 2025, 12:48 PM CST

function AngleConverterNode() {
    this.addInput("Angle", "number");
    this.addOutput("Radians", "number");
    this.properties = {
        padding: 10,
        inputUnit: "degrees",
        units: ["degrees"]
    };
    this.addWidget("combo", "Input Unit", "degrees", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Angle Converter";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [200, 120];
    this.pos = [400, 500];
}

AngleConverterNode.prototype.onExecute = function() {
    var angle = this.getInputData(0) || 0;
    var factor = Math.PI / 180; // degrees to radians
    this.setOutputData(0, angle * factor);
};

AngleConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var angle = this.getInputData(0) || 0;
    var radians = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${angle} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Radians: ${radians.toFixed(2)} rad`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/angle", AngleConverterNode);