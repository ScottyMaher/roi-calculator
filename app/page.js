'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, XCircle } from "lucide-react";


function MoneyBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10 pointer-events-none">
      <div className="animate-pulse text-green-600 text-9xl">
        {'$$$'.split('').map((dollar, index) => (
          <span key={index} className="inline-block animate-ping mx-1">{dollar}</span>
        ))}
      </div>
    </div>
  )
}

export default function ROICalculator() {
  // Current State
  const [pricePerReport, setPricePerReport] = useState(100)
  const [hoursTakenPerReport, setHoursTakenPerReport] = useState(2)
  const [date, setDate] = useState(new Date());
  // Future State
  const [numberOfReportsPerMonth, setNumberOfReportsPerMonth] = useState(10)
  const [newHoursTakenPerReport, setNewHoursTakenPerReport] = useState(1)

  // Follow up/remediation income
  const [followUpPercentage, setFollowUpPercentage] = useState(20)
  const [remediationPercentage, setRemediationPercentage] = useState(10)

  // Calculations
  const currentHourlyRate = pricePerReport / hoursTakenPerReport
  const futureReportIncomePerMonth = numberOfReportsPerMonth * pricePerReport
  const futureHourlyRate = pricePerReport / newHoursTakenPerReport
  const followUpIncome = (futureReportIncomePerMonth * followUpPercentage) / 100
  const remediationIncome = (futureReportIncomePerMonth * remediationPercentage) / 100
  const totalMonthlyIncome = futureReportIncomePerMonth + followUpIncome + remediationIncome

  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      <MoneyBackground />
      <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        ROI Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Current State Card */}
        <Card className="transform transition duration-300 hover:scale-105 shadow-lg">
          <CardHeader>
            <CardTitle>Current State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <XCircle className="text-accent w-5 h-5" />
              <span className="text-sm">Low hourly rate</span>
            </div>
            <div>
              <Label htmlFor="pricePerReport">Price per report</Label>
              <Input
                id="pricePerReport"
                type="number"
                value={pricePerReport}
                onChange={(e) => setPricePerReport(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="hoursTakenPerReport">Hours taken per report</Label>
              <Slider
                id="hoursTakenPerReport"
                min={0.5}
                max={10}
                step={0.5}
                value={[hoursTakenPerReport]}
                onValueChange={([value]) => setHoursTakenPerReport(value)}
              />
              <span className="text-sm text-gray-500">{hoursTakenPerReport} hours</span>
            </div>
            <div>
              <Label>Current hourly rate</Label>
              <p className="text-lg font-semibold">${currentHourlyRate.toFixed(2)}/hour</p>
            </div>
          </CardContent>
        </Card>

        {/* Future State Card */}
        <Card className="transform transition duration-300 hover:scale-105 shadow-lg">
          <CardHeader>
            <CardTitle>Future State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-accent w-5 h-5" />
              <span className="text-sm">Increased efficiency</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-accent w-5 h-5" />
              <span className="text-sm">Higher income per hour</span>
            </div>
            <div>
              <Label htmlFor="numberOfReportsPerMonth">Number of reports a month</Label>
              <Slider
                id="numberOfReportsPerMonth"
                min={1}
                max={50}
                step={1}
                value={[numberOfReportsPerMonth]}
                onValueChange={([value]) => setNumberOfReportsPerMonth(value)}
              />
              <span className="text-sm text-gray-500">{numberOfReportsPerMonth} reports</span>
            </div>
            <div>
              <Label>New hourly rate</Label>
              <p className="text-lg font-semibold">${futureHourlyRate.toFixed(2)}/hour</p>
            </div>
          </CardContent>
        </Card>

        {/* Follow up/remediation income Card */}
        <Card className="transform transition duration-300 hover:scale-105 shadow-lg">
          <CardHeader>
            <CardTitle>Follow up/remediation income</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-accent w-5 h-5" />
              <span className="text-sm">Additional revenue opportunities</span>
            </div>
            <div>
              <Label htmlFor="followUpPercentage">Follow up percentage</Label>
              <Slider
                id="followUpPercentage"
                min={0}
                max={100}
                step={1}
                value={[followUpPercentage]}
                onValueChange={([value]) => setFollowUpPercentage(value)}
              />
              <span className="text-sm text-gray-500">{followUpPercentage}%</span>
            </div>
            <div>
              <Label>Total monthly income</Label>
              <p className="text-xl font-bold text-green-600">${totalMonthlyIncome.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full sm:w-auto">
              Find out how! <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {date && (
        <p className="text-center text-lg">
          Your demo is booked for: {format(date, "MMMM do, yyyy")}
        </p>
      )}
    </div>
  )
}
