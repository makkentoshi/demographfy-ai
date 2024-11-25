'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, BarChart2, PieChart, TrendingUp } from 'lucide-react';

export default function WorldBankAI() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[10rem] pb-[2rem]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          World Bank AI Demographics Analysis
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive demographic analysis using World Bank&apos;s AI tools
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <Globe className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Economic Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [Economic Impact Chart Placeholder]
            </div>
            <Button 
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Generate Analysis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart2 className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Population Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [Population Statistics Chart Placeholder]
            </div>
            <Button 
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              View Statistics
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <PieChart className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Demographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [Demographic Distribution Chart Placeholder]
            </div>
            <Button 
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Analyze Distribution
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Development Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [Development Indicators Chart Placeholder]
            </div>
            <Button 
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              View Indicators
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}