// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates entropy change (ΔS = Q/T) based on the Second Law and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function EntropySecondLawNode() {
    this.addInput("Heat", "number"); // Q (J)
    this.addInput("Temperature", "number"); // T (K)
    this.addOutput("EntropyChange", "number"); // ΔS (J/K)
    this.properties = { padding: 10 };
    this.title = "Entropy & 2nd Law";
    this.color = "#2196F3";
    this.bgcolor = "#1976D2";
    this.size = [220, 140];
    this.pos = [300, 600];
}

EntropySecondLawNode.prototype.onExecute = function() {
    var Q = this.getInputData(0) || 0;
    var T = this.getInputData(1) || 0;
    this.setOutputData(0, T !== 0 ? Q / T : 0); // ΔS = Q/T
};

EntropySecondLawNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var Q = this.getInputData(0) || 0;
    var T = this.getInputData(1) || 0;
    var deltaS = T !== 0 ? Q / T : 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ΔS = Q / T`, 5, 20);
    ctx.fillText(`Q=${Q} J, T=${T} K`, 5, 40);
    ctx.fillText(`ΔS = ${deltaS.toFixed(2)} J/K`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/entropy_second", EntropySecondLawNode);