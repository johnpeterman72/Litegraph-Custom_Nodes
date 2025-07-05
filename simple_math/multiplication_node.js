// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs multiplication of two numbers and displays the equation a * b = result.
// Created: July 04, 2025

function MultiplicationNode() {
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("Product", "number");
    this.properties = { padding: 10 };
    this.title = "Multiplication";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [160, 100];
    this.pos = [300, 100];
}

MultiplicationNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 0;
    this.setOutputData(0, a * b);
};

MultiplicationNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 0;
    var result = a * b;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${a} * ${b} = ${result}`, 5, 20);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/multiplication", MultiplicationNode);