import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.about': 'حول المشروع',
    'nav.contact': 'اتصل بنا',
    
    // Hero Section
    'hero.title': 'EXHAIR - طاقة نظيفة من حرارة الطائرات',
    'hero.subtitle': 'نظام ذكي يحول حرارة وضغط عادم الطائرات إلى كهرباء مستدامة',
    'hero.cta': 'استكشف التقنية',
    'hero.dashboard': 'لوحة التحكم',
    
    // Problem Section
    'problem.title': 'المشكلة',
    'problem.desc': 'في ساحات انتظار الطائرات، تستمر المحركات أو وحدات الطاقة المساعدة بالعمل قبل الإقلاع وبعد الهبوط، مولّدة حرارة عالية وضغط عادم قوي يتم هدره تمامًا',
    'problem.waste': 'هدر الطاقة',
    'problem.cost': 'تكاليف عالية',
    'problem.emissions': 'انبعاثات كربونية',
    
    // Solution Section
    'solution.title': 'الحل المبتكر',
    'solution.desc': 'EXHAIR هو نظام ذكي يتم دمجه في جدران أو أرضيات ساحة انتظار الطائرات، بحيث يلتقط حرارة وضغط عادم الطائرة ويحولها إلى كهرباء',
    'solution.heat': 'التقاط الحرارة',
    'solution.pressure': 'تحويل الضغط',
    'solution.electricity': 'توليد الكهرباء',
    'solution.smart': 'إدارة ذكية',
    
    // Technologies
    'tech.title': 'التقنيات المستخدمة',
    'tech.heat.title': 'لوح التقاط الحرارة',
    'tech.heat.desc': 'لوح معدني ناقل للحرارة من الإنكونيل',
    'tech.teg.title': 'مولد حراري كهربائي',
    'tech.teg.desc': 'يحول فرق الحرارة إلى كهرباء مباشرة',
    'tech.turbine.title': 'توربين ضغط صغير',
    'tech.turbine.desc': 'يولد كهرباء من تدفق العادم',
    'tech.controller.title': 'وحدة التحكم الذكية',
    'tech.controller.desc': 'تدير الطاقة وتوجهها للإنارة أو الشحن',
    
    // Impact
    'impact.title': 'الأثر المتوقع',
    'impact.power': 'توليد حتى 2.5 كيلوواط لكل طائرة واقفة',
    'impact.reduction': 'خفض استهلاك الكهرباء بنسبة 12-20%',
    'impact.sustainability': 'تعزيز استدامة المطار دون المساس بالسلامة',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة على الطاقة',
    'dashboard.airports': 'المطارات النشطة',
    'dashboard.totalPower': 'إجمالي الطاقة المولدة',
    'dashboard.efficiency': 'كفاءة النظام',
    'dashboard.co2Saved': 'CO₂ المحفوظ',
    'dashboard.activeAirports': 'المطارات النشطة',
    'dashboard.connectedAircraft': 'الطائرات المتصلة',
    'dashboard.energyGeneration': 'توليد الطاقة',
    'dashboard.realtimeMap': 'خريطة الوقت الفعلي',
    'dashboard.airportDetails': 'تفاصيل المطار',
    'dashboard.aircraft': 'الطائرات',
    'dashboard.powerOutput': 'الطاقة المولدة',
    'dashboard.status': 'الحالة',
    'dashboard.active': 'نشط',
    'dashboard.maintenance': 'صيانة',
    'dashboard.offline': 'غير متصل',
    
    // Footer
    'footer.about': 'حول EXHAIR',
    'footer.aboutDesc': 'نظام مبتكر لتحويل حرارة الطائرات إلى طاقة نظيفة ومستدامة',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contact': 'معلومات التواصل',
    'footer.email': 'البريد الإلكتروني',
    'footer.phone': 'الهاتف',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // Common
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'تعلم المزيد',
    'common.viewDetails': 'عرض التفاصيل',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'EXHAIR - Clean Energy from Aircraft Heat',
    'hero.subtitle': 'Smart system that converts aircraft exhaust heat and pressure into sustainable electricity',
    'hero.cta': 'Explore Technology',
    'hero.dashboard': 'Dashboard',
    
    // Problem Section
    'problem.title': 'The Problem',
    'problem.desc': 'In aircraft parking areas (Apron), engines or auxiliary power units (APU) continue operating before takeoff and after landing, generating high heat and strong exhaust pressure that is completely wasted',
    'problem.waste': 'Energy Waste',
    'problem.cost': 'High Costs',
    'problem.emissions': 'Carbon Emissions',
    
    // Solution Section
    'solution.title': 'Innovative Solution',
    'solution.desc': 'EXHAIR is a smart system integrated into airport apron walls or floors that captures aircraft exhaust heat and pressure and converts it into electricity',
    'solution.heat': 'Heat Capture',
    'solution.pressure': 'Pressure Conversion',
    'solution.electricity': 'Electricity Generation',
    'solution.smart': 'Smart Management',
    
    // Technologies
    'tech.title': 'Technologies Used',
    'tech.heat.title': 'Heat Collector Panel',
    'tech.heat.desc': 'Inconel metal heat-conducting panel',
    'tech.teg.title': 'Thermoelectric Generator',
    'tech.teg.desc': 'Converts temperature difference directly to electricity',
    'tech.turbine.title': 'Micro Pressure Turbine',
    'tech.turbine.desc': 'Generates electricity from exhaust flow',
    'tech.controller.title': 'Smart Controller Unit',
    'tech.controller.desc': 'Manages energy and directs it for lighting or charging',
    
    // Impact
    'impact.title': 'Expected Impact',
    'impact.power': 'Generate up to 2.5 kW per parked aircraft',
    'impact.reduction': '12-20% reduction in electricity consumption',
    'impact.sustainability': 'Enhance airport sustainability without compromising safety',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Energy Overview',
    'dashboard.airports': 'Active Airports',
    'dashboard.totalPower': 'Total Power Generated',
    'dashboard.efficiency': 'System Efficiency',
    'dashboard.co2Saved': 'CO₂ Saved',
    'dashboard.activeAirports': 'Active Airports',
    'dashboard.connectedAircraft': 'Connected Aircraft',
    'dashboard.energyGeneration': 'Energy Generation',
    'dashboard.realtimeMap': 'Real-time Map',
    'dashboard.airportDetails': 'Airport Details',
    'dashboard.aircraft': 'Aircraft',
    'dashboard.powerOutput': 'Power Output',
    'dashboard.status': 'Status',
    'dashboard.active': 'Active',
    'dashboard.maintenance': 'Maintenance',
    'dashboard.offline': 'Offline',
    
    // Footer
    'footer.about': 'About EXHAIR',
    'footer.aboutDesc': 'Innovative system for converting aircraft heat into clean, sustainable energy',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Information',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.rights': 'All rights reserved',
    
    // Common
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewDetails': 'View Details',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};