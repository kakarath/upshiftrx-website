export interface DemoDrug {
  name: string;
  description: string;
  category: string;
  applications: Array<{
    disease: string;
    confidence: number;
    description: string;
  }>;
}

export interface DemoDisease {
  name: string;
  description: string;
  category: string;
  treatments: Array<{
    drug: string;
    confidence: number;
    description: string;
  }>;
}

// Disease data for bidirectional search
export const DEMO_DISEASES: DemoDisease[] = [
  {
    name: "Rheumatoid Arthritis",
    description: "Chronic inflammatory disorder affecting joints",
    category: "Autoimmune",
    treatments: [
      { drug: "Hydroxychloroquine", confidence: 84, description: "Disease-modifying antirheumatic drug" },
      { drug: "Rituximab", confidence: 85, description: "Depletes pathogenic B-cells" },
      { drug: "Baricitinib", confidence: 88, description: "JAK inhibitor for moderate to severe RA" }
    ]
  },
  {
    name: "Type 2 Diabetes",
    description: "Metabolic disorder characterized by high blood sugar",
    category: "Metabolic",
    treatments: [
      { drug: "Metformin", confidence: 95, description: "First-line diabetes treatment" },
      { drug: "Ertugliflozin", confidence: 91, description: "Glucose-lowering medication" }
    ]
  },
  {
    name: "Multiple Myeloma",
    description: "Cancer of plasma cells in bone marrow",
    category: "Oncology",
    treatments: [
      { drug: "Thalidomide", confidence: 86, description: "Anti-cancer and anti-angiogenic effects" },
      { drug: "Dexamethasone", confidence: 87, description: "Part of combination chemotherapy" }
    ]
  },
  {
    name: "Hypertension",
    description: "High blood pressure condition",
    category: "Cardiovascular",
    treatments: [
      { drug: "Propranolol", confidence: 93, description: "Reduces blood pressure and heart rate" },
      { drug: "Minoxidil", confidence: 89, description: "Severe hypertension treatment" }
    ]
  }
];

