// Mock GraphQL API responses for automotive manufacturing documentation system

// Example GraphQL Query
export const SEARCH_DOCUMENTATION_QUERY = `
  query SearchDocumentation(
    $query: String!
    $filters: DocumentationFilters
    $limit: Int = 20
    $offset: Int = 0
  ) {
    searchDocumentation(
      query: $query
      filters: $filters
      limit: $limit
      offset: $offset
    ) {
      totalCount
      items {
        id
        title
        content
        category
        system
        lastUpdated
        relevanceScore
        url
        tags
        metadata {
          department
          vehicleModel
          component
          severity
        }
        fullyQualifiedName
        enumValues
        defaultJsonFile
        publisher
        subscriber
        bundleName
        packageName
        fullCommand
      }
      facets {
        categories {
          name
          count
        }
        systems {
          name
          count
        }
        departments {
          name
          count
        }
      }
    }
  }
`;

// Mock GraphQL Response for brake safety search
export const mockGraphQLResponse = {
  data: {
    searchDocumentation: {
      totalCount: 1247,
      items: [
        {
          id: "1",
          title: "Brake System Safety Inspection Procedures",
          content: "Comprehensive safety inspection procedures for automotive brake systems including disc brakes, drum brakes, and anti-lock braking systems (ABS). This document covers pre-inspection requirements, visual inspection steps, performance testing protocols, and safety compliance standards according to ISO 26262 automotive safety guidelines.",
          category: "Safety",
          system: "Brake System", 
          lastUpdated: "2024-01-15T10:30:00Z",
          relevanceScore: 0.95,
          url: "https://docs.company.com/brake-safety-inspection",
          tags: ["safety", "brakes", "inspection", "compliance", "ISO26262"],
          metadata: {
            department: "Safety Engineering",
            vehicleModel: "Model X", 
            component: "Brake Assembly",
            severity: "critical"
          },
          fullyQualifiedName: "com.automotive.safety.brake.InspectionProcedure",
          enumValues: ["DISC_BRAKE", "DRUM_BRAKE", "ABS_SYSTEM", "BRAKE_FLUID", "BRAKE_PADS"],
          defaultJsonFile: "brake-inspection-config.json",
          publisher: "SafetyControlSystem",
          subscriber: "QualityAssuranceModule", 
          bundleName: "safety-inspection-bundle-v2.1",
          packageName: "com.automotive.safety.brake",
          fullCommand: "safety-inspect --system=brake --level=critical --output=/var/log/brake-inspection.log --config=brake-inspection-config.json"
        },
        {
          id: "6",
          title: "Battery Management System Configuration",
          content: "Electric vehicle battery management system (BMS) configuration and monitoring procedures. Includes cell balancing algorithms, thermal management protocols, charging optimization, and safety disconnect procedures. Critical for EV production line quality control.",
          category: "Electrical",
          system: "Battery Plant",
          lastUpdated: "2024-01-20T08:45:00Z", 
          relevanceScore: 0.92,
          tags: ["battery", "BMS", "electric", "thermal", "charging"],
          metadata: {
            department: "Electrical Engineering",
            vehicleModel: "EV Model A",
            component: "Battery Pack",
            severity: "critical"
          },
          fullyQualifiedName: "com.automotive.electrical.battery.ManagementSystem",
          enumValues: ["CELL_BALANCING", "THERMAL_MONITORING", "CHARGE_CONTROL", "SAFETY_DISCONNECT", "SOC_ESTIMATION"],
          defaultJsonFile: "bms-configuration.json",
          publisher: "BatteryControlUnit",
          subscriber: "VehicleControlModule",
          bundleName: "battery-management-bundle-v3.0", 
          packageName: "com.automotive.electrical.battery",
          fullCommand: "bms-config --mode=production --thermal-limit=45C --balance-threshold=50mV --safety-check=enabled --config=bms-configuration.json"
        },
        {
          id: "7", 
          title: "Autonomous Driving Sensor Calibration Protocol",
          content: "Calibration procedures for autonomous driving sensors including LiDAR, cameras, radar, and ultrasonic sensors. Covers factory calibration requirements, field calibration procedures, and validation testing protocols for ADAS and autonomous driving features.",
          category: "Electronics",
          system: "ADAS Plant",
          lastUpdated: "2024-01-18T13:30:00Z",
          relevanceScore: 0.89,
          tags: ["ADAS", "sensors", "calibration", "autonomous", "LiDAR"],
          metadata: {
            department: "Electronics Engineering", 
            vehicleModel: "Autonomous Model S",
            component: "Sensor Array",
            severity: "high"
          },
          fullyQualifiedName: "com.automotive.electronics.sensors.CalibrationProtocol",
          enumValues: ["LIDAR_CALIBRATION", "CAMERA_ALIGNMENT", "RADAR_TUNING", "ULTRASONIC_TEST", "FUSION_VALIDATION"],
          defaultJsonFile: "sensor-calibration-config.json",
          publisher: "SensorCalibrationSystem",
          subscriber: "ADASValidationModule",
          bundleName: "sensor-calibration-bundle-v2.8",
          packageName: "com.automotive.electronics.sensors", 
          fullCommand: "sensor-cal --type=lidar,camera,radar --precision=high --validation=required --output=/calibration/results --config=sensor-calibration-config.json"
        }
      ],
      facets: {
        categories: [
          { name: "Safety", count: 234 },
          { name: "Quality", count: 189 },
          { name: "Production", count: 156 },
          { name: "Maintenance", count: 142 },
          { name: "Electronics", count: 98 },
          { name: "Electrical", count: 87 }
        ],
        systems: [
          { name: "Brake System", count: 145 },
          { name: "Engine Plant", count: 132 },
          { name: "Paint Shop", count: 98 },
          { name: "Battery Plant", count: 87 },
          { name: "ADAS Plant", count: 76 },
          { name: "Body Shop", count: 65 }
        ],
        departments: [
          { name: "Safety Engineering", count: 201 },
          { name: "Quality Control", count: 187 },
          { name: "Manufacturing", count: 156 },
          { name: "Electrical Engineering", count: 123 },
          { name: "Electronics Engineering", count: 98 }
        ]
      }
    }
  }
};

