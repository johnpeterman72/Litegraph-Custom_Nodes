// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates the Ideal Gas Law (PV = nRT) and displays the equation.
// Created: July 04, 2025, 12:39 PM CST

function IdealGasLawNode() {
    this.addInput("P", "number"); // Pressure (Pa)
    this.addInput("V", "number"); // Volume (m³)
    this.addInput("n", "number"); // Moles
    this.addInput("T", "number"); // Temperature (K)
    this.addOutput("R", "number"); // Gas constant or result
    this.properties = { padding: 10, R: 8.314 }; // Universal gas constant (J/(mol·K))
    this.title = "Ideal Gas Law";
    this.color = "#4CAF50";
    this.bgcolor = "#2E7D32";
    this.size = [220, 140];
    this.pos = [100, 300];
}

IdealGasLawNode.prototype.onExecute = function() {
    var P = this.getInputData(0) || 0;
    var V = this.getInputData(1) || 0;
    var n = this.getInputData(2) || 0;
    var T = this.getInputData(3) || 0;
    if (n !== 0 && T !== 0) {
        this.setOutputData(0, (P * V) / (n * T)); // Solve for R or verify
    } else {
        this.setOutputData(0, this.properties.R); // Default to gas constant
    }
};

IdealGasLawNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var P = this.getInputData(0) || 0;
    var V = this.getInputData(1) || 0;
    var n = this.getInputData(2) || 0;
    var T = this.getInputData(3) || 0;
    var result = n !== 0 && T !== 0 ? (P * V) / (n * T) : this.properties.R;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: PV = nRT`, 5, 20);
    ctx.fillText(`P=${P}, V=${V}, n=${n}, T=${T}`, 5, 40);
    ctx.fillText(`R = ${result.toFixed(2)}`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/ideal_gas", IdealGasLawNode);
