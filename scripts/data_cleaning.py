import pandas as pd
import numpy as np
from datetime import datetime
import os

def clean_uber_data(input_file, output_dir):
    """
    Clean and process Uber rides data for Kigali dashboard
    """
    print("Starting data cleaning process...")
    
    # Read raw data
    df = pd.read_csv(input_file)
    print(f"Loaded {len(df)} raw records")
    
    # Remove duplicates
    df = df.drop_duplicates(subset=['ride_id'])
    print(f"After removing duplicates: {len(df)} records")
    
    # Convert datetime columns
    df['pickup_datetime'] = pd.to_datetime(df['pickup_datetime'])
    df['dropoff_datetime'] = pd.to_datetime(df['dropoff_datetime'])
    
    # Remove invalid records
    df = df[df['fare_amount'] > 0]
    df = df[df['distance_km'] > 0]
    df = df[df['duration_minutes'] > 0]
    print(f"After removing invalid records: {len(df)} records")
    
    # Standardize district names
    district_mapping = {
        'nyarugenge': 'Nyarugenge',
        'gasabo': 'Gasabo', 
        'kicukiro': 'Kicukiro',
        'rwamagana': 'Rwamagana',
        'musanze': 'Musanze'
    }
    
    df['pickup_district'] = df['pickup_district'].str.lower().map(district_mapping)
    df['dropoff_district'] = df['dropoff_district'].str.lower().map(district_mapping)
    
    # Remove records with unmapped districts
    df = df.dropna(subset=['pickup_district', 'dropoff_district'])
    print(f"After district standardization: {len(df)} records")
    
    # Handle outliers (fare amounts beyond reasonable range)
    Q1 = df['fare_amount'].quantile(0.25)
    Q3 = df['fare_amount'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    df = df[(df['fare_amount'] >= lower_bound) & (df['fare_amount'] <= upper_bound)]
    print(f"After outlier removal: {len(df)} records")
    
    # Create additional calculated columns
    df['hour'] = df['pickup_datetime'].dt.hour
    df['day_of_week'] = df['pickup_datetime'].dt.day_name()
    df['month'] = df['pickup_datetime'].dt.month
    df['year'] = df['pickup_datetime'].dt.year
    
    # Save cleaned main dataset
    output_file = os.path.join(output_dir, 'kigali_uber_fares_cleaned.csv')
    df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")
    
    # Generate district performance summary
    district_summary = df.groupby('pickup_district').agg({
        'ride_id': 'count',
        'fare_amount': ['sum', 'mean'],
        'distance_km': 'mean',
        'duration_minutes': 'mean'
    }).round(2)
    
    district_summary.columns = ['total_rides', 'total_revenue', 'avg_fare', 'avg_distance', 'avg_duration']
    district_summary['market_share_rides'] = (district_summary['total_rides'] / district_summary['total_rides'].sum() * 100).round(1)
    district_summary['market_share_revenue'] = (district_summary['total_revenue'] / district_summary['total_revenue'].sum() * 100).round(1)
    
    district_file = os.path.join(output_dir, 'district_performance.csv')
    district_summary.to_csv(district_file)
    print(f"District performance data saved to {district_file}")
    
    # Generate monthly trends
    monthly_trends = df.groupby(['year', 'month']).agg({
        'ride_id': 'count',
        'fare_amount': ['sum', 'mean']
    }).round(2)
    
    monthly_trends.columns = ['total_rides', 'total_revenue', 'avg_fare']
    monthly_trends = monthly_trends.reset_index()
    
    # Calculate growth rates
    monthly_trends['growth_rate_rides'] = monthly_trends['total_rides'].pct_change() * 100
    monthly_trends['growth_rate_revenue'] = monthly_trends['total_revenue'].pct_change() * 100
    monthly_trends = monthly_trends.fillna(0).round(1)
    
    trends_file = os.path.join(output_dir, 'monthly_trends.csv')
    monthly_trends.to_csv(trends_file, index=False)
    print(f"Monthly trends data saved to {trends_file}")
    
    # Generate time of day analysis
    def categorize_time(hour):
        if 6 <= hour < 9:
            return 'Peak', 6, 9
        elif 9 <= hour < 12:
            return 'Off-Peak', 9, 12
        elif 12 <= hour < 15:
            return 'Moderate', 12, 15
        elif 15 <= hour < 18:
            return 'Peak', 15, 18
        elif 18 <= hour < 21:
            return 'Peak', 18, 21
        else:
            return 'Night', 21, 24
    
    df[['demand_category', 'hour_start', 'hour_end']] = df['hour'].apply(
        lambda x: pd.Series(categorize_time(x))
    )
    
    time_analysis = df.groupby(['demand_category', 'hour_start', 'hour_end']).agg({
        'ride_id': 'count',
        'fare_amount': ['mean', 'sum']
    }).round(2)
    
    time_analysis.columns = ['total_rides', 'avg_fare', 'total_revenue']
    time_analysis = time_analysis.reset_index()
    
    # Create time period labels
    time_analysis['time_period'] = time_analysis.apply(
        lambda row: f"{int(row['hour_start'])}-{int(row['hour_end'])} {'AM' if row['hour_end'] <= 12 else 'PM'}", 
        axis=1
    )
    
    time_file = os.path.join(output_dir, 'time_of_day_analysis.csv')
    time_analysis.to_csv(time_file, index=False)
    print(f"Time analysis data saved to {time_file}")
    
    print("Data cleaning process completed successfully!")
    return df

if __name__ == "__main__":
    # Set file paths
    input_file = "data/raw/uber_rides_raw.csv"
    output_dir = "data/cleaned/"
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Run cleaning process
    cleaned_data = clean_uber_data(input_file, output_dir)
    
    print(f"\nData Cleaning Summary:")
    print(f"Total cleaned records: {len(cleaned_data)}")
    print(f"Date range: {cleaned_data['pickup_datetime'].min()} to {cleaned_data['pickup_datetime'].max()}")
    print(f"Districts covered: {cleaned_data['pickup_district'].nunique()}")
    print(f"Service types: {cleaned_data['service_type'].nunique()}")
