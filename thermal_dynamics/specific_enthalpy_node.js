// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates specific enthalpy (h = u + Pv) for ideal gases and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function SpecificEnthalpyNode() {
    this.addInput("InternalEnergy", "number"); // u (J/kg)
    this.addInput("Pressure", "number");      // P (Pa)
    this.addInput("SpecificVolume", "number"); // v (m³/kg)
    this.addOutput("SpecificEnthalpy", "number"); // h (J/kg)
    this.properties = { padding: 10 };
    this.title = "Specific Enthalpy";
    this.color = "#FF9800";
    this.bgcolor = "#F57C00";
    this.size = [220, 140];
    this.pos = [200, 600];
}

SpecificEnthalpyNode.prototype.onExecute = function() {
    var u = this.getInputData(0) || 0;
    var P = this.getInputData(1) || 0;
    var v = this.getInputData(2) || 0;
    this.setOutputData(0, u + P * v); // h = u + Pv
};

SpecificEnthalpyNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var u = this.getInputData(0) || 0;
    var P = this.getInputData(1) || 0;
    var v = this.getInputData(2) || 0;
    var h = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: h = u + Pv`, 5, 20);
    ctx.fillText(`u=${u} J/kg, P=${P} Pa, v=${v} m³/kg`, 5, 40);
    ctx.fillText(`h = ${h.toFixed(2)} J/kg`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/specific_enthalpy", SpecificEnthalpyNode);