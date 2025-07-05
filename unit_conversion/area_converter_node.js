// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that converts imperial area units (sq in, sq ft, acres) to metric (m²).
// Created: July 04, 2025, 12:48 PM CST

function AreaConverterNode() {
    this.addInput("Area", "number");
    this.addOutput("SquareMeters", "number");
    this.properties = {
        padding: 10,
        inputUnit: "sq inches",
        units: ["sq inches", "sq feet", "acres"]
    };
    this.addWidget("combo", "Input Unit", "sq inches", function(v) {
        this.properties.inputUnit = v;
    }, { values: this.properties.units });
    this.title = "Area Converter";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [200, 120];
    this.pos = [500, 500];
}

AreaConverterNode.prototype.onExecute = function() {
    var area = this.getInputData(0) || 0;
    var factor = 1;
    switch (this.properties.inputUnit) {
        case "sq inches": factor = 0.00064516; break;
        case "sq feet": factor = 0.092903; break;
        case "acres": factor = 4046.86; break;
    }
    this.setOutputData(0, area * factor);
};

AreaConverterNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var area = this.getInputData(0) || 0;
    var squareMeters = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Input: ${area} ${this.properties.inputUnit}`, 5, 20);
    ctx.fillText(`m²: ${squareMeters.toFixed(2)} m²`, 5, 40);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("convert/area", AreaConverterNode);