// Mock Llama API Request
export const mockLLMRequest = {
  model: "llama3.1:8b",
  messages: [
    {
      role: "system",
      content: "You are an expert automotive manufacturing systems analyst. Analyze the provided documentation search results and provide structured insights about system integration, configuration management, and operational workflows. Focus on practical recommendations and automotive industry best practices."
    },
    {
      role: "user", 
      content: `Analyze these automotive manufacturing documentation search results and provide detailed insights:

      Search Results:
      ${JSON.stringify(mockGraphQLResponse.data.searchDocumentation.items, null, 2)}
      
      Please provide:
      1. Technical system analysis including fully qualified names, enum patterns, and configuration strategies
      2. Publisher-subscriber relationship analysis  
      3. Command-line interface patterns and automation opportunities
      4. Bundle versioning and deployment recommendations
      5. System integration insights and potential improvements
      6. Risk assessment for critical safety systems
      7. Structured recommendations for operational efficiency`
    }
  ],
  temperature: 0.3,
  max_tokens: 2000
};

// Mock Llama API Response
export const mockLLMAPIResponse = {
  id: "llama-chat-8X9YzQ2J8kR7fN3mL1pV6wS4",
  object: "chat.completion",
  created: 1706725200,
  model: "llama3.1:8b",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: `## Automotive Manufacturing Systems Analysis

        ### Executive Summary
        Analysis of 3 critical automotive manufacturing system documents reveals a sophisticated enterprise architecture with robust safety protocols, advanced electronic system integration, and comprehensive command-line automation capabilities. The system demonstrates enterprise-grade design patterns with clear separation of concerns across safety, electrical, and electronics domains.

        ### System Architecture Analysis

        **Fully Qualified Names Pattern:**
        - All systems follow consistent Java enterprise naming: \`com.automotive.[domain].[system].[component]\`
        - Clear domain separation: safety, electrical, electronics
        - Component-level granularity enables precise system targeting

        **Enum Value Patterns:**
        - Safety systems: Hardware-focused enums (DISC_BRAKE, ABS_SYSTEM)
        - Electrical systems: Process-focused enums (CELL_BALANCING, THERMAL_MONITORING) 
        - Electronics systems: Calibration-focused enums (LIDAR_CALIBRATION, CAMERA_ALIGNMENT)

        ### Publisher-Subscriber Integration Analysis

        **Critical Safety Chain:**
        SafetyControlSystem → QualityAssuranceModule (Brake safety validation)

        **Power Management Chain:**
        BatteryControlUnit → VehicleControlModule (EV power distribution)

        **Autonomous Systems Chain:**
        SensorCalibrationSystem → ADASValidationModule (Sensor validation pipeline)

        **Risk Assessment:** All three chains represent critical safety pathways requiring 99.99% uptime.

        ### Command-Line Interface Analysis

        **Common Pattern:** \`[system]-[action] --[params] --config=[file].json\`

        **Automation Opportunities:**
        1. Unified command wrapper: \`automotive-ctl --system=brake --action=inspect\`
        2. Configuration templating: Auto-generate config files from system specs
        3. Pipeline orchestration: Chain commands for end-to-end testing workflows

        ### Configuration Management Strategy

        **Current State:** 8 distinct JSON configuration files
        **Recommendation:** Implement configuration hierarchy:
        - Base: automotive-base-config.json
        - System-specific: inherits from base with overrides
        - Environment-specific: development/staging/production variants

        ### Bundle Versioning Assessment

        **Version Range:** v2.1 to v3.0 indicates active development
        **Recommendation:** Implement semantic versioning policy:
        - Major: Breaking API changes
        - Minor: New features, backward compatible
        - Patch: Bug fixes, security updates

        ### Critical System Recommendations

        1. **Safety Systems Integration:** Implement cross-system safety validation between brake, battery, and sensor systems
        2. **Configuration Validation:** Add JSON schema validation for all config files
        3. **Command Orchestration:** Develop master control system for coordinated operations
        4. **Monitoring Enhancement:** Implement distributed tracing across all publisher-subscriber pairs
        5. **Security Hardening:** Add authentication and authorization to all system interfaces

        ### Operational Efficiency Metrics

        **Current State:**
        - 3 critical safety systems identified
        - 8 configuration touchpoints
        - 3 distinct command patterns
        - High system coupling through publisher-subscriber model

        **Target State:**
        - Unified command interface
        - Centralized configuration management
        - Automated cross-system validation
        - Real-time system health monitoring

        **Confidence Level:** 94% - Based on comprehensive system architecture analysis and established automotive industry best practices.`
      },
      finish_reason: "stop"
    }
  ],
  usage: {
    prompt_tokens: 1456,
    completion_tokens: 622,
    total_tokens: 2078
  }
};

// Example mutation for creating/updating documentation
export const CREATE_DOCUMENTATION_MUTATION = `
  mutation CreateDocumentation($input: DocumentationInput!) {
    createDocumentation(input: $input) {
      id
      title
      fullyQualifiedName
      enumValues
      defaultJsonFile
      publisher
      subscriber
      bundleName
      packageName
      fullCommand
      createdAt
      updatedAt
    }
  }
`;

// Example subscription for real-time updates
export const DOCUMENTATION_UPDATES_SUBSCRIPTION = `
  subscription DocumentationUpdates($systemFilter: String) {
    documentationUpdated(systemFilter: $systemFilter) {
      id
      title
      system
      lastUpdated
      changeType
      fullyQualifiedName
      publisher
      subscriber
      bundleName
    }
  }
`;
