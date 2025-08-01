// Mock configuration files referenced by the automotive manufacturing systems

// brake-inspection-config.json
export const brakeInspectionConfig = {
  "system": {
    "name": "BrakeInspectionSystem",
    "version": "2.1.0",
    "environment": "production"
  },
  "inspection": {
    "types": ["DISC_BRAKE", "DRUM_BRAKE", "ABS_SYSTEM", "BRAKE_FLUID", "BRAKE_PADS"],
    "criticalityLevel": "CRITICAL",
    "testProcedures": {
      "DISC_BRAKE": {
        "minThickness": "12.0mm",
        "maxRunout": "0.1mm",
        "testForce": "1200N"
      },
      "DRUM_BRAKE": {
        "minLiningThickness": "3.0mm", 
        "adjustmentRange": "5-25mm",
        "testForce": "800N"
      },
      "ABS_SYSTEM": {
        "sensorGap": "0.5-2.0mm",
        "signalVoltage": "1.5-12V",
        "responseTime": "<50ms"
      }
    }
  },
  "compliance": {
    "standards": ["ISO26262", "FMVSS135", "ECE-R13"],
    "certificationRequired": true,
    "auditTrail": true
  },
  "output": {
    "logLevel": "INFO",
    "reportFormat": "JSON",
    "retentionDays": 2555,
    "alertThresholds": {
      "warning": 0.8,
      "critical": 0.95
    }
  }
};

// bms-configuration.json
export const bmsConfiguration = {
  "system": {
    "name": "BatteryManagementSystem", 
    "version": "3.0.0",
    "environment": "production",
    "vehicleType": "EV"
  },
  "battery": {
    "cellConfiguration": {
      "series": 96,
      "parallel": 4,
      "nominalVoltage": "3.7V",
      "capacity": "50Ah"
    },
    "operatingLimits": {
      "maxVoltage": "4.2V",
      "minVoltage": "2.5V", 
      "maxCurrent": "200A",
      "thermalLimit": "45C"
    },
    "balancing": {
      "threshold": "50mV",
      "method": "ACTIVE",
      "balancingCurrent": "200mA"
    }
  },
  "monitoring": {
    "samplingRate": "100Hz",
    "dataRetention": "30days",
    "alerting": {
      "overVoltage": true,
      "underVoltage": true,
      "overTemperature": true,
      "cellImbalance": true
    }
  },
  "safety": {
    "disconnectEnabled": true,
    "prechargeRequired": true,
    "insulationMonitoring": true,
    "functionalSafety": "ASIL-D"
  },
  "communication": {
    "protocols": ["CAN", "LIN", "Ethernet"],
    "heartbeat": "1000ms",
    "diagnostics": "UDS"
  }
};

// sensor-calibration-config.json
export const sensorCalibrationConfig = {
  "system": {
    "name": "SensorCalibrationSystem",
    "version": "2.8.0", 
    "environment": "production",
    "adas": true
  },
  "sensors": {
    "lidar": {
      "type": "Velodyne VLP-32C",
      "range": "200m",
      "precision": "±2cm",
      "calibrationTargets": ["reflective_panels", "corner_reflectors"],
      "environmentalCompensation": true
    },
    "cameras": {
      "count": 8,
      "resolution": "1920x1080",
      "frameRate": "30fps",
      "calibrationPattern": "checkerboard_9x6",
      "intrinsicCalibration": true,
      "extrinsicCalibration": true
    },
    "radar": {
      "frequency": "77GHz",
      "range": "150m", 
      "angularResolution": "1.0deg",
      "velocityRange": "±200kmh",
      "calibrationTargets": ["metal_reflectors"]
    },
    "ultrasonic": {
      "count": 12,
      "range": "5m",
      "frequency": "40kHz",
      "obstacleDetection": true
    }
  },
  "calibration": {
    "sequence": ["LIDAR_CALIBRATION", "CAMERA_ALIGNMENT", "RADAR_TUNING", "ULTRASONIC_TEST", "FUSION_VALIDATION"],
    "tolerance": {
      "position": "±1mm",
      "rotation": "±0.1deg",
      "timing": "±1ms"
    },
    "validation": {
      "testTrack": "closed_course",
      "scenarios": ["straight_line", "curves", "obstacles", "weather_conditions"],
      "successCriteria": "95%_accuracy"
    }
  },
  "output": {
    "calibrationMatrix": "/calibration/results/sensor_matrix.json",
    "validationReport": "/calibration/results/validation_report.pdf",
    "retentionPolicy": "5_years"
  }
};

