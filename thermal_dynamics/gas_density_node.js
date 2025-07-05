// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates gas density (ρ = P M / (R T)) using the Ideal Gas Law and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function GasDensityNode() {
    this.addInput("Pressure", "number"); // P (Pa)
    this.addInput("MolarMass", "number"); // M (kg/mol)
    this.addInput("R", "number");        // Gas constant (J/(mol·K))
    this.addInput("Temperature", "number"); // T (K)
    this.addOutput("Density", "number"); // ρ (kg/m³)
    this.properties = { padding: 10 };
    this.title = "Gas Density";
    this.color = "#E91E63";
    this.bgcolor = "#C2185B";
    this.size = [220, 160];
    this.pos = [500, 600];
}

GasDensityNode.prototype.onExecute = function() {
    var P = this.getInputData(0) || 0;
    var M = this.getInputData(1) || 0;
    var R = this.getInputData(2) || 8.314;
    var T = this.getInputData(3) || 0;
    this.setOutputData(0, T > 0 ? P * M / (R * T) : 0); // ρ = P M / (R T)
};

GasDensityNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var P = this.getInputData(0) || 0;
    var M = this.getInputData(1) || 0;
    var R = this.getInputData(2) || 8.314;
    var T = this.getInputData(3) || 0;
    var rho = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ρ = P M / (R T)`, 5, 20);
    ctx.fillText(`P=${P} Pa, M=${M} kg/mol, R=${R} J/(mol·K), T=${T} K`, 5, 40);
    ctx.fillText(`ρ = ${rho.toFixed(2)} kg/m³`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/gas_density", GasDensityNode);