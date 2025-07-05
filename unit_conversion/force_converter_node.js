// Metadata
// Author: Your Name
// Version: 1.0
// Description: A node that converts imperial force units (lbf) to metric (N).
// Created: July 04, 2025, 12:48 PM CST

function ForceConverterNode() {
    this.addInput("Force", "number");
    this.addOutput("Newtons", "number");
    this.properties = {
        padding: 10,
        inputUnit: "lbf",
        units: ["lbf"]
    };
    this.addWidget("combo", "Input Unit", "lbf", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Force Converter";
    this.color = "#8BC34A";
    this.bgcolor = "#689F38";
    this.size = [200, 120];
    this.pos = [700, 500];
}

ForceConverterNode.prototype.onExecute = function() {
    var force = this.getInputData(0) || 0;
    var factor = 4.44822; // lbf to N
    this.setOutputData(0, force * factor);
};

ForceConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var force = this.getInputData(0) || 0;
    var newtons = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${force} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Newtons: ${newtons.toFixed(2)} N`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/force", ForceConverterNode);