// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs substitution by replacing a variable (x) with a value in an expression ax + b and displays the result.
// Created: July 04, 2025, 12:31 PM CST

function SubstitutionNode() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addInput("x", "number");
    this.addOutput("Result", "number");
    this.properties = { padding: 10 };
    this.title = "Substitution";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [200, 120];
    this.pos = [500, 200];
}

SubstitutionNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 0;
    var x = this.getInputData(2) || 0;
    this.setOutputData(0, a * x + b);
};

SubstitutionNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 0;
    var b = this.getInputData(1) || 0;
    var x = this.getInputData(2) || 0;
    var result = a * x + b;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${a}x + ${b}`, 5, 20);
    ctx.fillText(`Substitution: x = ${x}, Result = ${result}`, 5, 40);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/substitution", SubstitutionNode);