export const DEMO_DRUGS: DemoDrug[] = [
  {
    name: "Aspirin",
    description: "Anti-inflammatory and antiplatelet agent",
    category: "NSAID",
    applications: [
      { disease: "Cardiovascular Disease", confidence: 92, description: "Prevents heart attacks and strokes" },
      { disease: "Colorectal Cancer", confidence: 78, description: "Reduces cancer risk in high-risk patients" },
      { disease: "Alzheimer's Disease", confidence: 65, description: "May reduce neuroinflammation" }
    ]
  },
  {
    name: "Metformin",
    description: "Antidiabetic medication",
    category: "Biguanide",
    applications: [
      { disease: "Type 2 Diabetes", confidence: 95, description: "First-line diabetes treatment" },
      { disease: "Polycystic Ovary Syndrome", confidence: 84, description: "Improves insulin sensitivity" },
      { disease: "Cancer Prevention", confidence: 71, description: "May reduce cancer incidence" }
    ]
  },
  {
    name: "Ruxolitinib",
    description: "JAK1/JAK2 inhibitor",
    category: "Kinase Inhibitor",
    applications: [
      { disease: "Myelofibrosis", confidence: 89, description: "FDA-approved for blood cancers" },
      { disease: "Alopecia Areata", confidence: 82, description: "Promotes hair regrowth" },
      { disease: "Vitiligo", confidence: 76, description: "Restores skin pigmentation" },
      { disease: "Epstein-Barr Virus", confidence: 74, description: "Reduces viral reactivation in immunocompromised patients" }
    ]
  },
  {
    name: "Ertugliflozin",
    description: "SGLT2 inhibitor",
    category: "Antidiabetic",
    applications: [
      { disease: "Type 2 Diabetes", confidence: 91, description: "Glucose-lowering medication" },
      { disease: "Heart Failure", confidence: 79, description: "Reduces cardiovascular events" },
      { disease: "Chronic Kidney Disease", confidence: 73, description: "Slows kidney function decline" },
      { disease: "Arteriosclerosis Cardiovascular Disease", confidence: 77, description: "Reduces atherosclerotic cardiovascular events" }
    ]
  },
  {
    name: "Sildenafil",
    description: "PDE5 inhibitor",
    category: "Vasodilator",
    applications: [
      { disease: "Pulmonary Hypertension", confidence: 88, description: "Reduces pulmonary arterial pressure" },
      { disease: "Erectile Dysfunction", confidence: 94, description: "Original FDA-approved indication" },
      { disease: "Raynaud's Phenomenon", confidence: 67, description: "Improves blood flow to extremities" }
    ]
  },
  {
    name: "Thalidomide",
    description: "Immunomodulatory drug",
    category: "IMiD",
    applications: [
      { disease: "Multiple Myeloma", confidence: 86, description: "Anti-cancer and anti-angiogenic effects" },
      { disease: "Erythema Nodosum Leprosum", confidence: 91, description: "Anti-inflammatory in leprosy" },
      { disease: "Crohn's Disease", confidence: 72, description: "Reduces intestinal inflammation" }
    ]
  },
  {
    name: "Propranolol",
    description: "Beta-blocker",
    category: "Cardiovascular",
    applications: [
      { disease: "Hypertension", confidence: 93, description: "Reduces blood pressure and heart rate" },
      { disease: "Infantile Hemangiomas", confidence: 85, description: "Shrinks vascular tumors in infants" },
      { disease: "Performance Anxiety", confidence: 74, description: "Reduces physical symptoms of anxiety" }
    ]
  },
  {
    name: "Dexamethasone",
    description: "Corticosteroid",
    category: "Anti-inflammatory",
    applications: [
      { disease: "COVID-19", confidence: 81, description: "Reduces mortality in severe cases" },
      { disease: "Multiple Myeloma", confidence: 87, description: "Part of combination chemotherapy" },
      { disease: "Cerebral Edema", confidence: 89, description: "Reduces brain swelling" }
    ]
  },
  {
    name: "Hydroxychloroquine",
    description: "Antimalarial and immunosuppressant",
    category: "DMARD",
    applications: [
      { disease: "Rheumatoid Arthritis", confidence: 84, description: "Disease-modifying antirheumatic drug" },
      { disease: "Systemic Lupus Erythematosus", confidence: 88, description: "Reduces autoimmune activity" },
      { disease: "Malaria", confidence: 92, description: "Prevention and treatment of malaria" }
    ]
  },
  {
    name: "Minoxidil",
    description: "Vasodilator",
    category: "Antihypertensive",
    applications: [
      { disease: "Androgenetic Alopecia", confidence: 83, description: "Promotes hair growth" },
      { disease: "Hypertension", confidence: 89, description: "Severe hypertension treatment" },
      { disease: "Alopecia Areata", confidence: 69, description: "Off-label use for patchy hair loss" }
    ]
  },
  {
    name: "Colchicine",
    description: "Anti-inflammatory alkaloid",
    category: "Anti-gout",
    applications: [
      { disease: "Gout", confidence: 94, description: "Prevents and treats gout attacks" },
      { disease: "Pericarditis", confidence: 82, description: "Reduces pericardial inflammation" },
      { disease: "Familial Mediterranean Fever", confidence: 91, description: "Prevents inflammatory episodes" }
    ]
  },
  {
    name: "Rituximab",
    description: "Monoclonal antibody",
    category: "Biologic",
    applications: [
      { disease: "Non-Hodgkin Lymphoma", confidence: 90, description: "Targets CD20+ B-cell malignancies" },
      { disease: "Rheumatoid Arthritis", confidence: 85, description: "Depletes pathogenic B-cells" },
      { disease: "Multiple Sclerosis", confidence: 78, description: "Reduces CNS inflammation" }
    ]
  },
  {
    name: "Baricitinib",
    description: "JAK1/JAK2 inhibitor",
    category: "Kinase Inhibitor",
    applications: [
      { disease: "Rheumatoid Arthritis", confidence: 88, description: "JAK inhibitor for moderate to severe RA" },
      { disease: "COVID-19 Severe Pneumonia", confidence: 75, description: "Reduces inflammation in hospitalized patients" },
      { disease: "Atopic Dermatitis", confidence: 83, description: "Treats moderate to severe eczema" }
    ]
  },
  {
    name: "Nilotinib",
    description: "BCR-ABL tyrosine kinase inhibitor",
    category: "Kinase Inhibitor",
    applications: [
      { disease: "Chronic Myeloid Leukemia", confidence: 92, description: "Second-generation TKI for CML" },
      { disease: "Parkinson's Disease", confidence: 68, description: "May reduce alpha-synuclein aggregation" },
      { disease: "Acute Lymphoblastic Leukemia", confidence: 81, description: "Philadelphia chromosome-positive ALL" }
    ]
  }
];

export const getRandomDrugs = (count: number = 4): DemoDrug[] => {
  const shuffled = [...DEMO_DRUGS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDrugByName = (name: string): DemoDrug | undefined => {
  return DEMO_DRUGS.find(drug => drug.name.toLowerCase() === name.toLowerCase());
};

export const getDrugsForDisease = (diseaseName: string) => {
  const disease = DEMO_DISEASES.find(d => d.name.toLowerCase() === diseaseName.toLowerCase());
  if (disease) {
    return {
      applications: disease.treatments.map(treatment => ({
        disease: treatment.drug,
        confidence: treatment.confidence
      })),
      papersAnalyzed: Math.floor(Math.random() * 8000) + 3000,
      connections: Math.floor(Math.random() * 400) + 150,
      analysisTime: `${(Math.random() * 1.5 + 0.4).toFixed(1)}s`
    };
  }
  return null;
};