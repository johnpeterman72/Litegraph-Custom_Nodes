// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial velocity units (mph) to metric (m/s).
// Created: July 04, 2025, 12:48 PM CST

function VelocityConverterNode() {
    this.addInput("Velocity", "number");
    this.addOutput("MetersPerSecond", "number");
    this.properties = {
        padding: 10,
        inputUnit: "mph",
        units: ["mph"]
    };
    this.addWidget("combo", "Input Unit", "mph", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Velocity Converter";
    this.color = "#CDDC39";
    this.bgcolor = "#AFB42B";
    this.size = [200, 120];
    this.pos = [1000, 500];
}

VelocityConverterNode.prototype.onExecute = function() {
    var velocity = this.getInputData(0) || 0;
    var factor = 0.44704; // mph to m/s
    this.setOutputData(0, velocity * factor);
};

VelocityConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var velocity = this.getInputData(0) || 0;
    var metersPerSecond = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${velocity} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`m/s: ${metersPerSecond.toFixed(2)} m/s`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/velocity", VelocityConverterNode);