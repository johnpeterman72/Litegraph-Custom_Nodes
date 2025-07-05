// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial weight units (oz, lb) to metric (kg).
// Created: July 04, 2025, 12:48 PM CST

function WeightConverterNode() {
    this.addInput("Weight", "number");
    this.addOutput("Kilograms", "number");
    this.properties = {
        padding: 10,
        inputUnit: "ounces",
        units: ["ounces", "pounds"]
    };
    this.addWidget("combo", "Input Unit", "ounces", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Weight Converter";
    this.color = "#FF9800";
    this.bgcolor = "#F57C00";
    this.size = [200, 120];
    this.pos = [200, 500];
}

WeightConverterNode.prototype.onExecute = function() {
    var weight = this.getInputData(0) || 0;
    var factor = 1;
    switch (this.properties.inputUnit) {
        case "ounces": factor = 0.0283495; break;
        case "pounds": factor = 0.453592; break;
    }
    this.setOutputData(0, weight * factor);
};

WeightConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var weight = this.getInputData(0) || 0;
    var kilograms = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${weight} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Kilograms: ${kilograms.toFixed(2)} kg`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/weight", WeightConverterNode);