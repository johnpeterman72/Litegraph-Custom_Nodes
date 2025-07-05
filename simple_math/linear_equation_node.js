// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that solves a linear equation of the form ax + b = 0 and displays the solution.
// Created: July 04, 2025, 12:31 PM CST

function LinearEquationNode() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addOutput("Solution", "number");
    this.properties = { padding: 10 };
    this.title = "Linear Solver";
    this.color = "#FF9800";
    this.bgcolor = "#F57C00";
    this.size = [200, 120];
    this.pos = [200, 200];
}

LinearEquationNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 1; // Default to 1 to avoid division by zero
    var b = this.getInputData(1) || 0;
    this.setOutputData(0, a !== 0 ? -b / a : 0); // Solve ax + b = 0
};

LinearEquationNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 1;
    var b = this.getInputData(1) || 0;
    var solution = a !== 0 ? -b / a : 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${a}x + ${b} = 0`, 5, 20);
    ctx.fillText(`Solution: x = ${solution}`, 5, 40);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/linear", LinearEquationNode);