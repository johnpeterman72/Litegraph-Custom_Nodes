// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates the efficiency of a heat engine (η = W/Qh) based on the Second Law of Thermodynamics.
// Created: July 04, 2025, 12:39 PM CST

function SecondLawEfficiencyNode() {
    this.addInput("Qh", "number"); // Heat input (J)
    this.addInput("W", "number"); // Work output (J)
    this.addOutput("Efficiency", "number"); // Efficiency (fraction)
    this.properties = { padding: 10 };
    this.title = "Efficiency";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [200, 120];
    this.pos = [300, 300];
}

SecondLawEfficiencyNode.prototype.onExecute = function() {
    var Qh = this.getInputData(0) || 0;
    var W = this.getInputData(1) || 0;
    this.setOutputData(0, Qh !== 0 ? W / Qh : 0); // η = W / Qh
};

SecondLawEfficiencyNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var Qh = this.getInputData(0) || 0;
    var W = this.getInputData(1) || 0;
    var efficiency = Qh !== 0 ? W / Qh : 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: η = W / Qh`, 5, 20);
    ctx.fillText(`Qh=${Qh}, W=${W}`, 5, 40);
    ctx.fillText(`η = ${ (efficiency * 100).toFixed(2) }%`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/efficiency", SecondLawEfficiencyNode);