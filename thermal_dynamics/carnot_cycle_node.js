// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates the Carnot Cycle efficiency (η = 1 - Tc/Th) and displays the equation.
// Created: July 04, 2025, 12:39 PM CST

function CarnotCycleNode() {
    this.addInput("Th", "number"); // Hot reservoir temperature (K)
    this.addInput("Tc", "number"); // Cold reservoir temperature (K)
    this.addOutput("Efficiency", "number"); // Carnot efficiency (fraction)
    this.properties = { padding: 10 };
    this.title = "Carnot Efficiency";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [220, 120];
    this.pos = [400, 300];
}

CarnotCycleNode.prototype.onExecute = function() {
    var Th = this.getInputData(0) || 0;
    var Tc = this.getInputData(1) || 0;
    this.setOutputData(0, Th > Tc ? 1 - Tc / Th : 0); // η = 1 - Tc/Th
};

CarnotCycleNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var Th = this.getInputData(0) || 0;
    var Tc = this.getInputData(1) || 0;
    var efficiency = Th > Tc ? 1 - Tc / Th : 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: η = 1 - Tc/Th`, 5, 20);
    ctx.fillText(`Th=${Th}K, Tc=${Tc}K`, 5, 40);
    ctx.fillText(`η = ${ (efficiency * 100).toFixed(2) }%`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/carnot", CarnotCycleNode);