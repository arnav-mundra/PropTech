export const mockProjects = [
  {
    id: "proj_1",
    name: "Aura Waterfront Mall",
    city: "Dubai",
    developer: "ECHT Development",
    projectType: "Waterfront",
    totalArea: 450000,
    completionStatus: "Completed",
    createdAt: new Date().toISOString()
  },
  {
    id: "proj_2",
    name: "The High Street Pavilion",
    city: "Riyadh",
    developer: "Oasis Real Estate",
    projectType: "High Street",
    totalArea: 120000,
    completionStatus: "Under Construction",
    createdAt: new Date().toISOString()
  }
];

export const mockUnits = [
  {
    id: "unit_1", unitId: "AW-101", projectId: "proj_1", floorId: "floor_1",
    area: 2500, frontage: 15, category: "Retail", status: "Available", createdAt: new Date().toISOString()
  },
  {
    id: "unit_2", unitId: "AW-102", projectId: "proj_1", floorId: "floor_1",
    area: 4000, frontage: 25, category: "Anchor", status: "Leased", createdAt: new Date().toISOString()
  },
  {
    id: "unit_3", unitId: "HP-G01", projectId: "proj_2", floorId: "floor_2",
    area: 1200, frontage: 8, category: "Food & Beverage", status: "Under Discussion", createdAt: new Date().toISOString()
  }
];

export const mockBrands = [
  {
    id: "br_1", name: "Lumina Cafe", category: "Cafe", typicalSize: "1000-1500 sqft",
    preferredCityTier: "Tier 1", existingLocations: 12, expansionStatus: "Active", contactPerson: "Sarah Jenkins"
  },
  {
    id: "br_2", name: "Velocity Sports", category: "Sports", typicalSize: "3000-5000 sqft",
    preferredCityTier: "Tier 1, Tier 2", existingLocations: 4, expansionStatus: "Planning", contactPerson: "Michael Ford"
  }
];

export const mockRequirements = [
  {
    id: "req_1", brandId: "br_1", city: "Dubai", areaRequired: "1200 sqft",
    preferredProjectType: "High Street", budgetRange: "$100k - $150k", status: "Actively scouting",
    brand: mockBrands[0]
  }
];

export const mockLeads = [
  {
    id: "ld_1", brandId: "br_1", projectId: "proj_2", unitId: "unit_3",
    managerId: "usr_1", stage: "Site Visit", nextFollowUp: new Date(Date.now() + 86400000).toISOString(),
    meetingNotes: "Client loved the location. Requesting LOI draft.",
    brand: mockBrands[0], project: mockProjects[1], unit: mockUnits[2]
  }
];

export const mockDeals = [
  {
    id: "dl_1", brandId: "br_2", projectId: "proj_1", unitId: "unit_2", rent: 250000,
    leaseStartDate: new Date().toISOString(), leaseTerm: 60, dealStatus: "Closed",
    brand: mockBrands[1], project: mockProjects[0], unit: mockUnits[1]
  }
];
