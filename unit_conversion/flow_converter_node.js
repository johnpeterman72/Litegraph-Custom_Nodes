// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial flow units (gpm) to metric (L/s).
// Created: July 04, 2025, 12:48 PM CST

function FlowConverterNode() {
    this.addInput("Flow", "number");
    this.addOutput("LitersPerSecond", "number");
    this.properties = {
        padding: 10,
        inputUnit: "gpm",
        units: ["gpm"] // Gallons per minute
    };
    this.addWidget("combo", "Input Unit", "gpm", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Flow Converter";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [200, 120];
    this.pos = [300, 500];
}

FlowConverterNode.prototype.onExecute = function() {
    var flow = this.getInputData(0) || 0;
    var factor = 0.0630902; // gpm to L/s
    this.setOutputData(0, flow * factor);
};

FlowConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var flow = this.getInputData(0) || 0;
    var litersPerSecond = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${flow} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`L/s: ${litersPerSecond.toFixed(2)} L/s`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/flow", FlowConverterNode);