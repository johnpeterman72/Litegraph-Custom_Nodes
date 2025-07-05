// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs division of two numbers and displays the equation a / b = result, with error handling for division by zero.
// Created: July 04, 2025

function DivisionNode() {
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("Quotient", "number");
    this.properties = { padding: 10 };
    this.title = "Division";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [160, 100];
    this.pos = [400, 100];
}

DivisionNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 1; // Default to 1 to avoid division by zero
    this.setOutputData(0, b !== 0 ? a / b : 0); // Handle division by zero
};

DivisionNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 1;
    var result = b !== 0 ? a / b : 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${a} / ${b} = ${result}`, 5, 20);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/division", DivisionNode);