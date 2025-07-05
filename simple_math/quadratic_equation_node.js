// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that solves a quadratic equation of the form ax^2 + bx + c = 0 using the quadratic formula.
// Created: July 04, 2025, 12:31 PM CST

function QuadraticEquationNode() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addInput("c", "number");
    this.addOutput("Solution1", "number");
    this.addOutput("Solution2", "number");
    this.properties = { padding: 10 };
    this.title = "Quadratic Solver";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [220, 140];
    this.pos = [300, 200];
}

QuadraticEquationNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 1; // Default to 1 to avoid division by zero
    var b = this.getInputData(1) || 0;
    var c = this.getInputData(2) || 0;
    var discriminant = b * b - 4 * a * c;
    if (discriminant >= 0) {
        var sqrtDisc = Math.sqrt(discriminant);
        this.setOutputData(0, (-b + sqrtDisc) / (2 * a)); // Solution 1
        this.setOutputData(1, (-b - sqrtDisc) / (2 * a)); // Solution 2
    } else {
        this.setOutputData(0, NaN); // No real solutions
        this.setOutputData(1, NaN);
    }
};

QuadraticEquationNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 1;
    var b = this.getInputData(1) || 0;
    var c = this.getInputData(2) || 0;
    var discriminant = b * b - 4 * a * c;
    var sol1 = this.getOutputData(0);
    var sol2 = this.getOutputData(1);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${a}x^2 + ${b}x + ${c} = 0`, 5, 20);
    ctx.fillText(`Discriminant: ${discriminant}`, 5, 40);
    ctx.fillText(`Solutions: x1 = ${isNaN(sol1) ? "No real" : sol1}, x2 = ${isNaN(sol2) ? "No real" : sol2}`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/quadratic", QuadraticEquationNode);