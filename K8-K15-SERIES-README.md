# K8 and K15 Series Products

This document contains information about the K8 and K15 series products ready to be added to the database.

## Products Overview

### K8 Series (Standard)
- K 8 — 10 bar (150 psig) - 5.5 kW (7.5 HP)
- K 8 — 40 bar (600 psig) - 5.5 kW (7.5 HP)

### K15 Series (Standard)
- K 15 — 7 bar (100 psig) - 11.0 kW (15 HP)
- K 15 — 15 bar (220 psig) - 11.0 kW (15 HP)
- K 15 — 40 bar (600 psig) - 11.0 kW (15 HP)

### K8- Series (with Receiver Tank)
- K 8- — 10 bar (150 psig) - 270L receiver
- K 8- — 40 bar (600 psig) - 290L receiver

### K15- Series (with Receiver Tank)
- K 15- — 10 bar (150 psig) - 270L receiver
- K 15- — 15 bar (220 psig) - 250L receiver
- K 15- — 40 bar (600 psig) - 260L receiver

## Installation

The SQL file `insert-k8-k15-products.sql` contains all the INSERT statements needed to add these products to the database.

To apply:
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `insert-k8-k15-products.sql`
4. Paste and execute

Alternatively, run:
```bash
node insert-k8-k15-products.cjs
```

## Specifications Format

All products follow the global normalization rules:
- Pressure in bar with psi equivalent in parentheses
- Flow capacity in l/min with CFM in parentheses
- Motor power in kW with HP in parentheses
- Dimensions in mm with inches in parentheses
- Weight in kg with lbs in parentheses
