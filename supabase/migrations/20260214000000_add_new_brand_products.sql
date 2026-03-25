/*
  # Add Sample Products for New Brands

  1. Purpose
    - Add sample products for new brands: Bestrand, Chicago Pneumatic, EQO Fluids, Jorc, GEV, and Sicctech
    - Each brand has 2 sample products with 1 featured item per brand

  2. Brands Added
    - Bestrand (China) - Cost-effective industrial compressors and air treatment
    - Chicago Pneumatic - Durable pneumatic tools and accessories
    - EQO Fluids - Industrial fluid handling and filtration solutions
    - Jorc - Condensate management and electronic drain systems
    - GEV (General Europe Vacuum) - Industrial vacuum systems
    - Sicctech - Industrial components and spare parts
*/

-- Bestrand Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'Bestrand Screw Air Compressor Series',
  'Bestrand',
  'Air Compressor',
  'Cost-effective industrial screw compressors designed for reliable performance in demanding environments.',
  'Power Range: 7.5kW - 355kW
Flow Rate: 0.8m³/min - 60m³/min
Working Pressure: 7-13 bar
Drive Type: Direct Drive / Belt Drive
Energy Efficiency: IE3 Motor Standard',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'Bestrand Air Dryer & Filtration Package',
  'Bestrand',
  'Air Treatment',
  'Integrated air treatment solution for cleaner, dryer compressed air and longer equipment life.',
  'Dryer Type: Refrigerated / Desiccant
Flow Capacity: 1m³/min - 100m³/min
Filtration Grade: 0.01 micron
Pressure Dew Point: +2°C to -70°C
Package: Complete with filters and piping',
  'Contact for pricing',
  'In Stock',
  false
);

-- Chicago Pneumatic Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'Chicago Pneumatic Industrial Air Tools',
  'Chicago Pneumatic',
  'Pneumatic Tools',
  'Durable pneumatic tools engineered for workshop and industrial production lines.',
  'Tool Types: Impact Wrenches, Drills, Grinders, Sanders
Air Pressure: 6.2 bar
Air Consumption: Variable by tool
Application: Heavy-duty industrial use
Warranty: 2 years manufacturer warranty',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'Chicago Pneumatic Compressor Accessories',
  'Chicago Pneumatic',
  'Accessories',
  'Genuine accessories and components for efficient air system performance.',
  'Includes: Hoses, Couplings, Regulators, Filters
Material: Industrial-grade steel and brass
Compatibility: CP compressor systems
Standards: ISO 9001 certified
Delivery: Available from stock',
  'Contact for pricing',
  'In Stock',
  false
);

-- EQO Fluids Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'EQO Fluid Handling Solutions',
  'EQO Fluids',
  'Fluid Control',
  'Industrial-grade fluid control and handling components for compressed air and process systems.',
  'Component Types: Valves, Regulators, Controllers
Pressure Range: 0-16 bar
Port Sizes: 1/4" to 2"
Material: Brass, Stainless Steel, Aluminum
Certifications: CE, ISO compliant',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'EQO Filtration & Control Components',
  'EQO Fluids',
  'Filtration',
  'High-quality filtration and control solutions for stable system operation.',
  'Filter Types: Coalescing, Particulate, Activated Carbon
Flow Rate: 5 - 5000 SCFM
Filtration Grade: 0.01 micron
Pressure Drop: < 0.15 bar at rated flow
Housing: Aluminum with drain valve',
  'Contact for pricing',
  'In Stock',
  false
);

-- Jorc Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'JORC Automatic Drain Valves',
  'Jorc',
  'Condensate Management',
  'Reliable condensate management for compressors, dryers, filters, and receiver tanks.',
  'Type: Zero air loss electronic drain
Operating Pressure: 0-16 bar
Discharge Capacity: Up to 1000 liters/hour
Power Supply: 24V DC / 110-230V AC
Features: Auto-sensing, fail-safe operation',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'JORC Electronic Drain Systems',
  'Jorc',
  'Condensate Management',
  'Energy-efficient electronic drains designed to minimize air loss and downtime.',
  'Control Type: Electronic level sensing
Installation: Vertical or horizontal
Connection: 1/2" NPT or BSP
Temperature Range: +2°C to +80°C
Certification: ATEX, CE approved',
  'Contact for pricing',
  'In Stock',
  false
);

-- GEV Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'GEV Vacuum Systems & Components',
  'GEV',
  'Vacuum Systems',
  'Industrial vacuum solutions for manufacturing and process applications.',
  'Vacuum Level: Up to 99.5%
Flow Rate: 50 - 2000 m³/h
Power: 2.2kW - 75kW
Technology: Oil-sealed / Dry running
Application: Packaging, woodworking, plastics',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'GEV Vacuum Accessories & Spares',
  'GEV',
  'Accessories',
  'Spare parts and accessories to maintain peak vacuum system performance.',
  'Parts Include: Vanes, Filters, Oil, Seals
Compatibility: All GEV vacuum pump models
Material: OEM quality materials
Availability: Ex-stock or short lead time
Support: Technical assistance available',
  'Contact for pricing',
  'In Stock',
  false
);

-- Sicctech Products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured)
VALUES
(
  'Sicctech Industrial Components',
  'Sicctech',
  'Industrial Equipment',
  'Industrial components and system parts engineered for long-term reliability.',
  'Product Range: Controllers, Sensors, Valves
Application: Compressed air and gas systems
Quality: Industrial-grade construction
Standards: International quality compliance
Lead Time: Available from stock',
  'Contact for pricing',
  'In Stock',
  true
),
(
  'Sicctech Spare Parts & Accessories',
  'Sicctech',
  'Spare Parts',
  'Quality spares and accessories supporting industrial compressed air systems.',
  'Categories: Maintenance kits, Wear parts, Filters
Compatibility: Multi-brand support
Quality Assurance: Tested to OEM standards
Packaging: Individual or kit form
Delivery: Fast dispatch from warehouse',
  'Contact for pricing',
  'In Stock',
  false
);
