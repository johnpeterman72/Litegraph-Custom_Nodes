// Metadata
// Author: https://github.com/johnpeterman72
// Version: 1.0
// Description: A node that calculates the speed of sound in a gas (c = √(γRT/M)) and displays the equation.
// Created: July 04, 2025, 01:04 PM CST

function SpeedOfSoundNode() {
    this.addInput("Gamma", "number"); // γ (adiabatic index)
    this.addInput("R", "number");     // Gas constant per unit mass (J/(kg·K))
    this.addInput("T", "number");     // Temperature (K)
    this.addInput("M", "number");     // Molar mass (kg/mol)
    this.addOutput("SpeedOfSound", "number"); // c (m/s)
    this.properties = { padding: 10 };
    this.title = "Speed of Sound";
    this.color = "#9C27B0";
    this.bgcolor = "#7B1FA2";
    this.size = [220, 160];
    this.pos = [400, 600];
}

SpeedOfSoundNode.prototype.onExecute = function() {
    var gamma = this.getInputData(0) || 1.4; // Default for diatomic gases
    var R = this.getInputData(1) || 287;     // Default for air (J/(kg·K))
    var T = this.getInputData(2) || 0;
    var M = this.getInputData(3) || 0.02897; // Default molar mass of air (kg/mol)
    this.setOutputData(0, T > 0 ? Math.sqrt(gamma * R * T / M) : 0); // c = √(γRT/M)
};

SpeedOfSoundNode.prototype.onDrawForeground = function(ctx, graphcanvas) {
    if (this.flags.collapsed) return;
    const padding = this.properties.padding;
    ctx.save();
    ctx.translate(padding, padding);

    var gamma = this.getInputData(0) || 1.4;
    var R = this.getInputData(1) || 287;
    var T = this.getInputData(2) || 0;
    var M = this.getInputData(3) || 0.02897;
    var c = this.getOutputData(0) || 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.fillText(`Equation: c = √(γRT/M)`, 5, 20);
    ctx.fillText(`γ=${gamma}, R=${R} J/(kg·K), T=${T} K, M=${M} kg/mol`, 5, 40);
    ctx.fillText(`c = ${c.toFixed(2)} m/s`, 5, 60);

    ctx.restore();
    this.size = [LiteGraph.NODE_WIDTH + 2 * padding, this.computeSize()[1] + 2 * padding];
    this.setDirtyCanvas(true, true);
};

LiteGraph.registerNodeType("thermo/speed_sound", SpeedOfSoundNode);