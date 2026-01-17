import { useState } from "react";
import { Search, Download, ExternalLink, MapPin, Briefcase, Building2, Loader2, CircleCheck, Users, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { searchLeads, Lead as APILead } from "@/lib/api";

interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  profileUrl: string;
  connectionDegree: string;
}

export function LeadsAgent() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [profilesScanned, setProfilesScanned] = useState(0);
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    company: "",
    industry: "",
    keywords: "",
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sessionId, setSessionId] = useState<string>(`leads-${Date.now()}`);
  const [apiError, setApiError] = useState<string | null>(null);

  const mockLeads: Lead[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "VP of Marketing",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      profileUrl: "https://linkedin.com/in/sarahjohnson",
      connectionDegree: "2nd",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Chief Technology Officer",
      company: "InnovateAI",
      location: "New York, NY",
      profileUrl: "https://linkedin.com/in/michaelchen",
      connectionDegree: "3rd",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Head of Product",
      company: "StartupHub",
      location: "Austin, TX",
      profileUrl: "https://linkedin.com/in/emilyrodriguez",
      connectionDegree: "2nd",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Director of Sales",
      company: "SalesForce Pro",
      location: "Seattle, WA",
      profileUrl: "https://linkedin.com/in/davidkim",
      connectionDegree: "1st",
    },
    {
      id: "5",
      name: "Jennifer Liu",
      role: "VP of Engineering",
      company: "CloudTech Solutions",
      location: "Boston, MA",
      profileUrl: "https://linkedin.com/in/jenniferliu",
      connectionDegree: "2nd",
    },
    {
      id: "6",
      name: "Robert Martinez",
      role: "Marketing Director",
      company: "GrowthLabs",
      location: "Los Angeles, CA",
      profileUrl: "https://linkedin.com/in/robertmartinez",
      connectionDegree: "3rd",
    },
    {
      id: "7",
      name: "Amanda Foster",
      role: "Chief Operating Officer",
      company: "Enterprise Solutions",
      location: "Chicago, IL",
      profileUrl: "https://linkedin.com/in/amandafoster",
      connectionDegree: "2nd",
    },
    {
      id: "8",
      name: "James Wilson",
      role: "VP of Business Development",
      company: "ScaleUp Partners",
      location: "Miami, FL",
      profileUrl: "https://linkedin.com/in/jameswilson",
      connectionDegree: "1st",
    },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchComplete(false);
    setProgress(0);
    setProfilesScanned(0);
    setLeads([]);
    setApiError(null);

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
      setProfilesScanned((prev) => prev + Math.floor(Math.random() * 30) + 10);
    }, 300);

    try {
      // Prepare API filters
      const apiFilters: any = {};
      if (filters.jobTitle) apiFilters.job_title = filters.jobTitle;
      if (filters.location) apiFilters.location = filters.location;
      if (filters.industry) apiFilters.industry = filters.industry;
      if (filters.keywords) apiFilters.keywords = filters.keywords.split(',').map(k => k.trim());

      // Call the real API
      const response = await searchLeads(apiFilters, 10, sessionId);

      clearInterval(progressInterval);
      setProgress(100);

      if (response.status === "completed" && Array.isArray(response.data)) {
        // Map API leads to local Lead interface
        const mappedLeads: Lead[] = response.data.map((apiLead: APILead) => ({
          id: apiLead.id || Math.random().toString(),
          name: apiLead.name || "Unknown",
          role: apiLead.role || "N/A",
          company: apiLead.company || "N/A",
          location: apiLead.location || "N/A",
          profileUrl: apiLead.profileUrl || "#",
          connectionDegree: apiLead.connectionDegree || "N/A",
        }));
        setLeads(mappedLeads);
        setSearchComplete(true);
      } else {
        // Handle non-array response (fallback or error message)
        console.warn("API returned non-array data:", response.data);
        setApiError("The search returned an unexpected format. Using mock data.");
        setLeads(mockLeads);
        setSearchComplete(true);
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error("API Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to connect to the server";
      setApiError(errorMessage);
      
      // Use mock data as fallback
      setLeads(mockLeads);
      setProgress(100);
      setSearchComplete(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExport = (format: "csv" | "json") => {
    // Simulate export
    console.log(`Exporting ${leads.length} leads as ${format.toUpperCase()}`);
    alert(`Exported ${leads.length} leads as ${format.toUpperCase()}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Leads Agent</h1>
        <p className="text-gray-600">Find and connect with potential leads on LinkedIn</p>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900">Connection Warning</p>
            <p className="text-sm text-red-700 mt-1">
              {apiError} Make sure your FastAPI server is running on the correct port.
            </p>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          Search Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="jobTitle" className="text-sm text-gray-700 mb-1.5 block">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              placeholder="e.g., Marketing Manager, CTO"
              value={filters.jobTitle}
              onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-sm text-gray-700 mb-1.5 block">
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., San Francisco, CA"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-sm text-gray-700 mb-1.5 block">
              Company
            </Label>
            <Input
              id="company"
              placeholder="e.g., Google, Microsoft"
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="industry" className="text-sm text-gray-700 mb-1.5 block">
              Industry
            </Label>
            <Select
              value={filters.industry}
              onValueChange={(value) => setFilters({ ...filters, industry: value })}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="keywords" className="text-sm text-gray-700 mb-1.5 block">
              Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="e.g., AI, SaaS, B2B"
              value={filters.keywords}
              onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Leads
              </>
            )}
          </Button>
          {searchComplete && (
            <>
              <Button
                onClick={() => handleExport("csv")}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => handleExport("json")}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      {isSearching && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <div>
              <p className="font-semibold text-gray-900">Searching LinkedIn...</p>
              <p className="text-sm text-gray-600">{profilesScanned} profiles scanned</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Success Message */}
      {searchComplete && !isSearching && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <CircleCheck className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">Search Complete!</p>
            <p className="text-sm text-green-700">
              Found {leads.length} potential leads matching your criteria
            </p>
          </div>
        </div>
      )}

      {/* Results Table */}
      {leads.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">
                Results ({leads.length} leads)
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Connection
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Profile
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{lead.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{lead.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{lead.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className={
                          lead.connectionDegree === "1st"
                            ? "bg-green-100 text-green-700"
                            : lead.connectionDegree === "2nd"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {lead.connectionDegree}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={lead.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        View Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && !searchComplete && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">No leads yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Configure your search filters above and click "Find Leads" to discover potential connections on LinkedIn
          </p>
        </div>
      )}
    </div>
  );
}