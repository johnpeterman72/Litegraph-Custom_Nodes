// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that solves a system of two linear equations (ax + by = e, cx + dy = f) using substitution or elimination.
// Created: July 04, 2025, 12:31 PM CST

function SystemOfEquationsNode() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addInput("e", "number");
    this.addInput("c", "number");
    this.addInput("d", "number");
    this.addInput("f", "number");
    this.addOutput("x", "number");
    this.addOutput("y", "number");
    this.properties = { padding: 10 };
    this.title = "System Solver";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [240, 160];
    this.pos = [400, 200];
}

SystemOfEquationsNode.prototype.onExecute = function() {
    var a = this.getInputData(0) || 1;
    var b = this.getInputData(1) || 0;
    var e = this.getInputData(2) || 0;
    var c = this.getInputData(3) || 0;
    var d = this.getInputData(4) || 1;
    var f = this.getInputData(5) || 0;
    var det = a * d - b * c;
    if (det !== 0) {
        var x = (e * d - b * f) / det;
        var y = (a * f - c * e) / det;
        this.setOutputData(0, x);
        this.setOutputData(1, y);
    } else {
        this.setOutputData(0, NaN);
        this.setOutputData(1, NaN);
    }
};

SystemOfEquationsNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var a = this.getInputData(0) || 1;
    var b = this.getInputData(1) || 0;
    var e = this.getInputData(2) || 0;
    var c = this.getInputData(3) || 0;
    var d = this.getInputData(4) || 1;
    var f = this.getInputData(5) || 0;
    var x = this.getOutputData(0);
    var y = this.getOutputData(1);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Eq1: ${a}x + ${b}y = ${e}`, 5, 20);
    ctx.fillText(`Eq2: ${c}x + ${d}y = ${f}`, 5, 40);
    ctx.fillText(`Solution: x = ${isNaN(x) ? "No solution" : x}, y = ${isNaN(y) ? "No solution" : y}`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/system", SystemOfEquationsNode);