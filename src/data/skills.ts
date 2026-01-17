import { Skill, CareerGoal, Recommendation, QuizQuestion } from '@/types';

export const SKILL_CATEGORIES = {
  'health-data-analytics': {
    name: 'Health Data & Analytics',
    description: 'Statistical analysis, data visualization, and healthcare metrics',
    icon: '📊',
  },
  'health-informatics': {
    name: 'Health Informatics Systems',
    description: 'EHR systems, clinical workflows, and healthcare IT',
    icon: '🏥',
  },
  'data-standards': {
    name: 'Health Data Standards',
    description: 'HL7 FHIR, ICD-10, SNOMED CT, and interoperability',
    icon: '📋',
  },
  'privacy-security': {
    name: 'Privacy, Security & Ethics',
    description: 'HIPAA compliance, data governance, and ethical AI',
    icon: '🔒',
  },
  'ai-digital-health': {
    name: 'AI & Digital Health',
    description: 'Machine learning, NLP, and digital health solutions',
    icon: '🤖',
  },
};

export const SKILLS: Skill[] = [
  // Health Data & Analytics
  { id: 'sql', name: 'SQL & Database Management', category: 'health-data-analytics', description: 'Query and manage healthcare databases' },
  { id: 'python', name: 'Python for Healthcare', category: 'health-data-analytics', description: 'Python programming for health data analysis' },
  { id: 'r-stats', name: 'R Statistical Computing', category: 'health-data-analytics', description: 'Statistical analysis with R' },
  { id: 'tableau', name: 'Tableau & Power BI', category: 'health-data-analytics', description: 'Healthcare data visualization' },
  { id: 'biostatistics', name: 'Biostatistics', category: 'health-data-analytics', description: 'Statistical methods for healthcare research' },
  
  // Health Informatics Systems
  { id: 'ehr', name: 'EHR Systems (Epic, Cerner)', category: 'health-informatics', description: 'Electronic health record management' },
  { id: 'clinical-workflows', name: 'Clinical Workflow Optimization', category: 'health-informatics', description: 'Improving clinical processes' },
  { id: 'health-it', name: 'Health IT Infrastructure', category: 'health-informatics', description: 'Healthcare technology systems' },
  { id: 'cdss', name: 'Clinical Decision Support', category: 'health-informatics', description: 'Decision support systems' },
  
  // Data Standards
  { id: 'hl7-fhir', name: 'HL7 FHIR', category: 'data-standards', description: 'Healthcare interoperability standards' },
  { id: 'icd-10', name: 'ICD-10 Coding', category: 'data-standards', description: 'Medical classification systems' },
  { id: 'snomed-ct', name: 'SNOMED CT', category: 'data-standards', description: 'Clinical terminology' },
  { id: 'dicom', name: 'DICOM Imaging', category: 'data-standards', description: 'Medical imaging standards' },
  
  // Privacy & Security
  { id: 'hipaa', name: 'HIPAA Compliance', category: 'privacy-security', description: 'Healthcare privacy regulations' },
  { id: 'data-governance', name: 'Data Governance', category: 'privacy-security', description: 'Healthcare data policies' },
  { id: 'cybersecurity', name: 'Healthcare Cybersecurity', category: 'privacy-security', description: 'Protecting health information' },
  { id: 'ethics', name: 'AI Ethics in Healthcare', category: 'privacy-security', description: 'Ethical AI implementation' },
  
  // AI & Digital Health
  { id: 'ml-healthcare', name: 'Machine Learning for Healthcare', category: 'ai-digital-health', description: 'ML models for clinical applications' },
  { id: 'nlp-clinical', name: 'Clinical NLP', category: 'ai-digital-health', description: 'Natural language processing for clinical text' },
  { id: 'computer-vision', name: 'Medical Image Analysis', category: 'ai-digital-health', description: 'AI for medical imaging' },
  { id: 'predictive-analytics', name: 'Predictive Health Analytics', category: 'ai-digital-health', description: 'Forecasting health outcomes' },
  { id: 'telemedicine', name: 'Telemedicine Technology', category: 'ai-digital-health', description: 'Remote healthcare solutions' },
];

export const CAREER_GOALS: CareerGoal[] = [
  {
    id: 'health-data-analyst',
    title: 'Health Data Analyst',
    description: 'Analyze healthcare data to improve patient outcomes and operational efficiency',
    icon: '📊',
  },
  {
    id: 'clinical-informatics',
    title: 'Clinical Informatics Specialist',
    description: 'Bridge the gap between clinical practice and health IT systems',
    icon: '🏥',
  },
  {
    id: 'medical-data-scientist',
    title: 'Medical Data Scientist',
    description: 'Apply advanced analytics and ML to solve complex healthcare problems',
    icon: '🔬',
  },
  {
    id: 'health-ai-engineer',
    title: 'Health AI/ML Engineer',
    description: 'Develop AI solutions for diagnostics, treatment, and patient care',
    icon: '🤖',
  },
  {
    id: 'health-it-consultant',
    title: 'Health IT Consultant',
    description: 'Guide healthcare organizations in technology adoption and optimization',
    icon: '💼',
  },
  {
    id: 'bioinformatics-specialist',
    title: 'Bioinformatics Specialist',
    description: 'Analyze biological and genomic data for research and clinical applications',
    icon: '🧬',
  },
];

