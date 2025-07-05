// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs addition of two variables (e.g., x + y = result) and displays the equation.
// Created: July 04, 2025, 12:31 PM CST

function AdditionWithVariablesNode() {
    this.addInput("x", "number");
    this.addInput("y", "number");
    this.addOutput("Sum", "number");
    this.properties = { padding: 10 };
    this.title = "Add Variables";
    this.color = "#4CAF50";
    this.bgcolor = "#2E7D32";
    this.size = [180, 100];
    this.pos = [100, 200];
}

AdditionWithVariablesNode.prototype.onExecute = function() {
    var x = this.getInputData(0) || 0;
    var y = this.getInputData(1) || 0;
    this.setOutputData(0, x + y);
};

AdditionWithVariablesNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var x = this.getInputData(0) || 0;
    var y = this.getInputData(1) || 0;
    var result = x + y;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: x + y = ${result} (x=${x}, y=${y})`, 5, 20);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("algebra/add_variables", AdditionWithVariablesNode);