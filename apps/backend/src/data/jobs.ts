import { Job } from "../types/job.js";

// In-memory data store
// Using array for simplicity, could be replaced with JSON file or SQLite
const jobs: Job[] = [
  {
    id: "1",
    name: "PT Teknologi Indonesia",
    jobPosition: "Frontend Developer",
    category: "Technology",
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "2",
    name: "PT Digital Nusantara",
    jobPosition: "Backend Developer",
    category: "Technology",
    createdAt: new Date("2025-12-14"),
  },
  {
    id: "3",
    name: "PT Bank Central",
    jobPosition: "Data Analyst",
    category: "Finance",
    createdAt: new Date("2025-12-13"),
  },
  {
    id: "4",
    name: "PT Kreatif Media",
    jobPosition: "UI/UX Designer",
    category: "Design",
    createdAt: new Date("2025-12-12"),
  },
  {
    id: "5",
    name: "PT Startup Maju",
    jobPosition: "Product Manager",
    category: "Management",
    createdAt: new Date("2025-12-11"),
  },
  {
    id: "6",
    name: "PT Solusi Digital",
    jobPosition: "DevOps Engineer",
    category: "Technology",
    createdAt: new Date("2025-12-10"),
  },
  {
    id: "7",
    name: "PT Konsultan Prima",
    jobPosition: "Business Analyst",
    category: "Finance",
    createdAt: new Date("2025-12-09"),
  },
  {
    id: "8",
    name: "PT Inovasi Tech",
    jobPosition: "Mobile Developer",
    category: "Technology",
    createdAt: new Date("2025-12-08"),
  },
  {
    id: "9",
    name: "PT Media Kreatif",
    jobPosition: "Graphic Designer",
    category: "Design",
    createdAt: new Date("2025-12-07"),
  },
  {
    id: "10",
    name: "PT Fintech Indonesia",
    jobPosition: "Full Stack Developer",
    category: "Technology",
    createdAt: new Date("2025-12-06"),
  },
  {
    id: "11",
    name: "PT Logistik Cepat",
    jobPosition: "Operations Manager",
    category: "Management",
    createdAt: new Date("2025-12-05"),
  },
  {
    id: "12",
    name: "PT Retail Modern",
    jobPosition: "Marketing Specialist",
    category: "Marketing",
    createdAt: new Date("2025-12-04"),
  },
];

let currentId = jobs.length;

export const jobsData = {
  getAll: (): Job[] => [...jobs],
  
  getById: (id: string): Job | undefined => {
    return jobs.find((job) => job.id === id);
  },
  
  create: (data: Omit<Job, "id" | "createdAt">): Job => {
    currentId++;
    const newJob: Job = {
      ...data,
      id: String(currentId),
      createdAt: new Date(),
    };
    jobs.unshift(newJob); // Add to beginning for newest first
    return newJob;
  },
  
  getCategories: (): string[] => {
    return [...new Set(jobs.map((job) => job.category))];
  },
};
