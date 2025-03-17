"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, TrendingUp, Users, DollarSign, Activity } from "lucide-react"

// Define types for our data
interface DataItem {
  name: string
  revenue: number
  members: number
  sessions: number
}

// Mock data for charts
const monthlyData: DataItem[] = [
  { name: "Jan", revenue: 8500, members: 180, sessions: 320 },
  { name: "Feb", revenue: 9200, members: 195, sessions: 350 },
  { name: "Mar", revenue: 9800, members: 210, sessions: 380 },
  { name: "Apr", revenue: 10500, members: 225, sessions: 410 },
  { name: "May", revenue: 11200, members: 240, sessions: 440 },
  { name: "Jun", revenue: 10800, members: 235, sessions: 430 },
  { name: "Jul", revenue: 11500, members: 250, sessions: 460 },
  { name: "Aug", revenue: 12200, members: 265, sessions: 490 },
  { name: "Sep", revenue: 12800, members: 280, sessions: 520 },
  { name: "Oct", revenue: 13500, members: 295, sessions: 550 },
  { name: "Nov", revenue: 14200, members: 310, sessions: 580 },
  { name: "Dec", revenue: 15000, members: 325, sessions: 610 },
]

const dailyData: DataItem[] = [
  { name: "Mon", revenue: 450, members: 5, sessions: 42 },
  { name: "Tue", revenue: 520, members: 7, sessions: 48 },
  { name: "Wed", revenue: 580, members: 8, sessions: 52 },
  { name: "Thu", revenue: 620, members: 6, sessions: 56 },
  { name: "Fri", revenue: 700, members: 9, sessions: 62 },
  { name: "Sat", revenue: 850, members: 12, sessions: 78 },
  { name: "Sun", revenue: 380, members: 3, sessions: 34 },
]

const yearlyData: DataItem[] = [
  { name: "2019", revenue: 85000, members: 150, sessions: 3200 },
  { name: "2020", revenue: 92000, members: 180, sessions: 3500 },
  { name: "2021", revenue: 110000, members: 220, sessions: 4100 },
  { name: "2022", revenue: 135000, members: 260, sessions: 4800 },
  { name: "2023", revenue: 165000, members: 310, sessions: 5800 },
]

type DataType = "revenue" | "members" | "sessions"
type TimeFrame = "daily" | "monthly" | "yearly"

export default function GrowthPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("monthly")
  const [dataType, setDataType] = useState<DataType>("revenue")

  const getChartData = (): DataItem[] => {
    switch (timeframe) {
      case "daily":
        return dailyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  const getChartTitle = (): string => {
    const period = timeframe === "daily" ? "Daily" : timeframe === "yearly" ? "Yearly" : "Monthly"
    const type = dataType === "revenue" ? "Revenue" : dataType === "members" ? "Membership" : "Training Sessions"
    return `${period} ${type} Growth`
  }

  const getYAxisLabel = (): string => {
    return dataType === "revenue" ? "Revenue ($)" : dataType === "members" ? "Members" : "Sessions"
  }

  const getChartColor = (): string => {
    return dataType === "revenue" ? "#3b82f6" : dataType === "members" ? "#10b981" : "#8b5cf6"
  }

  // Simple table-based visualization as fallback
  const renderTableChart = (data: DataItem[]): React.ReactElement => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                % Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: DataItem, index: number) => {
              const prevValue = index > 0 ? data[index - 1][dataType] : item[dataType]
              const percentChange = (((item[dataType] - prevValue) / prevValue) * 100).toFixed(1)
              const isPositive = item[dataType] >= prevValue

              return (
                <tr key={item.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dataType === "revenue" ? `$${item[dataType].toLocaleString()}` : item[dataType]}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {index === 0 ? "-" : `${isPositive ? "+" : ""}${percentChange}%`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Simple bar chart visualization using divs
  const renderSimpleBarChart = (data: DataItem[]): React.ReactElement => {
    const maxValue = Math.max(...data.map((item: DataItem) => item[dataType]))

    return (
      <div className="space-y-4 pt-4">
        {data.map((item: DataItem) => {
          const percentage = (item[dataType] / maxValue) * 100
          return (
            <div key={item.name} className="flex items-center">
              <div className="w-20 text-sm text-gray-600">{item.name}</div>
              <div className="flex-1">
                <div
                  className="h-8 rounded-r-md flex items-center pl-2 text-white font-medium"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getChartColor(),
                    minWidth: "40px",
                  }}
                >
                  {dataType === "revenue" ? `$${item[dataType].toLocaleString()}` : item[dataType]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Growth Analytics</h1>
          <p className="mt-1 text-gray-600">Track and analyze gym performance metrics over time</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Revenue Growth</h2>
                <p className="text-2xl font-bold text-gray-900">+12.5%</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Increased from last month</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Membership Growth</h2>
                <p className="text-2xl font-bold text-gray-900">+8.2%</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>15 new members this month</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Activity className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Session Growth</h2>
                <p className="text-2xl font-bold text-gray-900">+10.7%</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>30 more sessions than last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeframe === "daily" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setTimeframe("daily")}
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Daily
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeframe === "monthly" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setTimeframe("monthly")}
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Monthly
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeframe === "yearly" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setTimeframe("yearly")}
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Yearly
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  dataType === "revenue" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setDataType("revenue")}
              >
                <DollarSign className="h-4 w-4 inline mr-1" />
                Revenue
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  dataType === "members" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setDataType("members")}
              >
                <Users className="h-4 w-4 inline mr-1" />
                Members
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  dataType === "sessions" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setDataType("sessions")}
              >
                <Activity className="h-4 w-4 inline mr-1" />
                Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{getChartTitle()}</h2>
          <div className="h-96">{renderSimpleBarChart(getChartData())}</div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{getChartTitle()} - Data Table</h2>
          {renderTableChart(getChartData())}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Note</h2>
          <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md">
            <p className="text-yellow-800">For full chart functionality, please install the recharts library:</p>
            <pre className="mt-2 bg-gray-800 text-white p-3 rounded overflow-x-auto">
              npm install recharts
              {"\n"}# or{"\n"}
              yarn add recharts
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

