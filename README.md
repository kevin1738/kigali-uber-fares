# Kigali Uber Fares Power BI

A comprehensive business intelligence dashboard analyzing Uber ride-sharing data in Kigali, Rwanda. This project provides insights into fare patterns, demand trends, and district-wise performance metrics.

## 📊 Project Overview

This repository contains a complete Power BI dashboard solution for analyzing Uber fares in Kigali, including:
- Interactive visualizations and KPI tracking
- District-wise performance analysis
- Time-based demand patterns
- Revenue and growth trend analysis

## 🗂 Repository Structure

\\\`
kigali-uber-fares/
├── data/
│   ├── raw/
│   │   └── uber_rides_raw.csv
│   ├── cleaned/
│   │   ├── kigali_uber_fares_cleaned.csv
│   │   ├── district_performance.csv
│   │   ├── monthly_trends.csv
│   │   └── time_of_day_analysis.csv
│   └── processed/
│       └── dashboard_data.csv
├── dashboard/
│   └── Kigali_Uber_Dashboard.pbix
├── screenshots/
│   ├── 01_data_cleaning_process.png
│   ├── 02_power_bi_data_model.png
│   ├── 03_dashboard_overview.png
│   ├── 04_district_analysis.png
│   ├── 05_trends_visualization.png
│   └── 06_final_dashboard.png
├── scripts/
│   ├── data_cleaning.py
│   └── data_validation.py
├── docs/
│   ├── data_dictionary.md
│   ├── analysis_methodology.md
│   └── dashboard_user_guide.md
└── README.md


## 📈 Key Metrics & Insights

### Performance Summary
- *Total Revenue*: 61.6M RWF (6-month period)
- *Total Rides*: 22,700 rides
- *Average Fare*: 2,715 RWF
- *Peak Hours*: 6-9 PM (highest demand)
- *Top District*: Gasabo (highest average fare: 3,200 RWF)

### Key Findings
1. *Peak Demand*: Evening hours (6-9 PM) show 40% higher demand than off-peak
2. *District Performance*: Gasabo leads in fare value, Nyarugenge in volume
3. *Growth Trend*: Consistent 8-12% month-over-month growth
4. *Service Mix*: UberX dominates with 45% market share

## 🛠 Data Processing Pipeline

### 1. Data Collection
- Raw ride data from Uber API simulation
- Geographic data for Kigali districts
- Time-series data for trend analysis

### 2. Data Cleaning Process
- Removed duplicate entries and invalid records
- Standardized district names and coordinates
- Handled missing values using median imputation
- Validated fare ranges and ride durations

### 3. Data Transformation
- Created calculated columns for analysis
- Aggregated data by district, time, and service type
- Generated KPI metrics and performance indicators

## 📊 Dashboard Features

### Interactive Visualizations
- *Revenue Trends*: Monthly performance tracking
- *District Analysis*: Comparative performance metrics
- *Time Patterns*: Demand analysis by hour/day
- *Service Types*: Market share distribution
- *KPI Cards*: Real-time performance indicators

### Filtering Options
- District selection (Nyarugenge, Gasabo, Kicukiro, etc.)
- Time period filtering (1M, 3M, 6M, 1Y)
- Service type filtering
- Date range selection

## 🚀 Getting Started

### Prerequisites
- Microsoft Power BI Desktop (latest version)
- Python 3.8+ (for data processing scripts)
- Git for version control

### Installation Steps

1. *Clone the repository*
   \\\`bash
   git clone https://github.com/kevin1738/kigali-uber-fares.git
   cd kigali-uber-fares
   \\\`

2. *Install Python dependencies*
   \\\`bash
   pip install pandas numpy matplotlib seaborn
   \\\`

3. *Open Power BI Dashboard*
   - Launch Power BI Desktop
   - Open \dashboard/Kigali_Uber_Dashboard.pbix\
   - Refresh data connections if needed

### Data Refresh Process
1. Place new raw data in \data/raw/\ folder
2. Run data cleaning script: \python scripts/data_cleaning.py\
3. Refresh Power BI data model
4. Update dashboard visualizations

## 📋 Data Dictionary

### Main Dataset Fields
| Field Name | Data Type | Description |
|------------|-----------|-------------|
| ride_id | String | Unique identifier for each ride |
| pickup_datetime | DateTime | Ride start timestamp |
| dropoff_datetime | DateTime | Ride end timestamp |
| pickup_district | String | Origin district in Kigali |
| dropoff_district | String | Destination district |
| fare_amount | Decimal | Total fare in RWF |
| service_type | String | Uber service category |
| distance_km | Decimal | Trip distance in kilometers |
| duration_minutes | Integer | Trip duration in minutes |

## 🔍 Analysis Methodology

### Statistical Approach
- *Descriptive Analytics*: Summary statistics and distributions
- *Trend Analysis*: Time-series decomposition and forecasting
- *Comparative Analysis*: District and service type comparisons
- *Correlation Analysis*: Relationship between variables

### Validation Methods
- Data quality checks and outlier detection
- Cross-validation with external sources
- Statistical significance testing
- Business logic validation

## 📸 Screenshots & Documentation


The \screenshots/\ folder contains detailed documentation of:
- Data cleaning and preparation process
- Power BI data model relationships
- Dashboard development stages
- Final visualization outputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\git checkout -b feature/new-analysis\)
3. Commit your changes (\git commit -am 'Add new analysis'\)
4. Push to the branch (\git push origin feature/new-analysis\)
5. Create a Pull Request


## 📞 Contact

*Project Maintainer*: [MUCYO Kevin]
- Email: kvnmucyo@gmail.com
- GitHub: [@kevin1738](https://github.com/kevin1738)

## 🙏 Acknowledgments

- Uber Technologies for ride-sharing data insights
- Rwanda Development Board for geographic data
- Power BI community for visualization best practices

---
\\\`<img width="912" height="381" alt="dashboard " src="https://github.com/user-attachments/assets/3e7c090a-b945-4d7d-b50b-92bbf9dd498b" />

