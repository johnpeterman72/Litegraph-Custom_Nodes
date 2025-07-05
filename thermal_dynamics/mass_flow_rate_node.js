// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates mass flow rate (ṁ = ρ * A * v) and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function MassFlowRateNode() {
    this.addInput("Density", "number"); // ρ (kg/m³)
    this.addInput("Area", "number");    // A (m²)
    this.addInput("Velocity", "number"); // v (m/s)
    this.addOutput("MassFlowRate", "number"); // ṁ (kg/s)
    this.properties = { padding: 10 };
    this.title = "Mass Flow Rate";
    this.color = "#4CAF50";
    this.bgcolor = "#2E7D32";
    this.size = [220, 140];
    this.pos = [100, 600];
}

MassFlowRateNode.prototype.onExecute = function() {
    var rho = this.getInputData(0) || 0;
    var A = this.getInputData(1) || 0;
    var v = this.getInputData(2) || 0;
    this.setOutputData(0, rho * A * v);
};

MassFlowRateNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var rho = this.getInputData(0) || 0;
    var A = this.getInputData(1) || 0;
    var v = this.getInputData(2) || 0;
    var massFlow = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ṁ = ρ * A * v`, 5, 20);
    ctx.fillText(`ρ=${rho} kg/m³, A=${A} m², v=${v} m/s`, 5, 40);
    ctx.fillText(`ṁ = ${massFlow.toFixed(2)} kg/s`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/mass_flow", MassFlowRateNode);