# BOGE DS Series Products - Implementation Guide

## Overview
The DS Series includes 15 rotary screw compressor models ranging from DS 120 to DS 1800.

## Product Count
Total: 15 products (all operating at 14 bar)

## Models
- DS 120 (12.00 m³/min, 1.13 kW)
- DS 140 (14.00 m³/min, 1.14 kW)
- DS 180 (18.00 m³/min, 1.46 kW)
- DS 220 (22.00 m³/min, 1.68 kW)
- DS 260 (26.00 m³/min, 2.19 kW)
- DS 300 (30.17 m³/min, 2.41 kW)
- DS 360 (35.00 m³/min, 3.06 kW)
- DS 460 (46.00 m³/min, 3.14 kW)
- DS 520 (52.00 m³/min, 3.54 kW)
- DS 630 (63.00 m³/min, 4.64 kW)
- DS 750 (75.00 m³/min, 5.73 kW)
- DS 900 (90.00 m³/min, 7.63 kW)
- DS 1200 (120.00 m³/min, 8.92 kW)
- DS 1500 (150.00 m³/min, 12.35 kW)
- DS 1800 (180.00 m³/min, 15.96 kW)

## Implementation Methods

### Method 1: SQL (Recommended)
Run `insert-ds-series-products.sql` in Supabase SQL Editor.

### Method 2: JavaScript Backup
If SQL fails, run: `node insert-ds-series-products.cjs`

## Naming Convention
All products follow the format:
```
BOGE DS Series — DS [Model] — [Pressure] bar
```

Example: `BOGE DS Series — DS 120 — 14 bar`

## Specifications Included
Each product includes:
- Model number
- Flow capacity (m³/min, m³/h, cfm)
- Max pressure (bar)
- Pressure difference at full load (bar, psi)
- Power consumption (kW, PS)
- Installed capacity (kW, PS)
- Compressed air connection type
- Cooling air volume (m³/h, cfm)
- Dimensions (W×D×H mm)
- Weight (kg)

## Motor Power Format
Following global normalization rules:
- Power shown as: kW (PS format)
- Example: "1.13 kW (1.54 PS)"
- Both values from source table (not calculated)

## Sorting
Products are sorted by motor_power ascending (1.13 kW to 15.96 kW).