// engine-quality-standards.json
export const engineQualityStandards = {
  "system": {
    "name": "EngineQualityControlSystem",
    "version": "3.2.0",
    "standard": "TS16949",
    "environment": "production"
  },
  "assembly": {
    "stages": ["block_machining", "component_assembly", "final_test"],
    "qualityGates": ["dimensional_check", "torque_verification", "leak_test", "performance_validation"]
  },
  "measurements": {
    "torque": {
      "headBolts": "85Nm ±5Nm",
      "rodBolts": "45Nm ±2Nm", 
      "crankshaftBolts": "120Nm ±8Nm",
      "sequence": "star_pattern"
    },
    "dimensions": {
      "bore": "86.0mm ±0.02mm",
      "stroke": "86.0mm ±0.02mm",
      "compressionRatio": "10.5:1 ±0.1",
      "surfaceFinish": "Ra 0.8μm"
    },
    "leakage": {
      "combustionChamber": "<5ml/min @ 6bar",
      "oilCircuit": "<2ml/min @ 4bar",
      "coolantCircuit": "<1ml/min @ 2bar"
    }
  },
  "testing": {
    "coldTest": {
      "duration": "120s",
      "rpmRange": "800-2000",
      "parameters": ["oil_pressure", "vibration", "noise"]
    },
    "hotTest": {
      "duration": "600s", 
      "temperature": "90C",
      "loadSteps": [25, 50, 75, 100],
      "emissions": "within_limits"
    }
  },
  "dataCollection": {
    "sampleRate": "10Hz",
    "retention": "2_years",
    "traceability": "serial_number_based",
    "spc": {
      "cpk": ">1.33",
      "controlLimits": "±3sigma"
    }
  }
};

// welding-standards-config.json
export const weldingStandardsConfig = {
  "system": {
    "name": "WeldingControlSystem",
    "version": "4.1.0",
    "environment": "production",
    "bodyShop": true
  },
  "techniques": {
    "spotWelding": {
      "electrodeForce": "3500N ±200N",
      "weldTime": "200ms ±20ms", 
      "current": "8500A ±500A",
      "electrodeType": "Class2_CuCrZr"
    },
    "arcWelding": {
      "voltage": "24V ±2V",
      "current": "180A ±20A",
      "travelSpeed": "300mm/min",
      "shieldingGas": "Ar/CO2_mix"
    },
    "laserWelding": {
      "power": "3kW",
      "speed": "2000mm/min",
      "focusPosition": "0mm ±0.1mm",
      "assistGas": "Nitrogen"
    }
  },
  "quality": {
    "visual": {
      "spatterLevel": "minimal",
      "undercut": "<0.5mm",
      "overlap": "<1.0mm"
    },
    "mechanical": {
      "tensileStrength": ">400MPa",
      "elongation": ">20%",
      "fatigue": "2M_cycles"
    },
    "nonDestructive": {
      "ultrasonic": "Class_B",
      "xray": "Class_2",
      "dyePenetrant": "Level_2"
    }
  },
  "monitoring": {
    "realTime": ["current", "voltage", "arc_length", "travel_speed"],
    "postWeld": ["geometry", "strength", "appearance"],
    "statistical": {
      "sampleSize": "1_per_100_welds",
      "controlCharts": ["x_bar", "r_chart"],
      "capability": "Cpk_>_1.67"
    }
  }
};

