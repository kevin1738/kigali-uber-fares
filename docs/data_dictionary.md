# Data Dictionary - Kigali Uber Fares Dashboard

## Overview
This document provides detailed descriptions of all data fields used in the Kigali Uber Fares dashboard analysis.

## Main Dataset: kigali_uber_fares_cleaned.csv

### Primary Fields

| Field Name | Data Type | Description | Example | Constraints |
|------------|-----------|-------------|---------|-------------|
| ride_id | String | Unique identifier for each ride | UBR001 | Primary key, not null |
| pickup_datetime | DateTime | Timestamp when ride started | 2024-01-15 08:30:00 | ISO format, not null |
| dropoff_datetime | DateTime | Timestamp when ride ended | 2024-01-15 08:45:00 | ISO format, > pickup_datetime |
| pickup_district | String | Origin district in Kigali | Nyarugenge | Standardized district names |
| dropoff_district | String | Destination district | Gasabo | Standardized district names |
| fare_amount | Decimal | Total fare in Rwandan Francs | 2500.00 | > 0, currency in RWF |
| service_type | String | Uber service category | UberX | Predefined service types |
| distance_km | Decimal | Trip distance in kilometers | 5.2 | > 0, measured in km |
| duration_minutes | Integer | Trip duration in minutes | 15 | > 0, whole numbers |

### Geographic Fields

| Field Name | Data Type | Description | Example | Constraints |
|------------|-----------|-------------|---------|-------------|
| pickup_lat | Decimal | Pickup location latitude | -1.9441 | Decimal degrees |
| pickup_lng | Decimal | Pickup location longitude | 30.0619 | Decimal degrees |
| dropoff_lat | Decimal | Dropoff location latitude | -1.9706 | Decimal degrees |
| dropoff_lng | Decimal | Dropoff location longitude | 30.1044 | Decimal degrees |

### Calculated Fields

| Field Name | Data Type | Description | Calculation | Purpose |
|------------|-----------|-------------|-------------|---------|
| hour | Integer | Hour of pickup (0-23) | HOUR(pickup_datetime) | Time analysis |
| day_of_week | String | Day name | DAYNAME(pickup_datetime) | Weekly patterns |
| month | Integer | Month number (1-12) | MONTH(pickup_datetime) | Monthly trends |
| year | Integer | Year | YEAR(pickup_datetime) | Yearly analysis |

## District Performance Dataset: district_performance.csv

| Field Name | Data Type | Description | Calculation |
|------------|-----------|-------------|-------------|
| district | String | District name | Primary key |
| total_rides | Integer | Total number of rides | COUNT(ride_id) |
| total_revenue | Decimal | Total revenue in RWF | SUM(fare_amount) |
| avg_fare | Decimal | Average fare per ride | AVG(fare_amount) |
| avg_distance | Decimal | Average trip distance | AVG(distance_km) |
| avg_duration | Decimal | Average trip duration | AVG(duration_minutes) |
| market_share_rides | Decimal | Percentage of total rides | (district_rides/total_rides)*100 |
| market_share_revenue | Decimal | Percentage of total revenue | (district_revenue/total_revenue)*100 |

## Monthly Trends Dataset: monthly_trends.csv

| Field Name | Data Type | Description | Calculation |
|------------|-----------|-------------|-------------|
| month | Integer | Month number | MONTH(pickup_datetime) |
| year | Integer | Year | YEAR(pickup_datetime) |
| total_rides | Integer | Monthly ride count | COUNT(ride_id) |
| total_revenue | Decimal | Monthly revenue | SUM(fare_amount) |
| avg_fare | Decimal | Monthly average fare | AVG(fare_amount) |
| growth_rate_rides | Decimal | Month-over-month ride growth % | ((current-previous)/previous)*100 |
| growth_rate_revenue | Decimal | Month-over-month revenue growth % | ((current-previous)/previous)*100 |

## Time Analysis Dataset: time_of_day_analysis.csv

| Field Name | Data Type | Description | Values |
|------------|-----------|-------------|---------|
| time_period | String | Time range label | "6-9 AM", "9-12 PM", etc. |
| hour_start | Integer | Period start hour | 6, 9, 12, 15, 18, 21 |
| hour_end | Integer | Period end hour | 9, 12, 15, 18, 21, 24 |
| total_rides | Integer | Rides in time period | COUNT(ride_id) |
| avg_fare | Decimal | Average fare for period | AVG(fare_amount) |
| total_revenue | Decimal | Revenue for period | SUM(fare_amount) |
| demand_category | String | Demand classification | Peak, Off-Peak, Moderate, Night |

## Data Quality Standards

### Validation Rules
1. **Completeness**: No null values in primary fields
2. **Accuracy**: Fare amounts within reasonable range (500-10000 RWF)
3. **Consistency**: District names standardized across all records
4. **Timeliness**: Data updated within 24 hours of ride completion
5. **Uniqueness**: Each ride_id appears only once

### Data Types and Formats
- **Dates**: ISO 8601 format (YYYY-MM-DD HH:MM:SS)
- **Currency**: Rwandan Francs (RWF), no decimal places for whole amounts
- **Coordinates**: Decimal degrees with 4 decimal places precision
- **Percentages**: Decimal format (e.g., 0.15 for 15%)

### Business Rules
1. **Minimum Fare**: 500 RWF (regulatory requirement)
2. **Maximum Distance**: 50km (service area limitation)
3. **Valid Districts**: Only Kigali metropolitan area districts
4. **Service Hours**: 24/7 operation with surge pricing during peak hours

## Reference Data

### Kigali Districts
- **Nyarugenge**: Central business district
- **Gasabo**: Northern district, includes airport
- **Kicukiro**: Southern district, industrial area
- **Rwamagana**: Eastern province connection
- **Musanze**: Northern province connection

### Service Types
- **UberX**: Standard sedan service
- **UberXL**: Larger vehicle for groups
- **Uber Moto**: Motorcycle taxi service
- **Uber Premium**: Luxury vehicle service

### Peak Hours Definition
- **Morning Peak**: 6:00-9:00 AM
- **Evening Peak**: 3:00-6:00 PM, 6:00-9:00 PM
- **Off-Peak**: 9:00 AM-3:00 PM
- **Night**: 9:00 PM-6:00 AM

---
*Last Updated: January 2024*
*Version: 1.0*
\`\`\`
