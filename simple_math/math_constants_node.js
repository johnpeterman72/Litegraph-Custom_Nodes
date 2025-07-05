// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that provides standard mathematical constants (π, e, etc.) as outputs.
// Created: July 04, 2025, 12:48 PM CST

function MathConstantsNode() {
    this.addOutput("Pi", "number");
    this.addOutput("E", "number");
    this.addOutput("GoldenRatio", "number");
    this.properties = { padding: 10 };
    this.title = "Math Constants";
    this.color = "#795548";
    this.bgcolor = "#5D4037";
    this.size = [200, 140];
    this.pos = [1300, 500];
}

MathConstantsNode.prototype.onExecute = function() {
    this.setOutputData(0, Math.PI); // π ≈ 3.14159
    this.setOutputData(1, Math.E);  // e ≈ 2.71828
    this.setOutputData(2, (1 + Math.sqrt(5)) / 2); // Golden Ratio ≈ 1.61803
};

MathConstantsNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`π = ${Math.PI.toFixed(5)}`, 5, 20);
    ctx.fillText(`e = ${Math.E.toFixed(5)}`, 5, 40);
    ctx.fillText(`Golden Ratio = ${((1 + Math.sqrt(5)) / 2).toFixed(5)}`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("math/constants", MathConstantsNode);