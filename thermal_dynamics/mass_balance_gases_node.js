// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that performs mass balance for gases (ṁ_in = ṁ_out) and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function MassBalanceGasesNode() {
    this.addInput("MassFlowIn", "number"); // ṁ_in (kg/s)
    this.addOutput("MassFlowOut", "number"); // ṁ_out (kg/s)
    this.properties = { padding: 10 };
    this.title = "Mass Balance";
    this.color = "#3F51B5";
    this.bgcolor = "#303F9F";
    this.size = [220, 120];
    this.pos = [600, 600];
}

MassBalanceGasesNode.prototype.onExecute = function() {
    var mIn = this.getInputData(0) || 0;
    this.setOutputData(0, mIn); // ṁ_in = ṁ_out (assuming no accumulation)
};

MassBalanceGasesNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var mIn = this.getInputData(0) || 0;
    var mOut = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: ṁ_in = ṁ_out`, 5, 20);
    ctx.fillText(`ṁ_in = ${mIn} kg/s`, 5, 40);
    ctx.fillText(`ṁ_out = ${mOut} kg/s`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/mass_balance", MassBalanceGasesNode);