"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Users, DollarSign, Clock, Filter, Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for Kigali Uber fares
const faresByDistrict = [
  { district: "Nyarugenge", avgFare: 2500, rides: 1250, revenue: 3125000 },
  { district: "Gasabo", avgFare: 3200, rides: 980, revenue: 3136000 },
  { district: "Kicukiro", avgFare: 2800, rides: 1100, revenue: 3080000 },
  { district: "Rwamagana", avgFare: 4500, rides: 450, revenue: 2025000 },
  { district: "Musanze", avgFare: 3800, rides: 320, revenue: 1216000 },
]

const monthlyTrends = [
  { month: "Jan", revenue: 8500000, rides: 3200, avgFare: 2656 },
  { month: "Feb", revenue: 9200000, rides: 3450, avgFare: 2667 },
  { month: "Mar", revenue: 10100000, rides: 3800, avgFare: 2658 },
  { month: "Apr", revenue: 9800000, rides: 3650, avgFare: 2685 },
  { month: "May", revenue: 11200000, rides: 4100, avgFare: 2732 },
  { month: "Jun", revenue: 12500000, rides: 4500, avgFare: 2778 },
]

const timeOfDayData = [
  { time: "6-9 AM", rides: 850, avgFare: 3200, category: "Peak" },
  { time: "9-12 PM", rides: 420, avgFare: 2800, category: "Off-Peak" },
  { time: "12-3 PM", rides: 650, avgFare: 2900, category: "Moderate" },
  { time: "3-6 PM", rides: 780, avgFare: 3100, category: "Peak" },
  { time: "6-9 PM", rides: 920, avgFare: 3400, category: "Peak" },
  { time: "9-12 AM", rides: 280, avgFare: 3800, category: "Night" },
]

const rideTypeData = [
  { type: "UberX", value: 45, color: "#0088FE" },
  { type: "UberXL", value: 25, color: "#00C49F" },
  { type: "Uber Moto", value: 20, color: "#FFBB28" },
  { type: "Uber Premium", value: 10, color: "#FF8042" },
]

const chartConfig = {
  revenue: { label: "Revenue (RWF)", color: "hsl(var(--chart-1))" },
  rides: { label: "Rides", color: "hsl(var(--chart-2))" },
  avgFare: { label: "Average Fare", color: "hsl(var(--chart-3))" },
}

export default function KigaliUberDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  const totalRevenue = monthlyTrends.reduce((sum, month) => sum + month.revenue, 0)
  const totalRides = monthlyTrends.reduce((sum, month) => sum + month.rides, 0)
  const avgFareOverall = totalRevenue / totalRides

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MapPin className="text-blue-600" />
                Kigali Uber Fares Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive analytics for ride-sharing services in Kigali, Rwanda</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex gap-4 items-center">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="nyarugenge">Nyarugenge</SelectItem>
                <SelectItem value="gasabo">Gasabo</SelectItem>
                <SelectItem value="kicukiro">Kicukiro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="ml-auto">
              Last Updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M RWF</div>
              <p className="text-xs text-blue-100">+12.5% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalRides / 1000).toFixed(1)}K</div>
              <p className="text-xs text-green-100">+8.2% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Fare</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgFareOverall)} RWF</div>
              <p className="text-xs text-purple-100">+3.8% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6-9 PM</div>
              <p className="text-xs text-orange-100">Highest demand period</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="districts">Districts</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-revenue)"
                          fill="var(--color-revenue)"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Ride Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Ride Types Distribution</CardTitle>
                  <CardDescription>Breakdown by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={rideTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {rideTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Time of Day Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Demand by Time of Day</CardTitle>
                <CardDescription>Ride volume and average fares throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeOfDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar yAxisId="left" dataKey="rides" fill="var(--color-rides)" />
                      <Bar yAxisId="right" dataKey="avgFare" fill="var(--color-avgFare)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="districts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by District</CardTitle>
                <CardDescription>Comparative analysis across Kigali districts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={faresByDistrict}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* District Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>District Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">District</th>
                        <th className="text-right p-3">Total Rides</th>
                        <th className="text-right p-3">Average Fare</th>
                        <th className="text-right p-3">Total Revenue</th>
                        <th className="text-right p-3">Market Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faresByDistrict.map((district, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{district.district}</td>
                          <td className="p-3 text-right">{district.rides.toLocaleString()}</td>
                          <td className="p-3 text-right">{district.avgFare.toLocaleString()} RWF</td>
                          <td className="p-3 text-right">{(district.revenue / 1000000).toFixed(1)}M RWF</td>
                          <td className="p-3 text-right">{((district.revenue / totalRevenue) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rides Growth Trend</CardTitle>
                  <CardDescription>Monthly ride volume progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="rides" stroke="var(--color-rides)" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Fare Trend</CardTitle>
                  <CardDescription>Fare evolution over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="avgFare" stroke="var(--color-avgFare)" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Data-driven observations and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Peak Performance</h4>
                    <p className="text-blue-700">
                      Evening hours (6-9 PM) show highest demand with 920 rides and premium fares averaging 3,400 RWF.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">District Leaders</h4>
                    <p className="text-green-700">
                      Gasabo district leads in average fare (3,200 RWF) while Nyarugenge has the highest ride volume
                      (1,250 rides).
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Growth Trend</h4>
                    <p className="text-purple-700">
                      Consistent month-over-month growth with May showing the strongest performance at 11.2M RWF
                      revenue.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">4.2</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">12min</div>
                    <div className="text-sm text-gray-600">Average Wait Time</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center text-gray-600">
          <p>© 2024 Kigali Uber Fares Dashboard - Professional Analytics Solution</p>
        </div>
      </div>
    </div>
  )
}
