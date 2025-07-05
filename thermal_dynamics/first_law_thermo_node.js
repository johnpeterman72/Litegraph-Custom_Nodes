// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that applies the First Law of Thermodynamics (ΔU = Q - W) and displays the equation.
// Created: July 04, 2025, 12:39 PM CST

function FirstLawThermoNode() {
    this.addInput("Q", "number"); // Heat added (J)
    this.addInput("W", "number"); // Work done by system (J)
    this.addOutput("DeltaU", "number"); // Change in internal energy (J)
    this.properties = { padding: 10 };
    this.title = "First Law";
    this.color = "#FF9800";
    this.bgcolor = "#F57C00";
    this.size = [200, 120];
    this.pos = [200, 300];
}

FirstLawThermoNode.prototype.onExecute = function() {
    var Q = this.getInputData(0) || 0;
    var W = this.getInputData(1) || 0;
    this.setOutputData(0, Q - W); // ΔU = Q - W
};

FirstLawThermoNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var Q = this.getInputData(0) || 0;
    var W = this.getInputData(1) || 0;
    var deltaU = Q - W;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ΔU = Q - W`, 5, 20);
    ctx.fillText(`Q=${Q}, W=${W}`, 5, 40);
    ctx.fillText(`ΔU = ${deltaU} J`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/first_law", FirstLawThermoNode);