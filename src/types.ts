export interface ToolItem {
  id: string;
  name: string;
  category: 'Document & Career' | 'Document & AI' | 'Media & Graphics' | 'Developer & Data' | 'Productivity & Utility' | string;
  description: string;
  detailedDescription?: string;
  route: string;
  iconName: string;
  badge: 'Free' | 'Pro $7/mo' | 'AI Powered' | string;
  gradient: string;
  highlights: string[];
  image: string;
  howItWorks?: string[];
  screenshotAlt?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface SubscriptionState {
  isPro: boolean;
  proActivatedAt?: string;
  isUpgradeModalOpen: boolean;
  upgradeFeatureName: string;
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa?: string;
  }>;
  skills: string[];
  certifications: string[];
  targetJobDescription: string;
}
