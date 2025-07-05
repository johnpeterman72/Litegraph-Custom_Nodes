// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that approximates the Clausius-Clapeyron equation (ln(P2/P1) = -ΔHvap/R * (1/T2 - 1/T1)) for vapor pressure.
// Created: July 04, 2025, 12:39 PM CST

function ClausiusClapeyronNode() {
    this.addInput("P1", "number"); // Initial pressure (Pa)
    this.addInput("T1", "number"); // Initial temperature (K)
    this.addInput("T2", "number"); // Final temperature (K)
    this.addInput("DeltaHvap", "number"); // Enthalpy of vaporization (J/mol)
    this.addOutput("P2", "number"); // Final pressure (Pa)
    this.properties = { padding: 10, R: 8.314 }; // Gas constant (J/(mol·K))
    this.title = "Clausius-Clapeyron";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [240, 160];
    this.pos = [500, 300];
}

ClausiusClapeyronNode.prototype.onExecute = function() {
    var P1 = this.getInputData(0) || 1;
    var T1 = this.getInputData(1) || 0;
    var T2 = this.getInputData(2) || 0;
    var DeltaHvap = this.getInputData(3) || 0;
    var R = this.properties.R;
    if (T1 > 0 && T2 > 0 && P1 > 0 && DeltaHvap > 0) {
        var lnP2P1 = -(DeltaHvap / R) * (1 / T2 - 1 / T1);
        this.setOutputData(0, P1 * Math.exp(lnP2P1)); // P2 = P1 * exp(ln(P2/P1))
    } else {
        this.setOutputData(0, 0);
    }
};

ClausiusClapeyronNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var P1 = this.getInputData(0) || 1;
    var T1 = this.getInputData(1) || 0;
    var T2 = this.getInputData(2) || 0;
    var DeltaHvap = this.getInputData(3) || 0;
    var P2 = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ln(P2/P1) = -ΔHvap/R * (1/T2 - 1/T1)`, 5, 20);
    ctx.fillText(`P1=${P1}Pa, T1=${T1}K, T2=${T2}K, ΔHvap=${DeltaHvap}J/mol`, 5, 40);
    ctx.fillText(`P2 = ${P2.toFixed(2)} Pa`, 5, 60);

    ctx.restore();
    this.size = [
        LiteGraph.NODE_WIDTH + 2 * padding,
        this.computeSize()[1] + 2 * padding
    ];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/clausius_clapeyron", ClausiusClapeyronNode);