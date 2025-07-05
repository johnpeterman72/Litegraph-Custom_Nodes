// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs exponentiation of a base raised to an exponent and displays the equation a ^ b = result.
// Created: July 04, 2025

function PowerNode() {
    this.addInput("Base", "number");
    this.addInput("Exponent", "number");
    this.addOutput("Result", "number");
    this.properties = { padding: 10 };
    this.title = "Power";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [160, 100];
    this.pos = [500, 100];
}

PowerNode.prototype.onExecute = function() {
    var base = this.getInputData(0) || 0;
    var exp = this.getInputData(1) || 1;
    this.setOutputData(0, Math.pow(base, exp));
};

PowerNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var base = this.getInputData(0) || 0;
    var exp = this.getInputData(1) || 1;
    var result = Math.pow(base, exp);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ${base} ^ ${exp} = ${result}`, 5, 20);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/power", PowerNode);