export const INTERESTS = [
  'Patient Outcome Analysis',
  'Clinical Research',
  'Healthcare AI Ethics',
  'Population Health',
  'Precision Medicine',
  'Healthcare Policy',
  'Medical Device Innovation',
  'Digital Therapeutics',
  'Mental Health Tech',
  'Genomics & Personalized Medicine',
  'Healthcare Startups',
  'Public Health Informatics',
  'Remote Patient Monitoring',
  'Healthcare Automation',
  'Drug Discovery',
  'Clinical Trials Optimization',
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'course',
    title: 'Healthcare Data Analytics Fundamentals',
    description: 'Master SQL, Python, and statistical methods for healthcare data analysis',
    difficulty: 'beginner',
    skills: ['sql', 'python', 'biostatistics'],
    duration: '8 weeks',
    provider: 'Health Data Academy',
    explanation: 'This course builds foundational skills essential for your Health Data Analyst career goal',
  },
  {
    id: 'rec-2',
    type: 'course',
    title: 'HL7 FHIR & Interoperability',
    description: 'Deep dive into healthcare data exchange standards and API development',
    difficulty: 'intermediate',
    skills: ['hl7-fhir', 'health-it'],
    duration: '6 weeks',
    provider: 'Interoperability Institute',
    explanation: 'Critical for working with modern healthcare systems and EHR integrations',
  },
  {
    id: 'rec-3',
    type: 'project',
    title: 'Build a Patient Risk Prediction Model',
    description: 'Create an ML model to predict patient readmission risk using real-world data patterns',
    difficulty: 'advanced',
    skills: ['ml-healthcare', 'predictive-analytics', 'python'],
    duration: '4 weeks',
    explanation: 'Hands-on project that demonstrates your ability to apply ML to clinical problems',
  },
  {
    id: 'rec-4',
    type: 'course',
    title: 'HIPAA & Healthcare Compliance',
    description: 'Comprehensive guide to healthcare privacy regulations and compliance',
    difficulty: 'beginner',
    skills: ['hipaa', 'data-governance'],
    duration: '3 weeks',
    provider: 'Compliance Academy',
    explanation: 'Essential knowledge required for any healthcare data professional',
  },
  {
    id: 'rec-5',
    type: 'project',
    title: 'Clinical Dashboard Development',
    description: 'Design and build interactive dashboards for clinical performance metrics',
    difficulty: 'intermediate',
    skills: ['tableau', 'sql', 'clinical-workflows'],
    duration: '3 weeks',
    explanation: 'Practical project to showcase your data visualization skills in a clinical context',
  },
  {
    id: 'rec-6',
    type: 'course',
    title: 'Clinical NLP & Text Mining',
    description: 'Extract insights from clinical notes and medical literature using NLP',
    difficulty: 'advanced',
    skills: ['nlp-clinical', 'python', 'ml-healthcare'],
    duration: '10 weeks',
    provider: 'AI Health Institute',
    explanation: 'Advanced skill highly valued in Health AI/ML Engineering roles',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does HIPAA stand for?',
    options: [
      'Health Insurance Portability and Accountability Act',
      'Healthcare Information Privacy and Access Act',
      'Hospital Insurance Protection and Administration Act',
      'Health Information Processing and Analytics Act',
    ],
    correctAnswer: 0,
    skillCategory: 'privacy-security',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    question: 'Which standard is used for healthcare data interoperability?',
    options: ['JSON-RPC', 'HL7 FHIR', 'SOAP', 'GraphQL'],
    correctAnswer: 1,
    skillCategory: 'data-standards',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    question: 'What is the primary purpose of ICD-10 codes?',
    options: [
      'Patient identification',
      'Drug classification',
      'Disease and diagnosis classification',
      'Hospital accreditation',
    ],
    correctAnswer: 2,
    skillCategory: 'data-standards',
    difficulty: 'easy',
  },
  {
    id: 'q4',
    question: 'Which Python library is commonly used for biostatistical analysis?',
    options: ['Django', 'Flask', 'SciPy/StatsModels', 'Pygame'],
    correctAnswer: 2,
    skillCategory: 'health-data-analytics',
    difficulty: 'medium',
  },
  {
    id: 'q5',
    question: 'What is a Clinical Decision Support System (CDSS)?',
    options: [
      'A billing software',
      'A tool that provides clinicians with patient-specific assessments',
      'A patient portal',
      'A scheduling system',
    ],
    correctAnswer: 1,
    skillCategory: 'health-informatics',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    question: 'Which metric is commonly used to evaluate a medical diagnostic ML model?',
    options: ['R-squared', 'Mean Absolute Error', 'AUC-ROC', 'Adjusted R-squared'],
    correctAnswer: 2,
    skillCategory: 'ai-digital-health',
    difficulty: 'medium',
  },
  {
    id: 'q7',
    question: 'What is the minimum necessary rule in HIPAA?',
    options: [
      'Minimum data storage requirements',
      'Using only the minimum PHI needed for a task',
      'Minimum number of security officers',
      'Minimum password length',
    ],
    correctAnswer: 1,
    skillCategory: 'privacy-security',
    difficulty: 'hard',
  },
  {
    id: 'q8',
    question: 'In clinical NLP, what is Named Entity Recognition (NER) used for?',
    options: [
      'Translating medical documents',
      'Identifying and classifying medical terms in text',
      'Encrypting patient data',
      'Generating clinical notes',
    ],
    correctAnswer: 1,
    skillCategory: 'ai-digital-health',
    difficulty: 'hard',
  },
  {
    id: 'q9',
    question: 'What does SNOMED CT provide?',
    options: [
      'Insurance billing codes',
      'A comprehensive clinical terminology',
      'Network security protocols',
      'Patient consent forms',
    ],
    correctAnswer: 1,
    skillCategory: 'data-standards',
    difficulty: 'medium',
  },
  {
    id: 'q10',
    question: 'Which EHR system has the largest market share in the US?',
    options: ['Cerner', 'Epic', 'Meditech', 'Allscripts'],
    correctAnswer: 1,
    skillCategory: 'health-informatics',
    difficulty: 'easy',
  },
];
