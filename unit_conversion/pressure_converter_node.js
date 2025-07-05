// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial pressure units (psi) to metric (Pa).
// Created: July 04, 2025, 12:48 PM CST

function PressureConverterNode() {
    this.addInput("Pressure", "number");
    this.addOutput("Pascals", "number");
    this.properties = {
        padding: 10,
        inputUnit: "psi",
        units: ["psi"]
    };
    this.addWidget("combo", "Input Unit", "psi", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Pressure Converter";
    this.color = "#9E9E9E";
    this.bgcolor = "#757575";
    this.size = [200, 120];
    this.pos = [900, 500];
}

PressureConverterNode.prototype.onExecute = function() {
    var pressure = this.getInputData(0) || 0;
    var factor = 6894.76; // psi to Pa
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
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${pressure} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Pascals: ${pascals.toFixed(2)} Pa`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/pressure", PressureConverterNode);