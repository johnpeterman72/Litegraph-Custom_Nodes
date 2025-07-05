// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial energy units (BTU) to metric (J).
// Created: July 04, 2025, 12:48 PM CST

function EnergyConverterNode() {
    this.addInput("Energy", "number");
    this.addOutput("Joules", "number");
    this.properties = {
        padding: 10,
        inputUnit: "BTU",
        units: ["BTU"]
    };
    this.addWidget("combo", "Input Unit", "BTU", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Energy Converter";
    this.color = "#3F51B5";
    this.bgcolor = "#303F9F";
    this.size = [200, 120];
    this.pos = [600, 500];
}

EnergyConverterNode.prototype.onExecute = function() {
    var energy = this.getInputData(0) || 0;
    var factor = 1055.06; // BTU to J
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
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${energy} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Joules: ${joules.toFixed(2)} J`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/energy", EnergyConverterNode);