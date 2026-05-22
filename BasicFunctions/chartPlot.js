const PlotEngine = {
  plotAll(data, title = "All Plots Demo") {
    console.log("\n" + "=".repeat(70));
    console.log(title);
    console.log("Data:", data);
    console.log("=".repeat(70));

    const max = Math.max(...data, 1);

    // 1. BAR
    console.log("\n[BAR]");
    data.forEach((v, i) => {
      console.log(i + " | " + "█".repeat(Math.round((v / max) * 30)) + " " + v);
    });

    // 2. LINE (ASCII trend)
    console.log("\n[LINE]");
    data.forEach((v) => {
      console.log(" ".repeat(Math.round((v / max) * 10)) + "*");
    });

    // 3. DOTS
    console.log("\n[DOTS]");
    data.forEach((v, i) => {
      console.log(i + ": " + ".".repeat(v));
    });

    // 4. SPARKLINE
    console.log("\n[SPARKLINE]");
    const spark = "▁▂▃▄▅▆▇█";
    console.log(
      data
        .map((v) => {
          const idx = Math.floor((v / max) * (spark.length - 1));
          return spark[idx];
        })
        .join(""),
    );

    // 5. HISTOGRAM
    console.log("\n[HISTOGRAM]");
    const bins = {};
    data.forEach((v) => {
      const key = Math.floor(v / 10) * 10;
      bins[key] = (bins[key] || 0) + 1;
    });
    Object.entries(bins).forEach(([k, v]) => {
      console.log(k + "-" + (Number(k) + 9) + " | " + "█".repeat(v));
    });

    // 6. TABLE
    console.log("\n[TABLE]");
    console.table(data);

    // 7. ASCII BARS
    console.log("\n[ASCII BARS]");
    data.forEach((v) => {
      console.log("-".repeat(Math.min(v, 50)));
    });

    // 8. CUMULATIVE
    console.log("\n[CUMULATIVE]");
    let sum = 0;
    data.forEach((v, i) => {
      sum += v;
      console.log(i + ": " + sum);
    });

    // 9. NORMALIZED
    console.log("\n[NORMALIZED]");
    const min = Math.min(...data);
    data.forEach((v, i) => {
      const n = (v - min) / (max - min || 1);
      console.log(i + " | " + "█".repeat(Math.round(n * 30)) + " " + v);
    });

    console.log("\n" + "=".repeat(70));
  },
};

// expose globally
window.PlotEngine = PlotEngine;

PlotEngine.plotAll([10, 20, 15, 40, 25, 5, 30], "Full Console Plot Demo");
