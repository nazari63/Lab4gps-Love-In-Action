// src/components/Professor/Professor.js

import React, { useState } from 'react';
import '../styles/Professor.css';

/**
 * Professor.js
 *
 * 1. Manages the selection (random/manual) of an SDG goal.
 * 2. Displays only Professor AI’s philosophical questions for that SDG, one at a time.
 * 3. Each question has multiple sample answers with checkboxes.
 * 4. Calls onSDGChange(selectedId) whenever a new SDG is chosen, so Teaching.js
 *    can react and display its own data/resources.
 *
 * NOTE: No reference to TA AI data provisioning is in this file.
 *       We keep that in Teaching.js.
 */

// Extended data structure with sample answers for each question:
const professorSdgData = [
  {
    id: 1,
    name: 'SDG 1: No Poverty',
    // Each "question" object has the question text and an array of possible "answers".
    questions: [
      {
        text: 'What are the underlying causes of poverty in different regions?',
        answers: [
          'Economic Factors: Limited job opportunities, high unemployment, economic instability.',
          'Educational Barriers: Inadequate access to quality education, financial constraints.',
          'Health Challenges: Poor healthcare, disease prevalence limiting productivity.',
          'Political Instability: Corruption, ineffective governance, conflict.',
          'Social Inequities: Discrimination, inheritance laws, marginalization of groups.',
        ],
      },
      {
        text: 'How does poverty impact communities beyond just economic factors?',
        answers: [
          'Health Outcomes: Malnutrition, limited healthcare, higher disease rates.',
          'Education: Lower enrollment, higher dropout rates, intergenerational poverty.',
          'Social Stability: Increased crime, social unrest, family breakdown.',
          'Community Development: Reduced investment in infrastructure, communal resources.',
          'Psychological Impact: Chronic stress, low self-esteem, substance abuse.',
        ],
      },
      {
        text: 'In what ways can sustainable development initiatives alleviate poverty?',
        answers: [
          'Economic Empowerment: Job creation, fair trade, SME support.',
          'Education and Training: Vocational programs, scholarships, community centers.',
          'Healthcare Access: Improved infrastructure, subsidized services, campaigns.',
          'Infrastructure Development: Roads, sanitation, affordable housing.',
          'Social Protection Programs: Cash transfers, unemployment benefits, safety nets.',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'SDG 2: Zero Hunger',
    questions: [
      {
        text: 'What are the primary factors contributing to food insecurity globally?',
        answers: [
          'Economic Instability: Poverty, fluctuating food prices.',
          'Conflict and Displacement: Disruption of agriculture, forced migration.',
          'Climate Change: Droughts, floods, temperature extremes.',
          'Agricultural Challenges: Lack of modern inputs, low productivity.',
          'Political Issues: Inadequate policies, corruption, restricted food trade.',
        ],
      },
      {
        text: 'How does climate change affect food production and availability?',
        answers: [
          'Extreme Weather Events: Floods, droughts destroying crops and livestock.',
          'Temperature Variations: Heat stress for crops and animals, pest expansion.',
          'Water Scarcity: Less irrigation, competition for water resources.',
          'Soil Health Degradation: Erosion, salinization harming crop yields.',
          'Impact on Biodiversity: Loss of pollinators, shifting ecosystem balance.',
        ],
      },
      {
        text: 'What innovative solutions can be implemented to achieve zero hunger?',
        answers: [
          'Agroecological Farming: Crop diversification, permaculture, organic methods.',
          'Technological Innovations: Precision agriculture, drought-resistant seeds.',
          'Sustainable Distribution Systems: Cold chain, blockchain for supply, local hubs.',
          'Community-Based Initiatives: Urban farming, school feeding, food cooperatives.',
          'Policy and Governance Reforms: National strategies, subsidies, trade facilitation.',
        ],
      },
    ],
  },

    // SDG 3: Good Health and Well-being
    {
        id: 3,
        name: 'SDG 3: Good Health and Well-being',
        questions: [
          {
            text: 'What are the major challenges in achieving universal health coverage?',
            answers: [
              'Financial Barriers: High costs, limited funding, rising medical technology expenses.',
              'Infrastructure Limitations: Inadequate facilities, equipment shortages, poor maintenance.',
              'Human Resource Shortages: Lack of trained professionals, high turnover, brain drain.',
              'Governance and Policy Issues: Inefficient policies, corruption, fragmented systems.',
              'Accessibility and Equity: Geographic, social, and cultural barriers limiting healthcare access.'
            ],
          },
          {
            text: 'How do social determinants of health influence well-being?',
            answers: [
              'Economic Stability: Income, employment status, and financial security.',
              'Education: Health literacy, better decisions, higher earning potential.',
              'Social and Community Context: Support networks, social inclusion, reduced isolation.',
              'Health and Healthcare: Preventive services, quality of care, mental health support.',
              'Neighborhood and Built Environment: Safety, clean air, recreational facilities.'
            ],
          },
          {
            text: 'What role does technology play in advancing global health?',
            answers: [
              'Telemedicine: Remote consultations, reduced travel, ongoing chronic care.',
              'Health Information Systems: Better data collection, EHRs, outbreak tracking.',
              'Mobile Health Applications: Self-monitoring tools, health education, reminders.',
              'Medical Devices and Innovations: Advanced diagnostics, wearable sensors, minimal-invasive tech.',
              'AI and Machine Learning: Predictive analytics, personalized medicine, workflow automation.'
            ],
          },
        ],
      },
    
      // SDG 4: Quality Education
      {
        id: 4,
        name: 'SDG 4: Quality Education',
        questions: [
          {
            text: 'What barriers prevent equitable access to quality education?',
            answers: [
              'Economic Barriers: Tuition costs, lack of scholarships, child labor.',
              'Geographical Barriers: Remote areas, poor transport, extreme climates.',
              'Social and Cultural Barriers: Gender biases, discrimination, traditional norms.',
              'Quality of Education: Inadequate facilities, teacher shortages, outdated materials.',
              'Policy and Governance Issues: Weak enforcement, corruption, lack of inclusive policies.'
            ],
          },
          {
            text: 'How does education contribute to economic and social development?',
            answers: [
              'Economic Growth: Skilled workforce, innovation, foreign investment.',
              'Social Cohesion: Understanding, tolerance, participation in governance.',
              'Health and Well-being: Informed health choices, better outcomes, advocacy.',
              'Reduction of Inequality: Pathways out of poverty, gender equality, inclusion.',
              'Cultural and Intellectual Development: Critical thinking, creativity, preservation of heritage.'
            ],
          },
          {
            text: 'What innovative educational models can bridge the education gap?',
            answers: [
              'Blended Learning: Online/offline mix, personalized pacing, resource expansion.',
              'Community-Based Education: Local relevance, parental involvement, contextual support.',
              'Mobile Learning (mLearning): Anytime/anywhere access via phones, interactive content.',
              'Inclusive Education Models: Universal design for learning, special needs support.',
              'Project-Based Learning: Real-world tasks, collaboration, multi-disciplinary exposure.'
            ],
          },
        ],
      },
    
      // SDG 5: Gender Equality
      {
        id: 5,
        name: 'SDG 5: Gender Equality',
        questions: [
          {
            text: 'What are the primary obstacles to achieving gender equality globally?',
            answers: [
              'Cultural and Societal Norms: Patriarchy, restrictive traditions, stigma.',
              'Economic Barriers: Wage gaps, limited credit/property access, glass ceiling.',
              'Educational Disparities: Lower enrollment, biases, fewer vocational opportunities.',
              'Legal and Policy Gaps: Weak enforcement, inadequate laws, gender-based violence.',
              'Health and Reproductive Rights: Limited services, high maternal mortality, autonomy restrictions.'
            ],
          },
          {
            text: 'How does gender inequality impact economic and social development?',
            answers: [
              'Economic Growth: Reduced workforce participation, wage gaps, lost innovation.',
              'Social Cohesion: Tensions, violence, community fragmentation from marginalization.',
              'Health Outcomes: Higher mortality, limited care for women and children.',
              'Political Representation: Fewer women in governance, less inclusive policymaking.',
              'Innovation and Creativity: Lack of diverse perspectives hinders problem-solving.'
            ],
          },
          {
            text: 'What strategies can effectively promote gender equality in various sectors?',
            answers: [
              'Policy and Legislative Reforms: Equal pay laws, anti-discrimination, quotas.',
              'Educational Initiatives: Scholarships, gender-sensitive curricula, mentorships.',
              'Economic Empowerment: Credit access, women-friendly hiring, leadership training.',
              'Health and Reproductive Rights: Universal healthcare, family planning, awareness.',
              'Community Engagement and Support: Campaigns, men/boys involvement, grassroots advocacy.'
            ],
          },
        ],
      },
    
      // SDG 6: Clean Water and Sanitation
      {
        id: 6,
        name: 'SDG 6: Clean Water and Sanitation',
        questions: [
          {
            text: 'What are the major challenges in providing clean water to underserved communities?',
            answers: [
              'Infrastructure Deficiencies: Inadequate systems, leaks, aging facilities.',
              'Economic Constraints: High costs, limited funding, competing priorities.',
              'Geographical/Environmental: Scarcity, contamination, disasters, climate impact.',
              'Social/Cultural Barriers: Gender roles, cultural norms, lack of local ownership.',
              'Governance and Policy: Weak regulations, corruption, poor inter-agency coordination.'
            ],
          },
          {
            text: 'How does access to clean water and sanitation affect public health?',
            answers: [
              'Reduction in Diseases: Cholera, dysentery, typhoid cut via clean supply.',
              'Improved Nutrition: Safe food prep, less malnutrition, stunting prevention.',
              'Enhanced Mental Health: Reduced stress from water scarcity, dignity in sanitation.',
              'Productivity and Growth: Healthier workforce, fewer sick days, educational attendance.',
              'Gender Empowerment: Less burden on women fetching water, better girls’ school attendance.'
            ],
          },
          {
            text: 'What sustainable practices can improve water management and sanitation services?',
            answers: [
              'Rainwater Harvesting: Storing rainwater, supplementing scarce resources.',
              'Integrated Water Resource Management: Balancing social, economic, environmental needs.',
              'Sustainable Sanitation Solutions: Composting toilets, community-led total sanitation.',
              'Water Conservation and Efficiency: Drip irrigation, efficient appliances.',
              'Renewable-Powered Systems: Solar, wind pumps, micro-hydro for remote areas.'
            ],
          },
        ],
      },
    
      // SDG 7: Affordable and Clean Energy
      {
        id: 7,
        name: 'SDG 7: Affordable and Clean Energy',
        questions: [
          {
            text: 'What are the barriers to achieving universal access to clean energy?',
            answers: [
              'Economic Barriers: High installation costs, limited financing, market volatility.',
              'Technological Challenges: Grid integration, energy storage, remote infrastructure.',
              'Policy/Regulatory Issues: Weak incentives, lengthy approvals, lack of frameworks.',
              'Geographical/Environmental Constraints: Resource variability, land use conflicts.',
              'Social/Cultural Barriers: Low awareness, resistance to change, fossil fuel dependence.'
            ],
          },
          {
            text: 'How does clean energy contribute to environmental sustainability?',
            answers: [
              'GHG Reduction: Minimizes carbon footprints, meets climate targets.',
              'Resource Conservation: Uses infinite wind, sun, water vs finite fossil fuels.',
              'Air/Water Quality: Lowers pollutants, improves public health, curbs acid rain.',
              'Biodiversity Protection: Less habitat disruption compared to fossil extraction.',
              'Sustainable Urban Development: Powers smart cities, green infrastructure.'
            ],
          },
          {
            text: 'What innovative technologies can enhance the affordability and reliability of clean energy?',
            answers: [
              'Energy Storage: Advanced batteries, grid-scale solutions, cost-reducing materials.',
              'Smart Grids: Demand-response, sensors, flexible integration of renewables.',
              'Floating Solar Farms: Space-saving, evaporation reduction, higher efficiency.',
              'Offshore Wind Turbines: Stronger winds, bigger capacity, offshore expansion.',
              'BECCS: Negative emissions via bioenergy + carbon capture, agriculture residue usage.'
            ],
          },
        ],
      },
    
      // SDG 8: Decent Work and Economic Growth
      {
        id: 8,
        name: 'SDG 8: Decent Work and Economic Growth',
        questions: [
          {
            text: 'What factors contribute to sustainable economic growth in different economies?',
            answers: [
              'Human Capital Development: Education, vocational training, healthcare access.',
              'Innovation and Technology: R&D, startups, advanced manufacturing.',
              'Infrastructure Development: Transport, digital networks, sustainable urban planning.',
              'Sound Economic Policies: Fiscal stability, transparent regulations, property rights.',
              'Inclusive Growth Initiatives: Equal opportunities, SME support, shared prosperity.'
            ],
          },
          {
            text: 'How does the quality of employment affect societal well-being?',
            answers: [
              'Health and Well-being: Safe conditions, healthcare benefits, reduced stress.',
              'Economic Stability: Steady income, reduced welfare dependency, consumer confidence.',
              'Social Inclusion: Diversity in hiring, empowerment of marginalized groups.',
              'Community Development: Local business growth, sense of purpose, infrastructure.',
              'Education/Skill Development: Continuous learning, upskilling, career progression.'
            ],
          },
          {
            text: 'What policies can ensure inclusive and equitable economic growth?',
            answers: [
              'Progressive Taxation/Redistribution: Fair tax systems, funding social programs.',
              'Labor Market Regulations: Minimum wage, safe conditions, non-discrimination.',
              'Education/Training Investment: Quality schooling, vocational alignment, PPPs.',
              'SME Support: Financial incentives, low-interest loans, technical assistance.',
              'Inclusive Financial Systems: Banking access, microfinance, literacy programs.'
            ],
          },
        ],
      },
    
      // SDG 9: Industry, Innovation, and Infrastructure
      {
        id: 9,
        name: 'SDG 9: Industry, Innovation, and Infrastructure',
        questions: [
          {
            text: 'What role does innovation play in sustainable industrial development?',
            answers: [
              'Increased Efficiency: Less resource usage, streamlined processes, lower waste.',
              'Environmental Impact Reduction: Cleaner production, eco-friendly materials.',
              'Economic Competitiveness: New products, new markets, adaptability to trends.',
              'Job Creation and Skill Development: High-tech sectors, continuous training.',
              'Sustainable Resource Management: Resource-efficient manufacturing, renewables integration.'
            ],
          },
          {
            text: 'How can infrastructure development be both resilient and inclusive?',
            answers: [
              'Climate-Resilient Design: Strong materials, adaptive planning, hazard mitigation.',
              'Inclusive Accessibility: Universal design, public transport for all abilities.',
              'Sustainable Urban Development: Green areas, renewables, mixed-use planning.',
              'Digital Infrastructure Investment: Connectivity in rural/urban areas, bridging digital divide.',
              'Public Participation: Community engagement, transparent decision-making, accountability.'
            ],
          },
          {
            text: 'What are the challenges and opportunities in fostering technological innovation?',
            answers: [
              'Funding and Investment: R&D costs, investor risk aversion, capital availability.',
              'Regulatory Hurdles: Compliance, safety standards, evolving policies.',
              'Skill Gaps: Need for specialized training, interdisciplinary collaboration.',
              'Intellectual Property: Balancing protection vs. open innovation, patent conflicts.',
              'Economic Growth and Sustainability: Jobs, cleaner processes, global competitiveness.'
            ],
          },
        ],
      },
    
      // SDG 10: Reduced Inequalities
      {
        id: 10,
        name: 'SDG 10: Reduced Inequalities',
        questions: [
          {
            text: 'What are the main drivers of income and social inequalities in different societies?',
            answers: [
              'Educational Disparities: Quality, resource gaps, discrimination in schools.',
              'Labor Market Inequities: Wage gaps, limited access to high-paying jobs.',
              'Wealth Concentration: Inheritance, capital income, returns to the wealthy.',
              'Discrimination and Social Exclusion: Racial, gender, disability-based barriers.',
              'Policy/Governance Failures: Weak redistribution, corruption, minimal safety nets.'
            ],
          },
          {
            text: 'How does reducing inequality contribute to overall societal well-being?',
            answers: [
              'Enhanced Economic Growth: More consumers, stable markets, diverse innovation.',
              'Social Cohesion/Stability: Less tension, conflict, stronger community bonds.',
              'Improved Health Outcomes: Broader healthcare access, less chronic stress.',
              'Increased Educational Attainment: More equitable schooling, upward mobility.',
              'Political Stability/Governance: Reduced unrest, more accountability, inclusive policies.'
            ],
          },
          {
            text: 'What strategies can effectively address discrimination and promote equal opportunities?',
            answers: [
              'Legislative Reforms: Anti-discrimination laws, equal pay acts, affirmative action.',
              'Education/Awareness: Campaigns, diversity training, cultural competence programs.',
              'Inclusive Policies/Practices: Workplace equity, universal access, supportive networks.',
              'Economic Empowerment Initiatives: Microfinance, skill-building, entrepreneurship support.',
              'Community Engagement/Support: Local advocacy groups, safe spaces, mentorship.'
            ],
          },
        ],
      },
    
      // SDG 11: Sustainable Cities and Communities
      {
        id: 11,
        name: 'SDG 11: Sustainable Cities and Communities',
        questions: [
          {
            text: 'What challenges do rapidly growing cities face in achieving sustainability?',
            answers: [
              'Infrastructure Strain: Outdated systems, overburdened utilities, traffic congestion.',
              'Environmental Degradation: Loss of green areas, pollution, climate vulnerability.',
              'Housing and Urban Sprawl: Slums, expensive rentals, inefficient land use.',
              'Social Inequities: Poverty pockets, lack of access to services, tension.',
              'Resource Management: Waste disposal, water/energy scarcity, unequal distribution.'
            ],
          },
          {
            text: 'How can urban planning contribute to safer and more inclusive communities?',
            answers: [
              'Inclusive Design/Accessibility: Universal design, mobility for all, safe roads.',
              'Public Safety Enhancements: Well-lit streets, CPTED, robust emergency services.',
              'Community Engagement: Participatory forums, local groups, neighborhood councils.',
              'Affordable/Diverse Housing: Mixed-use zoning, incentives, no discrimination.',
              'Integrated Transportation: Effective public transit, cycling lanes, walkable spaces.'
            ],
          },
          {
            text: 'What role does technology play in enhancing urban resilience and sustainability?',
            answers: [
              'Smart City Technologies: Sensors, data-driven management, real-time optimization.',
              'Renewable Energy Integration: Solar, wind, microgrids for city infrastructure.',
              'Sustainable Building Practices: Green materials, energy-efficient retrofits.',
              'Digital Infrastructure: High-speed internet, telework, bridging digital divides.',
              'Disaster Management Systems: Early warning, GIS, remote sensing for responses.'
            ],
          },
        ],
      },
    
      // SDG 12: Responsible Consumption and Production
      {
        id: 12,
        name: 'SDG 12: Responsible Consumption and Production',
        questions: [
          {
            text: 'What are the environmental impacts of current consumption and production practices?',
            answers: [
              'Resource Depletion: Water, minerals, fossil fuels running low.',
              'Waste/Pollution: Plastic, toxins, GHG emissions, overflowing landfills.',
              'Climate Change: Deforestation, land-use changes, extreme weather events.',
              'Energy Consumption: Reliance on non-renewables, inefficiency in processes.',
              'Ecosystem Degradation: Habitat loss, disrupted ecological balance.'
            ],
          },
          {
            text: 'How can businesses adopt more sustainable production methods?',
            answers: [
              'Circular Economy: Durability, product take-back, design for recycling.',
              'Energy Efficiency/Renewables: Upgraded machinery, solar/wind power, audits.',
              'Sustainable Supply Chains: Certified sourcing, traceability, green logistics.',
              'Waste Reduction: Lean manufacturing, zero-waste goals, compost/recycle.',
              'Eco-Friendly Design: Fewer harmful chemicals, minimal packaging, robust products.'
            ],
          },
          {
            text: 'What role do consumers play in promoting responsible consumption?',
            answers: [
              'Informed Purchasing Decisions: Sustainable, ethical, minimal footprint.',
              'Reducing/Reusing/Recycling: Lower waste, longer lifecycles, upcycling culture.',
              'Advocacy for Sustainability: Demand greener policies, support responsible brands.',
              'Mindful Consumption: Seasonal, local foods, low energy usage, less plastics.',
              'Support Circular Economy: Sharing, rentals, repair services, second-hand markets.'
            ],
          },
        ],
      },
    
      // SDG 13: Climate Action
      {
        id: 13,
        name: 'SDG 13: Climate Action',
        questions: [
          {
            text: 'What are the most significant contributors to climate change globally?',
            answers: [
              'Burning of Fossil Fuels: Coal, oil, gas for energy/transport.',
              'Deforestation/Land Use: Lost carbon sinks, habitat destruction.',
              'Industrial Processes: Cement, steel, chemical emissions.',
              'Agriculture/Livestock: Methane, nitrous oxide, land clearing.',
              'Waste Management: Landfill methane, poor disposal, incineration CO2.'
            ],
          },
          {
            text: 'How does climate change affect different ecosystems and communities?',
            answers: [
              'Ecosystem Disruption: Habitat shifts, ocean acidification, coral bleaching.',
              'Agricultural Impacts: Reduced yields, extreme weather, shifting seasons.',
              'Human Health Risks: Heatwaves, disease spread, disasters, mental stress.',
              'Economic Consequences: Infrastructure damage, insurance costs, lost tourism.',
              'Social/Cultural Impacts: Climate refugees, resource conflicts, lost heritage.'
            ],
          },
          {
            text: 'What strategies can effectively mitigate the impacts of climate change?',
            answers: [
              'Renewable Energy Transition: Solar, wind, hydro, geothermal adoption.',
              'Afforestation/Reforestation: Planting/restoring forests, preventing deforestation.',
              'Energy Efficiency: Building retrofits, efficient appliances, grid upgrades.',
              'Sustainable Agriculture: Climate-smart practices, reduced methane, soil health.',
              'Policy/Governance Reforms: Carbon pricing, Paris Agreement alignment, enforcement.'
            ],
          },
        ],
      },
    
      // SDG 14: Life Below Water
      {
        id: 14,
        name: 'SDG 14: Life Below Water',
        questions: [
          {
            text: 'What are the primary threats to marine ecosystems?',
            answers: [
              'Overfishing: Stock depletion, bycatch, IUU fishing.',
              'Marine Pollution: Plastics, chemicals, oil spills.',
              'Climate Change: Ocean warming, acidification, sea-level rise.',
              'Habitat Destruction: Coastal development, trawling, dredging.',
              'Invasive Species: Non-native introduction, ecosystem disruption.'
            ],
          },
          {
            text: 'How does marine biodiversity contribute to global environmental health?',
            answers: [
              'Carbon Sequestration: Mangroves, seagrasses, phytoplankton capturing CO2.',
              'Nutrient Cycling: Marine organisms, ecosystem services, water purification.',
              'Food Security: Sustainable fisheries, livelihood for millions worldwide.',
              'Medicine/Biotechnology: Novel compounds, drug discovery, industrial enzymes.',
              'Cultural/Recreational Value: Tourism, diving, heritage, well-being.'
            ],
          },
          {
            text: 'What sustainable practices can protect and preserve marine life?',
            answers: [
              'Marine Protected Areas: No-take zones, ecosystem recovery, effective management.',
              'Sustainable Fishing: Quotas, gear selectivity, certifications (MSC).',
              'Pollution Control: Reduced runoff, plastic bans, oil spill response.',
              'Climate Change Mitigation: Emission cuts, habitat restoration, resilience.',
              'Community Engagement: Local stewardship, awareness, citizen science.'
            ],
          },
        ],
      },
    
      // SDG 15: Life on Land
      {
        id: 15,
        name: 'SDG 15: Life on Land',
        questions: [
          {
            text: 'What are the main drivers of biodiversity loss on land?',
            answers: [
              'Habitat Destruction/Fragmentation: Agriculture, urban sprawl, infrastructure.',
              'Overexploitation of Resources: Unsustainable logging, hunting, overgrazing.',
              'Pollution: Chemicals, plastics, air/water contamination.',
              'Climate Change: Altered temperatures, extreme events, shifting species ranges.',
              'Invasive Species: Competition, predation, ecosystem imbalance.'
            ],
          },
          {
            text: 'How do deforestation and habitat destruction impact ecosystems?',
            answers: [
              'Loss of Biodiversity: Species extinction, reduced genetic diversity.',
              'Climate Regulation: Reduced carbon sinks, higher CO2 emissions.',
              'Water Cycle Disruption: Less infiltration, altered rain patterns, floods/droughts.',
              'Soil Degradation: Erosion, nutrient loss, desertification risk.',
              'Loss of Ecosystem Services: Pollination, pest control, protection from disasters.'
            ],
          },
          {
            text: 'What strategies can effectively restore and protect terrestrial ecosystems?',
            answers: [
              'Reforestation/Afforestation: Plant native trees, carbon sequestration, local stewardship.',
              'Protected Areas/Conservation Corridors: Reserves, wildlife corridors, enforcement.',
              'Sustainable Land Management: Agroforestry, permaculture, conservation tillage.',
              'Restoration Ecology: Remove invasives, reintroduce native species, rebuild habitats.',
              'Community-Based Conservation: Local involvement, traditional knowledge, economic incentives.'
            ],
          },
        ],
      },
    
      // SDG 16: Peace, Justice, and Strong Institutions
      {
        id: 16,
        name: 'SDG 16: Peace, Justice, and Strong Institutions',
        questions: [
          {
            text: 'What factors contribute to the stability and effectiveness of institutions?',
            answers: [
              'Transparency/Accountability: Open operations, ethics, responsible leadership.',
              'Strong Legal Frameworks: Comprehensive laws, consistent enforcement, property rights.',
              'Inclusive Governance: Diverse representation, participation, social cohesion.',
              'Capacity/Resources: Adequate funding, skilled staff, modern tech infrastructure.',
              'Ethical Leadership/Culture: Role models, codes of conduct, moral standards.'
            ],
          },
          {
            text: 'How does access to justice impact societal well-being?',
            answers: [
              'Protection of Rights/Freedoms: Legal recourse, upholding rule of law.',
              'Reduction of Inequality: Fair treatment, social inclusion, bridging gaps.',
              'Conflict Resolution: Mediation, peaceful dispute resolution, less violence.',
              'Economic Stability: Investment security, contract enforcement, anti-corruption.',
              'Trust in Institutions: Transparent processes, public confidence, social harmony.'
            ],
          },
          {
            text: 'What measures can promote peace and reduce conflict in communities?',
            answers: [
              'Prevention/Early Warning: Identifying tensions, rapid response, community leaders.',
              'Inclusive Dialogue/Mediation: Open discussions, trained facilitators, mutual understanding.',
              'Education/Awareness: Peace education, anti-violence campaigns, human rights emphasis.',
              'Economic/Social Development: Poverty reduction, job creation, bridging inequalities.',
              'Strengthening Legal Frameworks: Effective justice systems, respect for human rights, accountability.'
            ],
          },
        ],
      },
    
      // SDG 17: Partnerships for the Goals
      {
        id: 17,
        name: 'SDG 17: Partnerships for the Goals',
        questions: [
          {
            text: 'What role do partnerships play in achieving sustainable development?',
            answers: [
              'Resource Mobilization: Pooling finances, expertise, maximizing impact.',
              'Knowledge/Capacity Building: Sharing best practices, empowering communities.',
              'Innovation/Tech Transfer: Cross-sector collaboration, R&D, advanced solutions.',
              'Policy Advocacy/Influence: Amplified voice, shaping systemic changes, synergy.',
              'Monitoring/Accountability: Joint frameworks, shared data, transparent reporting.'
            ],
          },
          {
            text: 'How can different stakeholders collaborate effectively to reach common goals?',
            answers: [
              'Clear Communication/Shared Vision: Transparency, regular updates, aligned objectives.',
              'Defined Roles/Responsibilities: Accountability, leveraging each partner’s strengths.',
              'Trust/Mutual Respect: Reliability, inclusive culture, no hidden agendas.',
              'Capacity Building/Support: Training, knowledge exchange, resource sharing.',
              'Flexible/Adaptive Approaches: Iterative learning, openness to innovation, pivoting if needed.'
            ],
          },
          {
            text: 'What challenges do global partnerships face, and how can they be overcome?',
            answers: [
              'Cultural/Language Differences: Sensitivity training, translation, bridging gaps.',
              'Power Imbalances: Equitable governance, fair resource allocation, shared credit.',
              'Differing Objectives/Priorities: Common framework, negotiation, synergy alignment.',
              'Sustainability/Commitment: Strong trust, diverse funding, adaptability over time.',
              'Coordination/Communication Issues: Structured collaboration tools, frequent check-ins.'
            ],
          },
        ],
      },
    
  // ... Continue for all 17 SDGs (shortened here for brevity) ...
  // This is just a partial example with the new structure. 
  // You'd replicate the same approach for all 17 goals, each question having an "answers" array.
];

const Professor = ({ onSDGChange }) => {
  const [selectedSDG, setSelectedSDG] = useState(null);

  // For question-by-question flow:
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Track which answers the user selected for each question (optional).
  // Key is question index, value is array of chosen answers.
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Handler to assign a random SDG
  const handleRandomAssign = () => {
    const randomIndex = Math.floor(Math.random() * professorSdgData.length);
    const chosen = professorSdgData[randomIndex];
    setSelectedSDG(chosen);
    setCurrentQuestionIndex(0); // reset question flow
    setSelectedAnswers({});
    if (onSDGChange) onSDGChange(chosen.id);
  };

  // Handler to set the SDG manually via a dropdown
  const handleSelectSDG = (e) => {
    const chosenId = parseInt(e.target.value, 10);
    const found = professorSdgData.find((sdg) => sdg.id === chosenId) || null;
    setSelectedSDG(found);
    setCurrentQuestionIndex(0); // reset question flow
    setSelectedAnswers({});
    if (onSDGChange && found) onSDGChange(found.id);
  };

  // Called when user checks/unchecks a checkbox for the current question
  const handleCheckboxChange = (answer) => {
    if (!selectedSDG) return;

    const currentQIndex = currentQuestionIndex;
    // copy existing answers for this question
    const existing = selectedAnswers[currentQIndex] || [];

    let updated;
    if (existing.includes(answer)) {
      // if already selected, unselect it
      updated = existing.filter((item) => item !== answer);
    } else {
      // add it
      updated = [...existing, answer];
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: updated,
    });
  };

  // Handler to go to the next question
  const handleNextQuestion = () => {
    if (!selectedSDG) return;
    // Move to the next question if not at the last question
    if (currentQuestionIndex < selectedSDG.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    // else you could do something if user is done with all questions
    // e.g., show a "completed" message.
  };

  // If an SDG is chosen, we can get the current question object
  let currentQuestionObj = null;
  if (selectedSDG && selectedSDG.questions[currentQuestionIndex]) {
    currentQuestionObj = selectedSDG.questions[currentQuestionIndex];
  }

  return (
    <div className="professor-container">
      <h2 className="professor-title">Professor AI: SDG Guidance</h2>
      <p className="professor-intro">
        I am Professor AI, here to ask fundamental and philosophical questions to guide your
        exploration of the 17 Sustainable Development Goals (SDGs).
      </p>

      {/* Controls for choosing an SDG */}
      <div className="professor-controls">
        <button className="random-assign-button" onClick={handleRandomAssign}>
          Randomly Assign an SDG
        </button>
        <span className="or-label">OR</span>
        <select className="sdg-select" onChange={handleSelectSDG}>
          <option value="0">-- Select an SDG --</option>
          {professorSdgData.map((sdg) => (
            <option key={sdg.id} value={sdg.id}>
              {sdg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display the selected or assigned SDG with question-by-question flow */}
      <div className="professor-sdg-display">
        {selectedSDG ? (
          <>
            <h3 className="selected-sdg">{selectedSDG.name}</h3>
            {!currentQuestionObj ? (
              <p className="professor-placeholder">
                No questions found for this SDG. (Data might be incomplete.)
              </p>
            ) : (
              <div className="question-flow-container">
                <p className="sdg-questions-intro">
                  Question {currentQuestionIndex + 1} of {selectedSDG.questions.length}:
                </p>
                <div className="question-text">{currentQuestionObj.text}</div>

                {/* Checkboxes for each answer */}
                <div className="answers-container">
                  {currentQuestionObj.answers.map((ans, idx) => {
                    const isChecked =
                      (selectedAnswers[currentQuestionIndex] || []).includes(ans);
                    return (
                      <label className="answer-option" key={idx}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(ans)}
                        />
                        <span>{ans}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Next button */}
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex >= selectedSDG.questions.length - 1}
                >
                  {currentQuestionIndex < selectedSDG.questions.length - 1
                    ? 'Next'
                    : 'Done'}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="professor-placeholder">
            Please either randomly assign an SDG or select one from the dropdown above to see guiding questions.
          </p>
        )}
      </div>
    </div>
  );
};

export default Professor;
