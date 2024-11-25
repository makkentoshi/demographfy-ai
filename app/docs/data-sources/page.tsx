import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Sources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[10rem] pb-[2rem]">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About the Project</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our project combines cutting-edge AI technologies to analyze and predict demographic trends
              in Kazakhstan. We utilize both Google&apos;s Gemini AI and World Bank&apos;s analytical tools to
              provide comprehensive insights into population dynamics, migration patterns, and demographic
              changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We employ a multi-faceted approach that includes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Advanced machine learning algorithms for pattern recognition</li>
              <li>Historical data analysis from reliable sources</li>
              <li>Integration of multiple AI models for accurate predictions</li>
              <li>Regular validation against real-world demographic data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals and Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our primary objectives include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Providing accurate demographic predictions for policy makers</li>
              <li>Understanding population dynamics and trends</li>
              <li>Supporting evidence-based decision making</li>
              <li>Contributing to demographic research in Kazakhstan</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}