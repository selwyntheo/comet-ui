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
  },
  {
    id: '6',
    title: 'Battery Management System Configuration',
    content: 'Electric vehicle battery management system (BMS) configuration and monitoring procedures. Includes cell balancing algorithms, thermal management protocols, charging optimization, and safety disconnect procedures. Critical for EV production line quality control.',
    category: 'Electrical',
    system: 'Battery Plant',
    lastUpdated: '2024-01-20T08:45:00Z',
    relevanceScore: 0.92,
    tags: ['battery', 'BMS', 'electric', 'thermal', 'charging'],
    metadata: {
      department: 'Electrical Engineering',
      vehicleModel: 'EV Model A',
      component: 'Battery Pack',
      severity: 'critical'
    },
    fullyQualifiedName: 'com.automotive.electrical.battery.ManagementSystem',
    enumValues: ['CELL_BALANCING', 'THERMAL_MONITORING', 'CHARGE_CONTROL', 'SAFETY_DISCONNECT', 'SOC_ESTIMATION'],
    defaultJsonFile: 'bms-configuration.json',
    publisher: 'BatteryControlUnit',
    subscriber: 'VehicleControlModule',
    bundleName: 'battery-management-bundle-v3.0',
    packageName: 'com.automotive.electrical.battery',
    fullCommand: 'bms-config --mode=production --thermal-limit=45C --balance-threshold=50mV --safety-check=enabled --config=bms-configuration.json'
  },
  {
    id: '7',
    title: 'Autonomous Driving Sensor Calibration Protocol',
    content: 'Calibration procedures for autonomous driving sensors including LiDAR, cameras, radar, and ultrasonic sensors. Covers factory calibration requirements, field calibration procedures, and validation testing protocols for ADAS and autonomous driving features.',
    category: 'Electronics',
    system: 'ADAS Plant',
    lastUpdated: '2024-01-18T13:30:00Z',
    relevanceScore: 0.89,
    tags: ['ADAS', 'sensors', 'calibration', 'autonomous', 'LiDAR'],
    metadata: {
      department: 'Electronics Engineering',
      vehicleModel: 'Autonomous Model S',
      component: 'Sensor Array',
      severity: 'high'
    },
    fullyQualifiedName: 'com.automotive.electronics.sensors.CalibrationProtocol',
    enumValues: ['LIDAR_CALIBRATION', 'CAMERA_ALIGNMENT', 'RADAR_TUNING', 'ULTRASONIC_TEST', 'FUSION_VALIDATION'],
    defaultJsonFile: 'sensor-calibration-config.json',
    publisher: 'SensorCalibrationSystem',
    subscriber: 'ADASValidationModule',
    bundleName: 'sensor-calibration-bundle-v2.8',
    packageName: 'com.automotive.electronics.sensors',
    fullCommand: 'sensor-cal --type=lidar,camera,radar --precision=high --validation=required --output=/calibration/results --config=sensor-calibration-config.json'
  },
  {
    id: '8',
    title: 'Supply Chain Inventory Management API',
    content: 'RESTful API documentation for supply chain inventory management system. Includes endpoints for parts tracking, supplier management, just-in-time delivery coordination, and quality certification verification. Critical for maintaining production line efficiency.',
    category: 'Supply Chain',
    system: 'Inventory Management',
    lastUpdated: '2024-01-22T10:15:00Z',
    relevanceScore: 0.85,
    tags: ['API', 'inventory', 'supply-chain', 'JIT', 'tracking'],
    metadata: {
      department: 'Supply Chain',
      vehicleModel: 'All Models',
      component: 'Parts Inventory',
      severity: 'medium'
    },
    fullyQualifiedName: 'com.automotive.supplychain.inventory.ManagementAPI',
    enumValues: ['PARTS_TRACKING', 'SUPPLIER_MGMT', 'JIT_DELIVERY', 'QUALITY_CERT', 'STOCK_LEVELS'],
    defaultJsonFile: 'inventory-api-config.json',
    publisher: 'InventoryManagementSystem',
    subscriber: 'ProductionPlanningModule',
    bundleName: 'supply-chain-api-bundle-v1.9',
    packageName: 'com.automotive.supplychain.inventory',
    fullCommand: 'inventory-api --endpoint=parts-tracking --auth=oauth2 --rate-limit=1000 --monitoring=enabled --config=inventory-api-config.json'
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
  summary: 'Analysis of 8 automotive manufacturing system documents reveals a comprehensive digital ecosystem with well-structured API interfaces, standardized configuration management, and robust command-line tooling. The system architecture follows enterprise Java naming conventions with clear separation between safety-critical, quality control, and production systems. All modules demonstrate proper publisher-subscriber patterns for inter-system communication.',
  keyFindings: [
    'System Architecture: All fully qualified names follow com.automotive.* namespace pattern indicating enterprise-grade system design',
    'Configuration Management: Standardized JSON configuration files are used across all systems with consistent naming conventions',
    'Inter-System Communication: Clear publisher-subscriber relationships established between control systems and monitoring modules',
    'Command-Line Tooling: Comprehensive CLI tools available for all major operations with standardized parameter patterns',
    'Bundle Versioning: Proper semantic versioning implemented across all system bundles (v1.8 to v4.1)',
    'Safety Compliance: Critical safety systems (brake, battery, ADAS) have dedicated monitoring and validation subscribers',
    'Quality Integration: Quality control systems are properly integrated with production line management systems',
    'Environmental Monitoring: Advanced VOC and thermal monitoring with automated safety disconnect capabilities'
  ],
  recommendations: [
    'System Integration: Consider implementing a centralized system registry to manage the 8+ publisher-subscriber relationships',
    'Configuration Standardization: Develop a unified configuration schema template for all *.json config files',
    'Command Orchestration: Create a master command orchestration tool to coordinate multi-system operations',
    'Bundle Management: Implement automated bundle deployment pipeline to manage version dependencies',
    'API Documentation: Generate OpenAPI specifications for all system interfaces to improve integration efficiency',
    'Monitoring Enhancement: Deploy centralized logging aggregation for all command outputs and system interactions',
    'Security Hardening: Implement OAuth2 authentication patterns across all API endpoints (currently only in inventory system)',
    'Performance Optimization: Consider implementing connection pooling for high-frequency publisher-subscriber communications'
  ],
  systemIntegrationAnalysis: {
    totalSystems: 8,
    publisherSubscriberPairs: [
      { publisher: 'SafetyControlSystem', subscriber: 'QualityAssuranceModule', category: 'Safety-Quality Integration' },
      { publisher: 'QualityControlCenter', subscriber: 'ProductionLineManager', category: 'Quality-Production Integration' },
      { publisher: 'EnvironmentalController', subscriber: 'SafetyMonitoringSystem', category: 'Environment-Safety Integration' },
      { publisher: 'MaintenanceSystem', subscriber: 'DiagnosticToolkit', category: 'Maintenance-Diagnostics Integration' },
      { publisher: 'ProductionController', subscriber: 'QualityInspectionSystem', category: 'Production-Quality Integration' },
      { publisher: 'BatteryControlUnit', subscriber: 'VehicleControlModule', category: 'Battery-Vehicle Integration' },
      { publisher: 'SensorCalibrationSystem', subscriber: 'ADASValidationModule', category: 'Sensor-ADAS Integration' },
      { publisher: 'InventoryManagementSystem', subscriber: 'ProductionPlanningModule', category: 'Supply Chain-Production Integration' }
    ],
    configurationFiles: [
      'brake-inspection-config.json',
      'engine-quality-standards.json', 
      'paint-booth-env-config.json',
      'transmission-diagnostics.json',
      'welding-standards-config.json',
      'bms-configuration.json',
      'sensor-calibration-config.json',
      'inventory-api-config.json'
    ],
    commandPatterns: {
      safetyCommands: ['safety-inspect', 'env-control'],
      qualityCommands: ['quality-check', 'weld-control'],
      maintenanceCommands: ['diagnose'],
      productionCommands: ['bms-config', 'sensor-cal', 'inventory-api'],
      commonParameters: ['--config', '--output', '--monitoring', '--validation']
    }
  },
  technicalRecommendations: [
    'Implement a unified command wrapper: automotive-ctl --system=[brake|engine|paint|...] --operation=[inspect|diagnose|calibrate]',
    'Create configuration validation schemas for all JSON files to prevent runtime errors',
    'Develop a system health dashboard aggregating status from all publisher-subscriber pairs',
    'Establish automated testing pipelines for each bundle deployment',
    'Implement distributed tracing for cross-system command execution flows'
  ],
  relevantDocuments: ['1', '2', '3', '4', '5', '6', '7', '8'],
  confidence: 0.94,
  analysisTimestamp: '2024-01-31T15:30:00Z',
  structuredResponse: {
    totalSystemsAnalyzed: 8,
    averageRelevanceScore: 0.85,
    criticalSafetySystems: 3,
    qualityControlSystems: 2,
    productionSystems: 2,
    supportSystems: 1,
    uniquePublishers: 8,
    uniqueSubscribers: 8,
    configurationComplexity: 'Medium-High',
    integrationMaturity: 'Enterprise-Ready'
  }
};
