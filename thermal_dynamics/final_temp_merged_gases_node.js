// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates the final temperature of adiabatically mixed gases (T_f = (m1*T1 + m2*T2)/(m1 + m2)) and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function FinalTempMergedGasesNode() {
    this.addInput("Mass1", "number"); // m1 (kg)
    this.addInput("Temp1", "number"); // T1 (K)
    this.addInput("Mass2", "number"); // m2 (kg)
    this.addInput("Temp2", "number"); // T2 (K)
    this.addOutput("FinalTemp", "number"); // T_f (K)
    this.properties = { padding: 10 };
    this.title = "Final Temp (Adiabatic)";
    this.color = "#8BC34A";
    this.bgcolor = "#689F38";
    this.size = [220, 160];
    this.pos = [700, 600];
}

FinalTempMergedGasesNode.prototype.onExecute = function() {
    var m1 = this.getInputData(0) || 0;
    var T1 = this.getInputData(1) || 0;
    var m2 = this.getInputData(2) || 0;
    var T2 = this.getInputData(3) || 0;
    var totalMass = m1 + m2;
    this.setOutputData(0, totalMass > 0 ? (m1 * T1 + m2 * T2) / totalMass : 0); // T_f = (m1*T1 + m2*T2)/(m1 + m2)
};

FinalTempMergedGasesNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var m1 = this.getInputData(0) || 0;
    var T1 = this.getInputData(1) || 0;
    var m2 = this.getInputData(2) || 0;
    var T2 = this.getInputData(3) || 0;
    var T_f = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: T_f = (m1*T1 + m2*T2)/(m1 + m2)`, 5, 20);
    ctx.fillText(`m1=${m1} kg, T1=${T1} K, m2=${m2} kg, T2=${T2} K`, 5, 40);
    ctx.fillText(`T_f = ${T_f.toFixed(2)} K`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/final_temp", FinalTempMergedGasesNode);