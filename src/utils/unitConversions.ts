export const convertUnits = (text: string): string => {
  let converted = text;

  // PSI to bar conversion (1 bar = 14.5038 PSI)
  converted = converted.replace(/(\d+\.?\d*)\s*PSI/gi, (match, value) => {
    const psi = parseFloat(value);
    const bar = (psi / 14.5038).toFixed(1);
    return `${psi} psi / ${bar} bar`;
  });

  // CFM to m³/min conversion (1 CFM = 0.0283168 m³/min)
  converted = converted.replace(/(\d+\.?\d*)\s*CFM/gi, (match, value) => {
    const cfm = parseFloat(value);
    const m3min = (cfm * 0.0283168).toFixed(2);
    return `${cfm} CFM / ${m3min} m³/min`;
  });

  // HP to kW conversion (1 HP = 0.745699872 kW)
  // Skip conversion if the HP is already in a Motor Power line that contains kW
  converted = converted.replace(/(\d+\.?\d*)\s*HP/gi, (match, value, offset) => {
    const hp = parseFloat(value);

    // Find the line containing this HP value
    const lineStart = converted.lastIndexOf('\n', offset) + 1;
    const lineEnd = converted.indexOf('\n', offset);
    const line = converted.substring(lineStart, lineEnd === -1 ? converted.length : lineEnd);

    // If this line is a Motor Power line and already contains kW, don't convert
    if (line.match(/Motor [Pp]ower/i) && line.match(/kW/i)) {
      return match; // Return original HP value without conversion
    }

    const kw = (hp * 0.745699872).toFixed(1);
    return `${hp} HP / ${kw} kW`;
  });

  // Inches to mm conversion for dimensions
  converted = converted.replace(/(\d+\.?\d*)\s*×\s*(\d+\.?\d*)\s*×\s*(\d+\.?\d*)\s*in/gi, (match, w, d, h) => {
    const wMm = (parseFloat(w) * 25.4).toFixed(0);
    const dMm = (parseFloat(d) * 25.4).toFixed(0);
    const hMm = (parseFloat(h) * 25.4).toFixed(0);
    return `${w} × ${d} × ${h} in / ${wMm} × ${dMm} × ${hMm} mm`;
  });

  // lbs to kg conversion (1 lb = 0.453592 kg)
  converted = converted.replace(/(\d+\.?\d*)\s*lbs/gi, (match, value) => {
    const lbs = parseFloat(value);
    const kg = (lbs * 0.453592).toFixed(0);
    return `${lbs} lbs / ${kg} kg`;
  });

  return converted;
};
