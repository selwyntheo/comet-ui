import type { DocumentationItem, SearchResult } from '../types';

// Mock data for demonstration purposes
export const mockDocuments: DocumentationItem[] = [
  {
    id: '1',
    title: 'Brake System Safety Inspection Procedures',
    content: 'Comprehensive safety inspection procedures for automotive brake systems including disc brakes, drum brakes, and anti-lock braking systems (ABS). This document covers pre-inspection requirements, visual inspection steps, performance testing protocols, and safety compliance standards according to ISO 26262 automotive safety guidelines.',
    category: 'Safety',
    system: 'Brake System',
    lastUpdated: '2024-01-15T10:30:00Z',
    relevanceScore: 0.95,
    url: 'https://docs.company.com/brake-safety-inspection',
    tags: ['safety', 'brakes', 'inspection', 'compliance', 'ISO26262'],
    metadata: {
      department: 'Safety Engineering',
      vehicleModel: 'Model X',
      component: 'Brake Assembly',
      severity: 'critical'
    },
    fullyQualifiedName: 'com.automotive.safety.brake.InspectionProcedure',
    enumValues: ['DISC_BRAKE', 'DRUM_BRAKE', 'ABS_SYSTEM', 'BRAKE_FLUID', 'BRAKE_PADS'],
    defaultJsonFile: 'brake-inspection-config.json',
    publisher: 'SafetyControlSystem',
    subscriber: 'QualityAssuranceModule',
    bundleName: 'safety-inspection-bundle-v2.1',
    packageName: 'com.automotive.safety.brake',
    fullCommand: 'safety-inspect --system=brake --level=critical --output=/var/log/brake-inspection.log --config=brake-inspection-config.json'
  },
  {
    id: '2',
    title: 'Engine Assembly Line Quality Control Standards',
    content: 'Quality control standards and procedures for engine assembly operations. Includes torque specifications, quality checkpoints, statistical process control methods, and defect tracking procedures. Compliance with automotive industry standards TS 16949 and internal quality metrics.',
    category: 'Quality',
    system: 'Engine Plant',
    lastUpdated: '2024-01-12T14:20:00Z',
    relevanceScore: 0.88,
    tags: ['quality', 'engine', 'assembly', 'standards', 'TS16949'],
    metadata: {
      department: 'Quality Control',
      vehicleModel: 'Model Y',
      component: 'Engine Block',
      severity: 'high'
    },
    fullyQualifiedName: 'com.automotive.quality.engine.AssemblyStandards',
    enumValues: ['TORQUE_CHECK', 'VISUAL_INSPECTION', 'LEAK_TEST', 'PERFORMANCE_TEST'],
    defaultJsonFile: 'engine-quality-standards.json',
    publisher: 'QualityControlCenter',
    subscriber: 'ProductionLineManager',
    bundleName: 'quality-control-bundle-v3.2',
    packageName: 'com.automotive.quality.engine',
    fullCommand: 'quality-check --assembly=engine --standards=TS16949 --report-format=json --output=/reports/engine-quality.json'
  },
  {
    id: '3',
    title: 'Paint Booth Environmental Controls and Safety',
    content: 'Environmental control systems for automotive paint booths including ventilation requirements, temperature control, humidity management, and volatile organic compound (VOC) monitoring. Safety protocols for handling paint materials and personal protective equipment requirements.',
    category: 'Safety',
    system: 'Paint Shop',
    lastUpdated: '2024-01-10T09:15:00Z',
    relevanceScore: 0.82,
    tags: ['paint', 'environment', 'safety', 'VOC', 'ventilation'],
    metadata: {
      department: 'Environmental Safety',
      vehicleModel: 'All Models',
      component: 'Paint System',
      severity: 'medium'
    },
    fullyQualifiedName: 'com.automotive.environment.paint.BoothControls',
    enumValues: ['TEMPERATURE_CONTROL', 'HUMIDITY_CONTROL', 'VOC_MONITORING', 'VENTILATION_SYSTEM'],
    defaultJsonFile: 'paint-booth-env-config.json',
    publisher: 'EnvironmentalController',
    subscriber: 'SafetyMonitoringSystem',
    bundleName: 'environmental-control-bundle-v1.8',
    packageName: 'com.automotive.environment.paint',
    fullCommand: 'env-control --booth=paint --monitor=VOC --temp-range=20-25 --humidity-max=65 --config=paint-booth-env-config.json'
  },
  {
    id: '4',
    title: 'Transmission System Troubleshooting Guide',
    content: 'Comprehensive troubleshooting guide for automatic and manual transmission systems. Includes diagnostic procedures, common failure modes, repair instructions, and replacement part specifications. Reference materials for both CVT and traditional gear-based transmissions.',
    category: 'Maintenance',
    system: 'Transmission',
    lastUpdated: '2024-01-08T16:45:00Z',
    relevanceScore: 0.76,
    tags: ['transmission', 'troubleshooting', 'maintenance', 'diagnostics'],
    metadata: {
      department: 'Service Engineering',
      vehicleModel: 'Model Z',
      component: 'Transmission Assembly',
      severity: 'medium'
    },
    fullyQualifiedName: 'com.automotive.maintenance.transmission.TroubleshootingGuide',
    enumValues: ['AUTOMATIC_TRANS', 'MANUAL_TRANS', 'CVT_SYSTEM', 'GEAR_BOX', 'FLUID_CHECK'],
    defaultJsonFile: 'transmission-diagnostics.json',
    publisher: 'MaintenanceSystem',
    subscriber: 'DiagnosticToolkit',
    bundleName: 'maintenance-diagnostic-bundle-v2.5',
    packageName: 'com.automotive.maintenance.transmission',
    fullCommand: 'diagnose --system=transmission --type=automatic --check-fluid --error-codes --config=transmission-diagnostics.json'
  },
  {
    id: '5',
    title: 'Welding Standards for Body Shop Operations',
    content: 'Welding standards and procedures for automotive body shop operations. Covers spot welding, arc welding, and laser welding techniques. Quality standards for weld strength, appearance, and durability. Safety protocols for welding operations and equipment maintenance.',
    category: 'Production',
    system: 'Body Shop',
    lastUpdated: '2024-01-05T11:30:00Z',
    relevanceScore: 0.71,
    tags: ['welding', 'body shop', 'production', 'quality'],
    metadata: {
      department: 'Manufacturing',
      vehicleModel: 'All Models',
      component: 'Body Structure',
      severity: 'high'
    },
    fullyQualifiedName: 'com.automotive.production.bodyshop.WeldingStandards',
    enumValues: ['SPOT_WELDING', 'ARC_WELDING', 'LASER_WELDING', 'RESISTANCE_WELDING'],
    defaultJsonFile: 'welding-standards-config.json',
    publisher: 'ProductionController',
    subscriber: 'QualityInspectionSystem',
    bundleName: 'production-welding-bundle-v4.1',
    packageName: 'com.automotive.production.bodyshop',
    fullCommand: 'weld-control --technique=spot --strength-test=required --quality-check=automated --config=welding-standards-config.json'
  }
];

