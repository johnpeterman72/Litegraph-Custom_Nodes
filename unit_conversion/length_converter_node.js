// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial length units (in, ft, yd, mi) to metric (m).
// Created: July 04, 2025, 12:48 PM CST

function LengthConverterNode() {
    this.addInput("Length", "number");
    this.addOutput("Meters", "number");
    this.properties = {
        padding: 150,
        inputUnit: "inches",
        units: ["inches", "feet", "yards", "miles"]
    };
    this.addWidget(
        "combo",
        "Input Unit",
        this.properties.inputUnit, // Initial value
        (value) => {
            this.properties.inputUnit = value;
            this.setDirtyCanvas(true, true); // Trigger canvas redraw
            this.graph.setDirtyCanvas(true); // Ensure graph execution
        },
        { values: this.properties.units }
    );
    this.title = "Length Converter";
    this.size = [500, 500];
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
    var meters = length; // Default value
    switch (this.properties.inputUnit) {
        case "inches": meters = length * 0.0254; break;
        case "feet": meters = length * 0.3048; break;
        case "yards": meters = length * 0.9144; break;
        case "miles": meters = length * 1609.344; break;
    }
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${length} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`Meters: ${meters.toFixed(2)} m`, 5, 40);

    ctx.restore();
    // Adjust size dynamically; assuming default node height if computeSize is unavailable
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, 100 + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/length", LengthConverterNode);
