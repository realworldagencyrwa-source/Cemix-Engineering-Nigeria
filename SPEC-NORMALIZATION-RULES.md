# Global Specification Normalization Rules

## Motor Power Format

**CRITICAL RULE: Never duplicate converted units.**

### Source of Truth
- The kW value from the technical table is the **source of truth**
- HP is only a **secondary display** of the same value
- Never convert HP back into kW
- Never add a second calculated kW value
- Never display two kW values

### Required Format

Motor power must **always** follow this format:

```
Motor Power: [kW] kW ([HP] HP)
```

**Example:**
```
Motor Power: 11.0 kW (15 HP)
```

### Implementation Rules

#### If both kW and HP exist in the source table:
- ✅ Use them directly
- ❌ Do NOT recalculate

#### If only kW exists:
- ✅ Display only kW
- ❌ Do NOT calculate HP

#### If only HP exists:
- ✅ Display only HP
- ❌ Do NOT calculate kW unless explicitly requested

### Applies To
- All product series (C2, S2, S3, S4, S-eco, SRH, SRHV, etc.)
- All current products
- All future imports
- All migration scripts
- All data entry operations

### Examples

✅ **Correct:**
```
Motor Power: 11.0 kW (15 HP)
Motor Power: 7.5 kW (10 HP)
Motor Power: 15 HP
Motor Power: 22 kW
```

❌ **Incorrect:**
```
Motor Power: 11.0 kW / 15 HP / 11.2 kW  ← Duplicate kW values
Motor Power: 11 kW / 14.7 HP  ← Calculated HP from kW
Motor Power: 15 HP (11.19 kW)  ← Calculated kW from HP
```