// paint-booth-env-config.json
export const paintBoothEnvConfig = {
  "system": {
    "name": "PaintBoothEnvironmentalControl",
    "version": "1.8.0",
    "environment": "production",
    "compliance": ["EPA", "OSHA", "ISO14001"]
  },
  "environmental": {
    "temperature": {
      "target": "23C",
      "tolerance": "±2C",
      "controlMethod": "PID",
      "sensors": 12
    },
    "humidity": {
      "target": "60%RH",
      "maximum": "65%RH",
      "dehumidification": "desiccant",
      "monitoring": "continuous"
    },
    "airflow": {
      "velocity": "0.25m/s ±0.05m/s",
      "pattern": "laminar_flow",
      "filtration": "HEPA_H13",
      "changeRate": "20_air_changes_per_hour"
    }
  },
  "vocMonitoring": {
    "compounds": ["toluene", "xylene", "methyl_ethyl_ketone", "isopropanol"],
    "limits": {
      "toluene": "100ppm",
      "xylene": "100ppm", 
      "mek": "200ppm",
      "ipa": "400ppm"
    },
    "measurement": {
      "method": "photoionization_detector",
      "frequency": "continuous",
      "calibration": "daily"
    },
    "abatement": {
      "type": "thermal_oxidizer",
      "efficiency": ">99%",
      "temperature": "760C"
    }
  },
  "safety": {
    "fireSupression": "dry_chemical",
    "emergencyShutdown": "automated",
    "ventilationFailsafe": "maintain_negative_pressure",
    "alarms": ["high_voc", "high_temp", "low_airflow", "filter_clog"]
  }
};

// transmission-diagnostics.json  
export const transmissionDiagnostics = {
  "system": {
    "name": "TransmissionDiagnosticSystem",
    "version": "2.5.0",
    "environment": "production",
    "transmissionTypes": ["automatic", "manual", "cvt"]
  },
  "diagnostics": {
    "fluidAnalysis": {
      "color": "red_translucent",
      "viscosity": "within_spec",
      "contaminants": "<5%",
      "temperature": "80C_operating"
    },
    "pressureTests": {
      "lineP": "150psi ±10psi",
      "modP": "50-150psi_variable",
      "converterP": "80psi ±5psi",
      "leakDown": "<10psi_per_minute"
    },
    "electricalTests": {
      "solenoids": "6-14ohms",
      "sensors": "0.5-4.5V",
      "wiring": "continuity_check",
      "can_communication": "active"
    }
  },
  "procedures": {
    "automatic": ["fluid_check", "pressure_test", "stall_test", "road_test"],
    "manual": ["clutch_test", "syncro_test", "shift_quality", "noise_check"],
    "cvt": ["belt_condition", "pulley_alignment", "fluid_condition", "ratio_sweep"]
  },
  "errorCodes": {
    "range": "P0700-P0799",
    "storage": "persistent_and_pending",
    "clearing": "scan_tool_required",
    "reporting": "dtc_status_byte"
  },
  "tools": {
    "required": ["scan_tool", "pressure_gauge", "oscilloscope", "fluid_analyzer"],
    "optional": ["road_test_equipment", "transmission_jack", "special_tools"]
  }
};

// inventory-api-config.json
export const inventoryApiConfig = {
  "api": {
    "name": "SupplyChainInventoryAPI",
    "version": "1.9.0",
    "baseUrl": "https://api.manufacturing.company.com/v1",
    "authentication": "oauth2",
    "rateLimit": {
      "requests": 1000,
      "window": "per_hour",
      "burst": 50
    }
  },
  "endpoints": {
    "parts": {
      "tracking": "/parts/{partNumber}/tracking",
      "availability": "/parts/{partNumber}/availability",
      "quality": "/parts/{partNumber}/certifications"
    },
    "suppliers": {
      "list": "/suppliers",
      "performance": "/suppliers/{supplierId}/metrics",
      "contracts": "/suppliers/{supplierId}/contracts"
    },
    "inventory": {
      "levels": "/inventory/levels",
      "movements": "/inventory/movements",
      "forecasting": "/inventory/demand-forecast"
    }
  },
  "dataFormats": {
    "request": "application/json",
    "response": "application/json",
    "encoding": "UTF-8",
    "compression": "gzip"
  },
  "monitoring": {
    "healthCheck": "/health",
    "metrics": "/metrics",
    "logging": "structured_json",
    "alerting": {
      "errorRate": ">5%",
      "responseTime": ">2000ms",
      "availability": "<99.5%"
    }
  },
  "security": {
    "https": "required",
    "apiKey": "header_based",
    "tokenExpiry": "1_hour",
    "scopes": ["inventory:read", "inventory:write", "suppliers:read"]
  }
};

export const allMockConfigurations = {
  brakeInspectionConfig,
  bmsConfiguration, 
  sensorCalibrationConfig,
  engineQualityStandards,
  weldingStandardsConfig,
  paintBoothEnvConfig,
  transmissionDiagnostics,
  inventoryApiConfig
};
