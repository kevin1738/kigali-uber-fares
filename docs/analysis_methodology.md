# Analysis Methodology - Kigali Uber Fares Dashboard

## Overview
This document outlines the analytical approach, statistical methods, and business intelligence techniques used in the Kigali Uber Fares dashboard project.

## 1. Data Collection Strategy

### 1.1 Data Sources
- **Primary Source**: Uber ride transaction data (simulated for demonstration)
- **Secondary Sources**: 
  - Rwanda geographic boundaries (NISR)
  - Kigali district administrative data
  - Economic indicators (National Bank of Rwanda)

### 1.2 Sampling Methodology
- **Time Period**: 6-month rolling window (January-June 2024)
- **Geographic Scope**: Greater Kigali metropolitan area
- **Sample Size**: 25,000+ ride records
- **Sampling Method**: Systematic random sampling to ensure representativeness

## 2. Data Processing Pipeline

### 2.1 Data Cleaning Process

#### Step 1: Initial Data Validation
\`\`\`python
# Remove duplicate records
df = df.drop_duplicates(subset=['ride_id'])

# Validate data types
df['pickup_datetime'] = pd.to_datetime(df['pickup_datetime'])
df['fare_amount'] = pd.to_numeric(df['fare_amount'], errors='coerce')
\`\`\`

#### Step 2: Outlier Detection and Treatment
- **Method**: Interquartile Range (IQR) method
- **Threshold**: 1.5 × IQR beyond Q1 and Q3
- **Treatment**: Remove extreme outliers, cap moderate outliers

#### Step 3: Missing Value Handling
- **Categorical Variables**: Mode imputation
- **Numerical Variables**: Median imputation for skewed distributions
- **Geographic Coordinates**: Remove records with missing coordinates

### 2.2 Feature Engineering

#### Temporal Features
\`\`\`python
df['hour'] = df['pickup_datetime'].dt.hour
df['day_of_week'] = df['pickup_datetime'].dt.day_name()
df['is_weekend'] = df['pickup_datetime'].dt.weekday >= 5
df['month'] = df['pickup_datetime'].dt.month
\`\`\`

#### Geographic Features
\`\`\`python
# Calculate trip distance using Haversine formula
def haversine_distance(lat1, lon1, lat2, lon2):
    # Implementation of distance calculation
    return distance_km
\`\`\`

#### Business Metrics
\`\`\`python
df['fare_per_km'] = df['fare_amount'] / df['distance_km']
df['fare_per_minute'] = df['fare_amount'] / df['duration_minutes']
\`\`\`

## 3. Statistical Analysis Methods

### 3.1 Descriptive Statistics
- **Central Tendency**: Mean, median, mode for fare distributions
- **Variability**: Standard deviation, coefficient of variation
- **Distribution Shape**: Skewness, kurtosis analysis

### 3.2 Time Series Analysis
- **Trend Analysis**: Linear regression for long-term trends
- **Seasonality**: Decomposition using STL (Seasonal and Trend decomposition using Loess)
- **Forecasting**: ARIMA models for demand prediction

### 3.3 Comparative Analysis
- **ANOVA**: Compare mean fares across districts
- **Chi-square Tests**: Analyze categorical relationships
- **Correlation Analysis**: Pearson correlation for continuous variables

## 4. Business Intelligence Approach

### 4.1 KPI Framework
Following the SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound):

#### Primary KPIs
1. **Revenue Growth Rate**: Month-over-month percentage change
2. **Average Fare per Ride**: Total revenue ÷ Total rides
3. **Market Share by District**: District revenue ÷ Total revenue
4. **Customer Satisfaction**: Average rating (when available)

#### Secondary KPIs
1. **Utilization Rate**: Active hours ÷ Total hours
2. **Distance Efficiency**: Revenue per kilometer
3. **Peak Hour Premium**: Peak fare ÷ Off-peak fare ratio

### 4.2 Segmentation Analysis

#### Geographic Segmentation
\`\`\`sql
SELECT 
    pickup_district,
    COUNT(*) as ride_count,
    AVG(fare_amount) as avg_fare,
    SUM(fare_amount) as total_revenue
FROM rides 
GROUP BY pickup_district
ORDER BY total_revenue DESC
\`\`\`

#### Temporal Segmentation
- **Peak vs Off-Peak Analysis**
- **Weekday vs Weekend Patterns**
- **Monthly Seasonal Trends**

#### Service Type Segmentation
- **Premium vs Standard Services**
- **Individual vs Group Transportation**

## 5. Visualization Strategy

### 5.1 Chart Selection Criteria
- **Trend Analysis**: Line charts for time series data
- **Comparison**: Bar charts for categorical comparisons
- **Distribution**: Histograms and box plots for fare distributions
- **Composition**: Pie charts for market share analysis
- **Correlation**: Scatter plots for relationship analysis

### 5.2 Dashboard Design Principles
1. **Progressive Disclosure**: High-level KPIs → Detailed analysis
2. **Consistent Color Coding**: Same colors for same metrics across charts
3. **Interactive Filtering**: Allow users to drill down by district, time, service type
4. **Mobile Responsiveness**: Ensure usability across devices

## 6. Quality Assurance Methods

### 6.1 Data Validation Checks
\`\`\`python
def validate_data_quality(df):
    checks = {
        'completeness': df.isnull().sum() / len(df) < 0.05,
        'uniqueness': df['ride_id'].nunique() == len(df),
        'validity': (df['fare_amount'] > 0).all(),
        'consistency': df['pickup_datetime'] < df['dropoff_datetime']
    }
    return checks
\`\`\`

### 6.2 Business Logic Validation
- **Fare Reasonableness**: Compare against known market rates
- **Geographic Consistency**: Validate coordinates within Kigali bounds
- **Temporal Logic**: Ensure pickup time < dropoff time

### 6.3 Statistical Validation
- **Normality Tests**: Shapiro-Wilk test for fare distributions
- **Stationarity Tests**: Augmented Dickey-Fuller for time series
- **Multicollinearity**: VIF (Variance Inflation Factor) analysis

## 7. Performance Metrics

### 7.1 Dashboard Performance
- **Load Time**: < 3 seconds for initial dashboard load
- **Refresh Rate**: Real-time updates every 15 minutes
- **Data Latency**: < 24 hours from transaction to dashboard

### 7.2 Analytical Accuracy
- **Forecast Accuracy**: MAPE (Mean Absolute Percentage Error) < 10%
- **Confidence Intervals**: 95% confidence level for all estimates
- **Cross-Validation**: 80/20 train-test split for model validation

## 8. Limitations and Assumptions

### 8.1 Data Limitations
- **Sample Bias**: Data may not represent all ride-sharing services
- **Temporal Coverage**: Limited to 6-month period
- **External Factors**: Economic events not captured in data

### 8.2 Analytical Assumptions
- **Market Stability**: Assumes consistent market conditions
- **Data Accuracy**: Assumes GPS and fare calculations are accurate
- **Representative Sample**: Sample represents broader population

### 8.3 Technical Constraints
- **Processing Power**: Analysis limited by available computing resources
- **Real-time Constraints**: Some analyses performed in batch mode
- **Storage Limitations**: Historical data retention policies apply

## 9. Future Enhancements

### 9.1 Advanced Analytics
- **Machine Learning**: Implement demand forecasting models
- **Geospatial Analysis**: Heat maps and route optimization
- **Customer Segmentation**: RFM (Recency, Frequency, Monetary) analysis

### 9.2 Data Enrichment
- **Weather Data**: Impact of weather on demand patterns
- **Event Data**: Special events affecting transportation demand
- **Economic Indicators**: Correlation with broader economic trends

### 9.3 Real-time Capabilities
- **Streaming Analytics**: Real-time demand monitoring
- **Alert Systems**: Automated anomaly detection
- **Dynamic Pricing**: Real-time fare optimization

---
*Methodology Version: 1.0*
*Last Updated: January 2024*
*Review Cycle: Quarterly*
\`\`\`
