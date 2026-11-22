# MuberFleet Operation Guide

> **Technical writing portfolio sample — fictional recruitment exercise**
>
> This guide was written for a fictional technical writing recruitment challenge. MuberFleet, its GUI, API endpoints, identifiers, support contacts, responses, and operational procedures are illustrative. They do not describe a live product, and this guide must not be used for real-world vehicle configuration or safety decisions.

**Author:** Rafael Oliveira  
**Original document date:** 15 February 2026  
**Format:** GUI operation guide and REST API quick reference

###  Overview

This guide is intended for **developers and system integrators** responsible for configuring, validating, and deploying autonomous vehicles on the MuberFleet platform.  
 It covers vehicle initialization through either the Graphical User Interface (GUI) or the RESTful API.  

For API setup instructions, see the [MuberFleet API Quick Guide](#muberfleet-api-quick-guide).

---
##  GUI Initialization Guide
### **Section 1: Prerequisites**

Before initialization, the vehicle must be registered in the MuberFleet Registry database, configured with the appropriate operational profile, and validated against mandatory safety and monitoring requirements.

To prevent registration failures, confirm the following conditions are met:

1. The vehicle is **powered on** and **connected to the MuberFleet network**.  
    * The Network Connectivity icon in the GUI header must display `Connected`.   
2. The **operator has administrator privileges** in the GUI.
     * The User Role Label in the GUI header must display `Administrator`.
3. **Camera and LiDAR** (Light Detection and Ranging) sensors are operational.
4. The vehicle is in **Idle** state (not en route or charging).
  
> **Warning**
>
> Critical configuration or registration errors will occur if these conditions are not met.

---
### **Section 2: Assigning a Fleet ID**

Each vehicle must have a **unique Fleet ID**.  
This identifier is stored in the MuberFleet Registry database and enables integration with the monitoring system.


#### **2.1 Format**

The Fleet ID must have a **five-digit numeric identifier** and follow this structure:

```
FLEET-#####

Example: FLEET-12345
```

#### **2.2 Procedure**

1. Using the GUI, access **Fleet Management** → **Add New Vehicle**.
2. In the **Fleet ID** field, enter a unique identifier following the required format.
3. Click **Validate ID** to verify that no duplication exists.
4. Click **Register Vehicle** to commit the ID to the system.

#### **2.3 Best practices**

* Use a centralized registry to avoid ID collisions across regions.
* Do not reuse Fleet IDs from decommissioned vehicles unless their historical records have been archived or removed.

---
### **Section 3: Terrain Calibration**

Terrain calibration defines how the vehicle adapts to its operating environment by adjusting **suspension parameters**, **navigation behavior**, and **route optimization logic**.  

Selecting the correct profile improves stability, routing efficiency, and sensor accuracy.   
The following table summarizes the **supported terrain profiles** and their associated configuration parameters:

| Terrain Type | Optimization Focus | Suspension Adjustment |
| :--- | :--- | :--- |
| `Urban` | Dense traffic and short-distance routing | Standard/Baseline parameters |
| `Suburban` | Balanced routing and performance | Moderate suspension adjustment |
| `Off-road` | Alternative route optimization | Increased suspension height |

#### **3.1 Procedure**

1. Navigate to **Vehicle Settings** → **Terrain Calibration**.
2. Select the **appropriate terrain type** that corresponds to the vehicle’s deployment zone.
3. Click **Run Calibration Test**.
    * The system will simulate sensor input and route planning logic.
4. Review the **Calibration Report** for errors or warnings.
5. If no issues are detected, click **Apply Profile**.

#### **3.2 Validation**

After applying the profile, verify that:

* Vehicle status displays `Idle (Calibrated)`.
* Sensor alignment indicators (Camera and LiDAR) show `Normal` status.
  
> **Warning**
>
> Incorrect terrain selection may cause unnecessary rerouting, inefficient suspension behavior, or degraded route optimization performance.

---
### **Section 4: Safety Protocol Enforcement**

Before a vehicle can enter active service, it must comply with **MuberFleet safety standards**.  

This ensures that autonomous operations do not compromise passenger safety, vehicle integrity, or network reliability. Following these safety standards protects personnel, ensures compliance with regulations, and minimizes operational risks.

#### **4.1 Manual Intervention Logging**

Manual intervention logging **is mandatory** for audit and compliance purposes.  
To enable:

1. Navigate to **Safety** → **Manual Control Logs**.
2. Set **Logging Mode** to `Enabled` (**mandatory**).
  
Each manual takeover will record:

* Timestamp.
* Operator ID.
* Reason for intervention.
* Duration of control.

> **Warning**
> 
> Failure to log interventions may result in compliance violations.

####  **4.2 Sensor Verification**

Verifying that all sensors are functioning correctly ensures that the vehicle can perceive its environment accurately.  This supports safe navigation and timely responses to obstacles or route changes.

From the **Monitoring Dashboard**, open **Sensor Status** and confirm that:

1. Camera feeds are active.
2. LiDAR mapping is operational.
3. No diagnostic warnings are present.

**Status must indicate**: `All Systems Operational`.

#### **4.3 Alert Acknowledgment Configuration**

Vehicles continuously report operational events and safety conditions to the monitoring system.  
Proper alert configuration ensures incidents are reviewed promptly and escalated when necessary.

To configure alert handling:

1. Open **Monitoring Dashboard** → **Alert Settings**.
2. Confirm **Notifications** are set to `Enabled`.
3. Verify that the **Acknowledgment Timeout** is set to **2 minutes** (default value). 
If it has been modified, restore the default setting.
4. Verify that **Escalation Rules** are active for unacknowledged alerts.
    * Escalation should notify a secondary operator or supervisor.


> **Note**
> 
> Operators must acknowledge alerts within the defined time window.

---
### **Section 5: Pre-Activation Checklist**

Before activating the vehicle for commercial operation, confirm all conditions below:

* [ ] Fleet ID assigned and validated.
* [ ] Terrain profile calibrated and applied.
* [ ] Calibration test completed without errors.
* [ ] Cameras and LiDAR operational.
* [ ] Manual intervention logging enabled.
* [ ] Alert acknowledgment timer configured (2 minutes).
* [ ] Vehicle visible in Monitoring Dashboard.
* [ ] No active alerts.

> **Warning** 
>
> The vehicle must not be activated unless all checklist items are verified.

---
### **Section 6: Final Activation**

After configuration is complete and all items in the Pre-Activation Checklist have been verified:

1. Review the **Vehicle Summary Screen**, confirming:
    * Fleet ID.
    * Terrain type.
    * Sensor Status.
    * Safety logging status.

2. Click **Activate Vehicle**.

3. Confirm that the vehicle appears in the Monitoring System dashboard and displays:
    * Battery level (0-100%).
    * Navigation status: `Idle (Calibrated)`.
    * No active alerts.

---
### **Section 7: Common Setup Issues and Troubleshooting**

Configuration errors during initialization throughout the MuberFleet platform can lead to monitoring inconsistencies, degraded navigation performance, or compliance risks.  Most issues result from incorrect profile selection, incomplete validation steps, or misinterpretation of system telemetry.  

The following table outlines the most common setup issues observed during deployment, their operational impact, and recommended prevention measures. 

| Issue | Context |Impact | Prevention/Resolution |
| :--- | :--- | :--- | :--- |
| **Prerequisite Failure** | [Section 1](#section-1-prerequisites) | Critical registration or configuration errors | Ensure vehicle is **powered on**, **connected**, and in an **Idle state** before starting |
| **Duplicate Fleet ID** | [Section 2.2](#22-procedure) | Registration failure or monitoring conflicts | Always use the **Validate ID** button before clicking "Register Vehicle" |
| **Incorrect Terrain Selection** | [Section 3](#section-3-terrain-calibration) | Unnecessary rerouting, unstable suspension, or degraded route optimization | Validate the intended deployment environment (Urban, Suburban, Off-road) before applying the profile |
|**Calibration Test Failure** | [Section 3.1](#31-procedure) | Sensor misalignment or navigation instability | Never skip the built-in simulation test; review the **Calibration Report** for warnings before applying the profile | 
|**Logging Disabled** | [Section 4.1](#41-manual-intervention-logging) | Compliance violations and loss of audit traceability | Verify that **Manual Control Logs** are set to "Enabled" before vehicle activation |
| **Unacknowledged Alerts** | [Section 4.3](#43-alert-acknowledgment-configuration) | Escalation rules triggered; potential safety risks | Ensure operators acknowledge alerts (e.g., obstacle detected) within the **2-minute** default window |

### Section 8: Escalation and Support

This section describes the escalation procedure for issues that cannot be resolved through standard troubleshooting steps.

Before escalating an issue:

1. Verify that all prerequisite conditions and configuration steps have been completed.
2. Review system logs and error messages in the Monitoring Dashboard for additional diagnostic details.
3. Do not activate the vehicle if safety or calibration status is unclear.

If the issue persists, contact the **MuberFleet Support Team (fictional)** with the following information:

- Fleet ID.
- Description of the issue.
- Relevant error messages or screenshots.
- Recent configuration changes (if any).

---
## MuberFleet API Quick Guide
### **Section 1: API Overview**

The **MuberFleet API** is a RESTful API designed for developers and system integrators to programmatically configure, validate, and monitor autonomous vehicles. This interface provides functionality equivalent to the proprietary GUI, ensuring that all fleet operations can be automated or integrated into existing enterprise systems.

**Key Capabilities**

* **Registration**: Assign and validate unique Fleet IDs in the MuberFleet Registry database.
* **Configuration**: Define terrain profiles to adjust suspension and navigation logic.
* **Monitoring**: Access real-time telemetry, including battery levels and navigation status.
* **Safety Enforcement**: Enable mandatory manual intervention logging and manage alert acknowledgments.

**Base URL**: `http://api.muber.fleet:1234/v2`


> **Note**
>
> All endpoints require authenticated requests, and the API exclusively uses JSON format for both requests and responses.

---
### **Section 2: Authentication & Session Management**

All requests to the MuberFleet API must be authenticated to protect sensitive vehicle configurations, safety settings, and operational telemetry.

#### 2.1 Bearer Token Authentication

All API requests require authentication using a bearer token.  
The token must be included in the HTTP headers of every request.

**Required Header Structure**:
```http
Authorization: Bearer <access_token>

Content-Type: application/json
```
> **Warning**
>
> Requests missing a valid token will not be processed.

#### 2.2 Session Management

To ensure secure access to the platform, the following rules apply:

* **Token Validity**: Access tokens remain **valid for 24 hours**. After expiration, a new token must be requested to continue using the API.
* **Token Renewal**: Replacement tokens are issued by the **MuberFleet Support Team (fictional)**.

> **Warning**
> 
> Calls made with an expired, invalid, or missing token will return a `401 Unauthorized` response.

---
### **Section 3: Core Endpoints for Daily Operations**

The following endpoints support the most common vehicle lifecycle operations.  

#### **3.1 Create Vehicle**

Registers a new vehicle in the MuberFleet Registry database.

**POST** `/create`

**Request Body**
```json
{
  "fleet_id": "FLEET-12345" 
}
```
The `fleet_id` must follow the format `FLEET-#####`, where `#####` is a **unique five-digit number** identifier.

**Response (201 Created)**
```json
{
  "vehicle_id": "veh_12345",
  "status": "registered",
  "message": "Vehicle successfully created."
}
```

**Possible Errors**:
* `400 Bad Request`: Invalid Fleet ID format.
* `409 Conflict`: Fleet ID already exists in the database.

#### **3.2 Configure Terrain Profiles**

Updates or recalibrates the terrain configuration.  
Selecting the correct profile ensures stable suspension behavior, consistent navigation logic, and accurate sensor interpretation.

**Supported Terrain Profiles**: `urban`, `suburban`, `off_road`.

**PUT** `/vehicle/{vehicle_id}/terrain`

**Request Body**
```json
{
  "terrain_profile": "off_road"
}
```

**Response (200 OK)**
```json
{
  "vehicle_id": "veh_12345",
  "terrain_profile": "off_road", 
  "calibration_parameters": {
    "suspension_height": "high",
    "route_optimization": "aggressive"
  } 
}
```

> **Note**
>
> After configuration, a calibration test must be triggered.

#### **3.3 Run Calibration Test**

Simulates sensor input and route planning logic to ensure system readiness.

**POST** `/vehicle/{vehicle_id}/calibrate`

**Response (200 OK)**
```json
{
  "vehicle_id": "veh_12345",
  "calibration_status": "successful"
}
```

**Failure States**

If the response returns `"calibration_status": "failed"`, inspect the `"errors"` array before attempting to apply the profile.

```json
{
  "calibration_status": "failed",
  "errors": ["sensor_misalignment"]
}
```

#### **3.4 Monitor Vehicle Status**

Retrieves real-time operational data.

**GET** `/monitor/{vehicle_id}`

**Response (200 OK)**
```json
{
  "battery_level": 82,
  "navigation_status": "idle_calibrated",
  "incident_alert": null,
  "sensor_status": "operational"
}
```

Ensure `sensor_status` is `"operational"` and `navigation_status` is `"idle_calibrated"` before activation.

> **Warning**
>
> Battery telemetry may lag by up to 5 seconds.   
> Verify stable readings before taking operational decisions.

#### **3.5 Enable Manual Intervention Logging**

Manual intervention logging must be enabled for all operational vehicles to ensure audit traceability and regulatory compliance.

**PUT** `/vehicle/{vehicle_id}/safety/logging`

**Request Body**
```json
{
  "logging_enabled": true
}
```

**Response**
```json
{
  "logging_enabled": true,
  "mode": "mandatory"
}
```
Once enabled, the system enforces mandatory logging for all manual control events.  

> **Warning**
>
> Vehicles cannot be activated unless logging is active.

#### **3.6 Acknowledge Alert**

Acknowledges an active vehicle alert and records operator response time.

**POST** `/vehicle/{vehicle_id}/alerts/{alert_id}/acknowledge`

**Response**
```json
{
  "alert_id": "alert_456",
  "status": "acknowledged",
  "acknowledged_by": "operator_22",
  "timestamp": "2026-02-12T10:22:31Z"
}
```
> **Warning**
>
> Alerts must be acknowledged within 2 minutes.  
Unacknowledged alerts will automatically trigger escalation procedures.

#### **3.7 Activate Vehicle**

Transitions a vehicle to operational status.

**POST** `/vehicle/{vehicle_id}/activate`

**Response**
```json
{
  "vehicle_id": "veh_12345",
  "status": "operational"
}
```

Activation will only succeed if the following preconditions are met:

* A valid, unique Fleet ID is assigned.
* Manual logging is **enabled**.
* Calibration Test status is **successful**.
* There are **no active alerts**.

---
### **Section 4: Operational Best Practices**

To ensure autonomous operations do not compromise passenger safety or network reliability, operators and integrators should follow these guidelines:

* **Registry Management**: Use a centralized registry to prevent Fleet ID collisions across different regions.
* **Lifecycle Control**: Do not reuse Fleet IDs from decommissioned vehicles without first clearing all historical logs from the system.
* **Proactive Validation**: Validate the Fleet ID format and confirm uniqueness before submitting any registration request.
* **Simulation First**: Always perform the Calibration Test and run the built-in simulation to detect potential sensor misalignment.
* **Audit Readiness**: Log every manual intervention to ensure regulatory compliance and  traceability.
* **Stable Telemetry**: Avoid triggering automated responses based on short-term battery fluctuations; rely on sustained trends instead.

---
### Section 5: API Technical Error Codes

The MuberFleet API returns standard HTTP status codes to indicate the success or failure of your requests.

#### 5.1 Common Failure States

* `400 Bad Request`
  * Returned if the `fleet_id` does not follow the required structure `FLEET-#####` (a **unique five-digit number**).
  * Returned during a **POST** `/vehicle/{vehicle_id}/activate` request if mandatory steps have not been confirmed.
  
* `401 Unauthorized`
  * Returned if the request is missing a **valid bearer token** in the header.

* `409 Conflict`
  * Returned during a **POST** `/create` request if the submitted Fleet ID already exists in the MuberFleet Registry database.

#### 5.2 Technical Support

If you encounter an undocumented error code, or if the "Activate Vehicle" command fails despite meeting all prerequisites:

1. Verify that your bearer token has not exceeded its 24-hour validity period.
2. Contact the **MuberFleet Support Team (fictional)** for technical assistance or token renewal.

---
## About this sample

This documentation is an independently written portfolio sample prepared for a fictional recruitment exercise. The names, workflows, API specifications, and examples are not representations of an actual deployed system. They are included to demonstrate information architecture, procedural writing, API documentation, validation steps, troubleshooting, and consistent technical terminology.