export const mockSearchResult: SearchResult = {
  items: mockDocuments,
  totalCount: 1247,
  facets: {
    categories: [
      { name: 'Safety', count: 234 },
      { name: 'Quality', count: 189 },
      { name: 'Production', count: 156 },
      { name: 'Maintenance', count: 142 },
      { name: 'Design', count: 98 }
    ],
    systems: [
      { name: 'Engine Plant', count: 145 },
      { name: 'Body Shop', count: 132 },
      { name: 'Paint Shop', count: 118 },
      { name: 'Assembly Line', count: 98 },
      { name: 'Brake System', count: 87 }
    ],
    departments: [
      { name: 'Quality Control', count: 198 },
      { name: 'Safety Engineering', count: 167 },
      { name: 'Manufacturing', count: 156 },
      { name: 'Service Engineering', count: 134 },
      { name: 'Environmental Safety', count: 89 }
    ]
  }
};

export const mockSearchSuggestions = [
  'brake system safety procedures',
  'engine quality control standards',
  'paint booth ventilation requirements',
  'transmission troubleshooting guide',
  'welding standards body shop'
];

// Mock LLM analysis for demonstration
export const mockLLMAnalysis = {
  summary: 'The search results contain critical safety and quality documentation across multiple manufacturing systems. Key focus areas include brake system safety compliance, engine assembly quality standards, and environmental controls for paint operations. All documents emphasize adherence to international automotive standards (ISO 26262, TS 16949) and demonstrate the company\'s commitment to manufacturing excellence and worker safety.',
  keyFindings: [
    'Critical safety procedures are well-documented across all major systems with ISO 26262 compliance',
    'Quality control standards meet TS 16949 requirements with statistical process control implementation',
    'Environmental safety protocols include comprehensive VOC monitoring and ventilation controls',
    'Maintenance procedures provide detailed diagnostic and troubleshooting guidance',
    'Production standards ensure consistent quality across all vehicle models'
  ],
  recommendations: [
    'Review and update brake safety inspection procedures quarterly to maintain critical safety standards',
    'Implement cross-training programs for quality control personnel across different systems',
    'Consider automation opportunities in paint booth environmental monitoring systems',
    'Establish regular maintenance schedule reviews to prevent transmission system failures',
    'Develop standardized welding quality metrics across all body shop operations'
  ],
  relevantDocuments: ['1', '2', '3'],
  confidence: 0.87,
  analysisTimestamp: '2024-01-20T15:30:00Z'
};
