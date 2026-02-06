export type Timeframe = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type Language = 'english' | 'hindi' | 'gujarati';

export interface CurrentAffairItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface CurrentAffairsData {
  [key: string]: {
    [key: string]: CurrentAffairItem[];
  };
}

export const currentAffairsData: CurrentAffairsData = {
  daily: {
    english: [
      {
        id: 'daily-en-1',
        title: 'Supreme Court Ruling on Environmental Protection',
        description: 'The Supreme Court issued a landmark judgment strengthening environmental safeguards and directing states to implement stricter pollution control measures.',
        date: 'February 6, 2026',
        category: 'Polity & Governance'
      },
      {
        id: 'daily-en-2',
        title: 'India-Japan Strategic Partnership Agreement',
        description: 'India and Japan signed a comprehensive strategic partnership agreement focusing on defense cooperation, technology transfer, and economic collaboration.',
        date: 'February 6, 2026',
        category: 'International Relations'
      },
      {
        id: 'daily-en-3',
        title: 'New Digital Payment Infrastructure Launch',
        description: 'RBI launched an advanced digital payment infrastructure aimed at enhancing financial inclusion and reducing transaction costs across rural India.',
        date: 'February 6, 2026',
        category: 'Economy'
      },
      {
        id: 'daily-en-4',
        title: 'National Education Policy Implementation Update',
        description: 'Ministry of Education released progress report on NEP 2020 implementation, highlighting achievements in curriculum reform and skill development.',
        date: 'February 5, 2026',
        category: 'Social Issues'
      }
    ],
    hindi: [
      {
        id: 'daily-hi-1',
        title: 'पर्यावरण संरक्षण पर सर्वोच्च न्यायालय का फैसला',
        description: 'सर्वोच्च न्यायालय ने पर्यावरण सुरक्षा को मजबूत करने और राज्यों को सख्त प्रदूषण नियंत्रण उपाय लागू करने का निर्देश देते हुए एक ऐतिहासिक फैसला सुनाया।',
        date: '6 फरवरी, 2026',
        category: 'राजनीति और शासन'
      },
      {
        id: 'daily-hi-2',
        title: 'भारत-जापान रणनीतिक साझेदारी समझौता',
        description: 'भारत और जापान ने रक्षा सहयोग, प्रौद्योगिकी हस्तांतरण और आर्थिक सहयोग पर केंद्रित एक व्यापक रणनीतिक साझेदारी समझौते पर हस्ताक्षर किए।',
        date: '6 फरवरी, 2026',
        category: 'अंतर्राष्ट्रीय संबंध'
      },
      {
        id: 'daily-hi-3',
        title: 'नई डिजिटल भुगतान अवसंरचना की शुरुआत',
        description: 'आरबीआई ने ग्रामीण भारत में वित्तीय समावेशन बढ़ाने और लेनदेन लागत कम करने के उद्देश्य से एक उन्नत डिजिटल भुगतान अवसंरचना शुरू की।',
        date: '6 फरवरी, 2026',
        category: 'अर्थव्यवस्था'
      },
      {
        id: 'daily-hi-4',
        title: 'राष्ट्रीय शिक्षा नीति कार्यान्वयन अपडेट',
        description: 'शिक्षा मंत्रालय ने एनईपी 2020 कार्यान्वयन पर प्रगति रिपोर्ट जारी की, जिसमें पाठ्यक्रम सुधार और कौशल विकास में उपलब्धियों पर प्रकाश डाला गया।',
        date: '5 फरवरी, 2026',
        category: 'सामाजिक मुद्दे'
      }
    ],
    gujarati: [
      {
        id: 'daily-gu-1',
        title: 'પર્યાવરણ સંરક્ષણ પર સર્વોચ્ચ અદાલતનો ચુકાદો',
        description: 'સર્વોચ્ચ અદાલતે પર્યાવરણ સુરક્ષાને મજબૂત બનાવતો અને રાજ્યોને કડક પ્રદૂષણ નિયંત્રણ પગલાં લાગુ કરવા નિર્દેશ આપતો ઐતિહાસિક ચુકાદો આપ્યો.',
        date: '6 ફેબ્રુઆરી, 2026',
        category: 'રાજનીતિ અને શાસન'
      },
      {
        id: 'daily-gu-2',
        title: 'ભારત-જાપાન વ્યૂહાત્મક ભાગીદારી કરાર',
        description: 'ભારત અને જાપાને સંરક્ષણ સહયોગ, ટેકનોલોજી ટ્રાન્સફર અને આર્થિક સહયોગ પર કેન્દ્રિત વ્યાપક વ્યૂહાત્મક ભાગીદારી કરાર પર હસ્તાક્ષર કર્યા.',
        date: '6 ફેબ્રુઆરી, 2026',
        category: 'આંતરરાષ્ટ્રીય સંબંધો'
      },
      {
        id: 'daily-gu-3',
        title: 'નવી ડિજિટલ પેમેન્ટ ઇન્ફ્રાસ્ટ્રક્ચર લોન્ચ',
        description: 'આરબીઆઈએ ગ્રામીણ ભારતમાં નાણાકીય સમાવેશ વધારવા અને વ્યવહાર ખર્ચ ઘટાડવાના હેતુથી અદ્યતન ડિજિટલ પેમેન્ટ ઇન્ફ્રાસ્ટ્રક્ચર શરૂ કર્યું.',
        date: '6 ફેબ્રુઆરી, 2026',
        category: 'અર્થતંત્ર'
      },
      {
        id: 'daily-gu-4',
        title: 'રાષ્ટ્રીય શિક્ષણ નીતિ અમલીકરણ અપડેટ',
        description: 'શિક્ષણ મંત્રાલયે NEP 2020 અમલીકરણ પર પ્રગતિ અહેવાલ બહાર પાડ્યો, જેમાં અભ્યાસક્રમ સુધારણા અને કૌશલ્ય વિકાસમાં સિદ્ધિઓ પર પ્રકાશ પાડ્યો.',
        date: '5 ફેબ્રુઆરી, 2026',
        category: 'સામાજિક મુદ્દાઓ'
      }
    ]
  },
  weekly: {
    english: [
      {
        id: 'weekly-en-1',
        title: 'G20 Summit Outcomes and India\'s Role',
        description: 'Analysis of key decisions from the G20 Summit, including climate commitments, trade agreements, and India\'s leadership in global economic governance.',
        date: 'Week of February 3-9, 2026',
        category: 'International Relations'
      },
      {
        id: 'weekly-en-2',
        title: 'Union Budget 2026 Key Highlights',
        description: 'Comprehensive overview of Union Budget allocations, tax reforms, infrastructure spending, and implications for economic growth and social welfare.',
        date: 'Week of February 3-9, 2026',
        category: 'Economy'
      },
      {
        id: 'weekly-en-3',
        title: 'Agricultural Reforms and Farmer Welfare Schemes',
        description: 'Government announced new agricultural reforms focusing on crop diversification, MSP revisions, and enhanced farmer income support mechanisms.',
        date: 'Week of February 3-9, 2026',
        category: 'Agriculture'
      },
      {
        id: 'weekly-en-4',
        title: 'Space Mission Success: Chandrayaan-4 Launch',
        description: 'ISRO successfully launched Chandrayaan-4 mission, marking another milestone in India\'s space exploration program with advanced lunar research objectives.',
        date: 'Week of January 27-February 2, 2026',
        category: 'Science & Technology'
      }
    ],
    hindi: [
      {
        id: 'weekly-hi-1',
        title: 'G20 शिखर सम्मेलन के परिणाम और भारत की भूमिका',
        description: 'G20 शिखर सम्मेलन के प्रमुख निर्णयों का विश्लेषण, जिसमें जलवायु प्रतिबद्धताएं, व्यापार समझौते और वैश्विक आर्थिक शासन में भारत का नेतृत्व शामिल है।',
        date: '3-9 फरवरी, 2026 का सप्ताह',
        category: 'अंतर्राष्ट्रीय संबंध'
      },
      {
        id: 'weekly-hi-2',
        title: 'केंद्रीय बजट 2026 की मुख्य बातें',
        description: 'केंद्रीय बजट आवंटन, कर सुधार, बुनियादी ढांचे के खर्च और आर्थिक विकास और सामाजिक कल्याण के लिए निहितार्थों का व्यापक अवलोकन।',
        date: '3-9 फरवरी, 2026 का सप्ताह',
        category: 'अर्थव्यवस्था'
      },
      {
        id: 'weekly-hi-3',
        title: 'कृषि सुधार और किसान कल्याण योजनाएं',
        description: 'सरकार ने फसल विविधीकरण, एमएसपी संशोधन और बढ़ाई गई किसान आय सहायता तंत्र पर केंद्रित नए कृषि सुधारों की घोषणा की।',
        date: '3-9 फरवरी, 2026 का सप्ताह',
        category: 'कृषि'
      },
      {
        id: 'weekly-hi-4',
        title: 'अंतरिक्ष मिशन की सफलता: चंद्रयान-4 प्रक्षेपण',
        description: 'इसरो ने चंद्रयान-4 मिशन को सफलतापूर्वक लॉन्च किया, जो उन्नत चंद्र अनुसंधान उद्देश्यों के साथ भारत के अंतरिक्ष अन्वेषण कार्यक्रम में एक और मील का पत्थर है।',
        date: '27 जनवरी-2 फरवरी, 2026 का सप्ताह',
        category: 'विज्ञान और प्रौद्योगिकी'
      }
    ],
    gujarati: [
      {
        id: 'weekly-gu-1',
        title: 'G20 સમિટના પરિણામો અને ભારતની ભૂમિકા',
        description: 'G20 સમિટના મુખ્ય નિર્ણયોનું વિશ્લેષણ, જેમાં આબોહવા પ્રતિબદ્ધતાઓ, વેપાર કરારો અને વૈશ્વિક આર્થિક શાસનમાં ભારતનું નેતૃત્વ સામેલ છે.',
        date: '3-9 ફેબ્રુઆરી, 2026નું અઠવાડિયું',
        category: 'આંતરરાષ્ટ્રીય સંબંધો'
      },
      {
        id: 'weekly-gu-2',
        title: 'કેન્દ્રીય બજેટ 2026ની મુખ્ય વિશેષતાઓ',
        description: 'કેન્દ્રીય બજેટ ફાળવણી, કર સુધારણા, માળખાકીય ખર્ચ અને આર્થિક વૃદ્ધિ અને સામાજિક કલ્યાણ માટેની અસરોનું વ્યાપક વિહંગાવલોકન.',
        date: '3-9 ફેબ્રુઆરી, 2026નું અઠવાડિયું',
        category: 'અર્થતંત્ર'
      },
      {
        id: 'weekly-gu-3',
        title: 'કૃષિ સુધારણા અને ખેડૂત કલ્યાણ યોજનાઓ',
        description: 'સરકારે પાક વૈવિધ્યકરણ, MSP સુધારણા અને વધારેલી ખેડૂત આવક સહાય પદ્ધતિ પર કેન્દ્રિત નવા કૃષિ સુધારણાની જાહેરાત કરી.',
        date: '3-9 ફેબ્રુઆરી, 2026નું અઠવાડિયું',
        category: 'કૃષિ'
      },
      {
        id: 'weekly-gu-4',
        title: 'અવકાશ મિશનની સફળતા: ચંદ્રયાન-4 લોન્ચ',
        description: 'ઇસરોએ ચંદ્રયાન-4 મિશન સફળતાપૂર્વક લોન્ચ કર્યું, જે અદ્યતન ચંદ્ર સંશોધન ઉદ્દેશ્યો સાથે ભારતના અવકાશ સંશોધન કાર્યક્રમમાં બીજો મહત્વનો પડાવ છે.',
        date: '27 જાન્યુઆરી-2 ફેબ્રુઆરી, 2026નું અઠવાડિયું',
        category: 'વિજ્ઞાન અને ટેકનોલોજી'
      }
    ]
  },
  monthly: {
    english: [
      {
        id: 'monthly-en-1',
        title: 'India\'s Economic Growth Trajectory in 2026',
        description: 'Detailed analysis of India\'s GDP growth, inflation trends, employment data, and sectoral performance during January 2026, with projections for the fiscal year.',
        date: 'January 2026',
        category: 'Economy'
      },
      {
        id: 'monthly-en-2',
        title: 'Climate Action and COP31 Preparations',
        description: 'India\'s climate policy updates, renewable energy achievements, carbon emission targets, and preparations for the upcoming COP31 conference.',
        date: 'January 2026',
        category: 'Environment'
      },
      {
        id: 'monthly-en-3',
        title: 'Healthcare Infrastructure Development',
        description: 'Progress report on Ayushman Bharat expansion, new medical colleges, telemedicine initiatives, and pharmaceutical manufacturing growth.',
        date: 'January 2026',
        category: 'Social Issues'
      },
      {
        id: 'monthly-en-4',
        title: 'Digital India 2.0 Implementation Progress',
        description: 'Updates on digital infrastructure expansion, cybersecurity measures, AI policy framework, and technology adoption in governance.',
        date: 'December 2025',
        category: 'Science & Technology'
      }
    ],
    hindi: [
      {
        id: 'monthly-hi-1',
        title: '2026 में भारत की आर्थिक विकास प्रक्षेपवक्र',
        description: 'जनवरी 2026 के दौरान भारत की जीडीपी वृद्धि, मुद्रास्फीति के रुझान, रोजगार डेटा और क्षेत्रीय प्रदर्शन का विस्तृत विश्लेषण, वित्तीय वर्ष के लिए अनुमानों के साथ।',
        date: 'जनवरी 2026',
        category: 'अर्थव्यवस्था'
      },
      {
        id: 'monthly-hi-2',
        title: 'जलवायु कार्रवाई और COP31 की तैयारी',
        description: 'भारत की जलवायु नीति अपडेट, नवीकरणीय ऊर्जा उपलब्धियां, कार्बन उत्सर्जन लक्ष्य और आगामी COP31 सम्मेलन की तैयारी।',
        date: 'जनवरी 2026',
        category: 'पर्यावरण'
      },
      {
        id: 'monthly-hi-3',
        title: 'स्वास्थ्य सेवा बुनियादी ढांचे का विकास',
        description: 'आयुष्मान भारत विस्तार, नए मेडिकल कॉलेज, टेलीमेडिसिन पहल और फार्मास्युटिकल विनिर्माण वृद्धि पर प्रगति रिपोर्ट।',
        date: 'जनवरी 2026',
        category: 'सामाजिक मुद्दे'
      },
      {
        id: 'monthly-hi-4',
        title: 'डिजिटल इंडिया 2.0 कार्यान्वयन प्रगति',
        description: 'डिजिटल बुनियादी ढांचे के विस्तार, साइबर सुरक्षा उपाय, एआई नीति ढांचा और शासन में प्रौद्योगिकी अपनाने पर अपडेट।',
        date: 'दिसंबर 2025',
        category: 'विज्ञान और प्रौद्योगिकी'
      }
    ],
    gujarati: [
      {
        id: 'monthly-gu-1',
        title: '2026માં ભારતની આર્થિક વૃદ્ધિ માર્ગ',
        description: 'જાન્યુઆરી 2026 દરમિયાન ભારતની GDP વૃદ્ધિ, ફુગાવાના વલણો, રોજગાર ડેટા અને ક્ષેત્રીય પ્રદર્શનનું વિગતવાર વિશ્લેષણ, નાણાકીય વર્ષ માટેના અંદાજો સાથે.',
        date: 'જાન્યુઆરી 2026',
        category: 'અર્થતંત્ર'
      },
      {
        id: 'monthly-gu-2',
        title: 'આબોહવા કાર્યવાહી અને COP31 તૈયારીઓ',
        description: 'ભારતની આબોહવા નીતિ અપડેટ્સ, નવીનીકરણીય ઊર્જા સિદ્ધિઓ, કાર્બન ઉત્સર્જન લક્ષ્યો અને આગામી COP31 પરિષદની તૈયારીઓ.',
        date: 'જાન્યુઆરી 2026',
        category: 'પર્યાવરણ'
      },
      {
        id: 'monthly-gu-3',
        title: 'આરોગ્યસંભાળ માળખાકીય વિકાસ',
        description: 'આયુષ્માન ભારત વિસ્તરણ, નવી મેડિકલ કોલેજો, ટેલિમેડિસિન પહેલ અને ફાર્માસ્યુટિકલ ઉત્પાદન વૃદ્ધિ પર પ્રગતિ અહેવાલ.',
        date: 'જાન્યુઆરી 2026',
        category: 'સામાજિક મુદ્દાઓ'
      },
      {
        id: 'monthly-gu-4',
        title: 'ડિજિટલ ઇન્ડિયા 2.0 અમલીકરણ પ્રગતિ',
        description: 'ડિજિટલ માળખાકીય વિસ્તરણ, સાયબર સુરક્ષા પગલાં, AI નીતિ માળખું અને શાસનમાં ટેકનોલોજી અપનાવવા પર અપડેટ્સ.',
        date: 'ડિસેમ્બર 2025',
        category: 'વિજ્ઞાન અને ટેકનોલોજી'
      }
    ]
  },
  yearly: {
    english: [
      {
        id: 'yearly-en-1',
        title: 'India\'s Major Policy Reforms in 2025',
        description: 'Comprehensive review of significant policy changes across sectors including economy, education, healthcare, agriculture, and digital infrastructure during 2025.',
        date: 'Year 2025',
        category: 'Polity & Governance'
      },
      {
        id: 'yearly-en-2',
        title: 'International Relations: India\'s Global Engagement',
        description: 'Analysis of India\'s bilateral and multilateral engagements, strategic partnerships, trade agreements, and role in international organizations throughout 2025.',
        date: 'Year 2025',
        category: 'International Relations'
      },
      {
        id: 'yearly-en-3',
        title: 'Scientific and Technological Achievements',
        description: 'Year-end review of India\'s achievements in space exploration, defense technology, renewable energy, biotechnology, and digital innovation.',
        date: 'Year 2025',
        category: 'Science & Technology'
      },
      {
        id: 'yearly-en-4',
        title: 'Social Development and Welfare Programs',
        description: 'Assessment of progress in poverty alleviation, education access, healthcare delivery, women empowerment, and rural development initiatives.',
        date: 'Year 2025',
        category: 'Social Issues'
      }
    ],
    hindi: [
      {
        id: 'yearly-hi-1',
        title: '2025 में भारत के प्रमुख नीतिगत सुधार',
        description: '2025 के दौरान अर्थव्यवस्था, शिक्षा, स्वास्थ्य सेवा, कृषि और डिजिटल बुनियादी ढांचे सहित विभिन्न क्षेत्रों में महत्वपूर्ण नीतिगत परिवर्तनों की व्यापक समीक्षा।',
        date: 'वर्ष 2025',
        category: 'राजनीति और शासन'
      },
      {
        id: 'yearly-hi-2',
        title: 'अंतर्राष्ट्रीय संबंध: भारत की वैश्विक भागीदारी',
        description: '2025 के दौरान भारत की द्विपक्षीय और बहुपक्षीय भागीदारी, रणनीतिक साझेदारी, व्यापार समझौतों और अंतर्राष्ट्रीय संगठनों में भूमिका का विश्लेषण।',
        date: 'वर्ष 2025',
        category: 'अंतर्राष्ट्रीय संबंध'
      },
      {
        id: 'yearly-hi-3',
        title: 'वैज्ञानिक और तकनीकी उपलब्धियां',
        description: 'अंतरिक्ष अन्वेषण, रक्षा प्रौद्योगिकी, नवीकरणीय ऊर्जा, जैव प्रौद्योगिकी और डिजिटल नवाचार में भारत की उपलब्धियों की वर्ष-अंत समीक्षा।',
        date: 'वर्ष 2025',
        category: 'विज्ञान और प्रौद्योगिकी'
      },
      {
        id: 'yearly-hi-4',
        title: 'सामाजिक विकास और कल्याण कार्यक्रम',
        description: 'गरीबी उन्मूलन, शिक्षा पहुंच, स्वास्थ्य सेवा वितरण, महिला सशक्तिकरण और ग्रामीण विकास पहलों में प्रगति का आकलन।',
        date: 'वर्ष 2025',
        category: 'सामाजिक मुद्दे'
      }
    ],
    gujarati: [
      {
        id: 'yearly-gu-1',
        title: '2025માં ભારતના મુખ્ય નીતિગત સુધારણા',
        description: '2025 દરમિયાન અર્થતંત્ર, શિક્ષણ, આરોગ્યસંભાળ, કૃષિ અને ડિજિટલ માળખાકીય સહિત વિવિધ ક્ષેત્રોમાં મહત્વપૂર્ણ નીતિગત ફેરફારોની વ્યાપક સમીક્ષા.',
        date: 'વર્ષ 2025',
        category: 'રાજનીતિ અને શાસન'
      },
      {
        id: 'yearly-gu-2',
        title: 'આંતરરાષ્ટ્રીય સંબંધો: ભારતની વૈશ્વિક સંલગ્નતા',
        description: '2025 દરમિયાન ભારતની દ્વિપક્ષીય અને બહુપક્ષીય સંલગ્નતા, વ્યૂહાત્મક ભાગીદારી, વેપાર કરારો અને આંતરરાષ્ટ્રીય સંસ્થાઓમાં ભૂમિકાનું વિશ્લેષણ.',
        date: 'વર્ષ 2025',
        category: 'આંતરરાષ્ટ્રીય સંબંધો'
      },
      {
        id: 'yearly-gu-3',
        title: 'વૈજ્ઞાનિક અને તકનીકી સિદ્ધિઓ',
        description: 'અવકાશ સંશોધન, સંરક્ષણ ટેકનોલોજી, નવીનીકરણીય ઊર્જા, બાયોટેકનોલોજી અને ડિજિટલ નવીનતામાં ભારતની સિદ્ધિઓની વર્ષ-અંત સમીક્ષા.',
        date: 'વર્ષ 2025',
        category: 'વિજ્ઞાન અને ટેકનોલોજી'
      },
      {
        id: 'yearly-gu-4',
        title: 'સામાજિક વિકાસ અને કલ્યાણ કાર્યક્રમો',
        description: 'ગરીબી નાબૂદી, શિક્ષણ પહોંચ, આરોગ્યસંભાળ વિતરણ, મહિલા સશક્તિકરણ અને ગ્રામીણ વિકાસ પહેલોમાં પ્રગતિનું મૂલ્યાંકન.',
        date: 'વર્ષ 2025',
        category: 'સામાજિક મુદ્દાઓ'
      }
    ]
  }
};
