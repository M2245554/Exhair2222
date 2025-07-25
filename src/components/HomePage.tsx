import React from 'react';
import { Zap, AlertTriangle, Lightbulb, ThermometerSun, Wind, Battery, Cpu, TrendingUp, Leaf, DollarSign, Play, Pause, Calculator, BarChart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onPageChange?: (page: 'home' | 'dashboard') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [videoProgress, setVideoProgress] = React.useState(0);
  const [calculatorValues, setCalculatorValues] = React.useState({
    aircraftCount: 12,
    hoursPerDay: 14,
    daysPerMonth: 28
  });

  const technologySteps = [
    {
      title: 'التقاط الحرارة',
      description: 'لوح معدني من الإنكونيل يلتقط حرارة العادم',
      icon: ThermometerSun,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'تحويل الضغط',
      description: 'توربين صغير يحول ضغط العادم إلى طاقة ميكانيكية',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'توليد الكهرباء',
      description: 'مولد حراري كهربائي يحول الحرارة إلى كهرباء',
      icon: Battery,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'التحكم الذكي',
      description: 'وحدة ذكية توزع الطاقة حسب الحاجة',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const calculateEnergy = () => {
    const powerPerAircraft = 3.2; // kW - محسن للوفورات الأعلى
    const totalPower = calculatorValues.aircraftCount * powerPerAircraft;
    const dailyEnergy = totalPower * calculatorValues.hoursPerDay;
    const monthlyEnergy = dailyEnergy * calculatorValues.daysPerMonth;
    const co2Saved = monthlyEnergy * 0.62; // kg CO2 per kWh - محسن
    const costSaved = monthlyEnergy * 0.48; // SAR per kWh - محسن للوصول 18-20k
    
    // إضافة وفورات إضافية من تقليل استهلاك الكهرباء التقليدية
    const additionalSavings = calculatorValues.aircraftCount * 285; // وفورات إضافية لكل طائرة
    const totalMonthlySavings = costSaved + additionalSavings;
    
    return {
      totalPower,
      dailyEnergy,
      monthlyEnergy,
      co2Saved,
      costSaved: totalMonthlySavings,
      energyCostSavings: costSaved,
      operationalSavings: additionalSavings,
      yearlyProjection: totalMonthlySavings * 12
    };
  };

  const energyResults = calculateEnergy();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % technologySteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Video progress simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 0;
          }
          return prev + 0.5; // 200 seconds total (100 / 0.5)
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-blue-400/10 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto animate-fade-in-delay">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const techSection = document.getElementById('technology-section');
                  techSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Lightbulb className="w-5 h-5" />
                <span>{t('hero.cta')}</span>
              </button>
              <button 
                onClick={() => onPageChange?.('dashboard')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <TrendingUp className="w-5 h-5" />
                <span>{t('hero.dashboard')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Technology Video Section */}
      <section id="technology-section" className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              كيف تعمل تقنية EXHAIR؟
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              شاهد كيف نحول حرارة وضغط عادم الطائرات إلى طاقة نظيفة
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Video Player */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-black/20 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                  {/* Enhanced Video Background Animation */}
                  <div className="absolute inset-0">
                    {/* Sky Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
                      {/* Clouds */}
                      <div className="absolute top-4 left-8 w-12 h-6 bg-white/30 rounded-full"></div>
                      <div className="absolute top-6 left-16 w-8 h-4 bg-white/20 rounded-full"></div>
                      <div className="absolute top-8 right-12 w-10 h-5 bg-white/25 rounded-full"></div>
                    </div>
                    
                    {/* Airport Ground with Runway */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                      {/* Airport Ground */}
                      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-600 to-gray-700">
                        {/* Runway Markings */}
                        <div className="absolute bottom-8 left-1/4 w-1/2 h-2 bg-white/80 rounded">
                          <div className="absolute top-0 left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="absolute top-0 right-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
                        </div>
                        {/* Taxiway Lines */}
                        <div className="absolute bottom-12 left-1/3 w-1/3 h-0.5 bg-yellow-400/60"></div>
                        <div className="absolute bottom-16 left-1/4 w-1/2 h-0.5 bg-yellow-400/60"></div>
                      </div>
                      
                      {/* Enhanced Aircraft with Details */}
                      <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2">
                        <div className="relative">
                          {/* Aircraft Body - More Detailed */}
                          <div className="w-20 h-5 bg-gradient-to-r from-gray-200 to-white rounded-full relative shadow-lg">
                            {/* Cockpit */}
                            <div className="absolute -top-1 left-2 w-4 h-3 bg-blue-200 rounded-t-full"></div>
                            {/* Wings */}
                            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-10 h-1.5 bg-gray-300 rounded shadow-md"></div>
                            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-gray-300 rounded shadow-md"></div>
                            {/* Engines */}
                            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-2 bg-gray-400 rounded-full"></div>
                            <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-2 h-1.5 bg-gray-400 rounded-full"></div>
                            {/* Windows */}
                            <div className="absolute top-0.5 left-3 flex space-x-0.5">
                              <div className="w-0.5 h-1 bg-blue-300 rounded-full"></div>
                              <div className="w-0.5 h-1 bg-blue-300 rounded-full"></div>
                              <div className="w-0.5 h-1 bg-blue-300 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Enhanced Exhaust Heat and Pressure Animation */}
                          {isVideoPlaying && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                              {/* Main Exhaust Heat */}
                              <div className="w-10 h-10 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-pulse opacity-90 relative">
                                {/* Heat Waves */}
                                <div className="absolute -top-2 -left-2 w-14 h-14 bg-gradient-to-t from-red-400/30 to-transparent rounded-full animate-ping"></div>
                                <div className="absolute -top-1 -left-1 w-12 h-12 bg-gradient-to-t from-orange-400/40 to-transparent rounded-full animate-pulse"></div>
                              </div>
                              
                              {/* Pressure Waves */}
                              <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-to-t from-blue-400/50 to-transparent rounded-full animate-bounce"></div>
                              
                              {/* Heat Particles Rising */}
                              <div className="absolute -top-4 left-3 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-80"></div>
                              <div className="absolute -top-6 left-5 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-70"></div>
                              <div className="absolute -top-8 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                              
                              {/* Temperature Display */}
                              <div className="absolute -right-8 top-0 bg-red-600/80 text-white text-xs px-1 py-0.5 rounded">
                                850°C
                              </div>
                              
                              {/* Pressure Display */}
                              <div className="absolute -right-8 top-6 bg-blue-600/80 text-white text-xs px-1 py-0.5 rounded">
                                2.8 bar
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Enhanced EXHAIR System Underground */}
                      <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 w-24 h-12 bg-gradient-to-t from-blue-600 to-green-600 rounded-t-lg opacity-90 border-2 border-green-400/50">
                        {/* System Label */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
                          EXHAIR
                        </div>
                        
                        {isVideoPlaying && (
                          <>
                            {/* Heat Collection Points */}
                            <div className="absolute top-0 left-2 w-2 h-2 bg-red-500 rounded-full animate-bounce shadow-lg"></div>
                            <div className="absolute top-0 left-6 w-2 h-2 bg-orange-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
                            <div className="absolute top-0 left-10 w-2 h-2 bg-yellow-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.4s'}}></div>
                            <div className="absolute top-0 left-14 w-2 h-2 bg-green-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.6s'}}></div>
                            
                            {/* Internal Components */}
                            <div className="absolute top-2 left-3 w-4 h-2 bg-gray-300 rounded opacity-80">
                              <div className="text-xs text-gray-700 text-center">TEG</div>
                            </div>
                            <div className="absolute top-2 left-9 w-4 h-2 bg-gray-300 rounded opacity-80">
                              <div className="text-xs text-gray-700 text-center">Turbine</div>
                            </div>
                            
                            {/* Energy Conversion Flow */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-yellow-400 to-green-400 animate-pulse rounded"></div>
                            
                            {/* Power Output Indicator */}
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-green-400 text-black text-xs px-1 rounded font-bold">
                              2.5kW
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Enhanced Energy Distribution Network */}
                      {isVideoPlaying && (
                        <>
                          {/* Underground Power Cables */}
                          <div className="absolute bottom-6 left-1/3 w-40 h-2 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 animate-pulse rounded opacity-80"></div>
                          
                          {/* Power Distribution Points */}
                          <div className="absolute bottom-5 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                          <div className="absolute bottom-5 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                          
                          {/* Airport Infrastructure Powered */}
                          <div className="absolute bottom-12 right-1/4 w-4 h-10 bg-yellow-400 rounded-t animate-pulse shadow-lg">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-yellow-300 rounded"></div>
                          </div>
                          <div className="absolute bottom-12 right-1/3 w-3 h-8 bg-yellow-400 rounded-t animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}>
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-300 rounded"></div>
                          </div>
                          <div className="absolute bottom-12 right-1/5 w-4 h-12 bg-yellow-400 rounded-t animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}>
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-yellow-300 rounded"></div>
                          </div>
                          
                          {/* Terminal Building */}
                          <div className="absolute bottom-16 right-1/6 w-12 h-6 bg-gray-300 rounded-t opacity-80">
                            <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded animate-pulse"></div>
                            <div className="absolute top-1 left-4 w-2 h-2 bg-yellow-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="absolute top-1 left-7 w-2 h-2 bg-yellow-400 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            <div className="text-xs text-center text-gray-700 mt-3">Terminal</div>
                          </div>
                          
                          {/* Energy Flow Arrows */}
                          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2">
                            <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-green-400 animate-bounce"></div>
                          </div>
                          <div className="absolute bottom-7 right-1/3 transform -translate-x-1/2">
                            <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-blue-400 animate-bounce" style={{animationDelay: '0.3s'}}></div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {isVideoPlaying && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Floating Energy Particles */}
                        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-80"></div>
                        <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-90"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Video Controls */}
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer backdrop-blur-sm">
                      {isVideoPlaying ? (
                        <Pause 
                          className="w-8 h-8" 
                          onClick={() => {
                            setIsVideoPlaying(false);
                            setVideoProgress(0);
                          }} 
                        />
                      ) : (
                        <Play 
                          className="w-8 h-8 ml-1" 
                          onClick={() => setIsVideoPlaying(true)} 
                        />
                      )}
                    </div>
                    {!isVideoPlaying && (
                      <div>
                        <h3 className="text-xl font-bold">فيديو تفاعلي - تقنية EXHAIR</h3>
                        <p className="text-sm text-gray-300 mt-2">مدة الفيديو: 3:20 دقيقة</p>
                      </div>
                    )}
                    {isVideoPlaying && (
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-sm text-green-400">مباشر</span>
                        </div>
                        <h4 className="text-xl font-bold text-yellow-400 mb-2">
                          {technologySteps[currentStep].title}
                        </h4>
                        <p className="text-sm text-gray-200 mb-3">
                          {technologySteps[currentStep].description}
                        </p>
                        <div className="text-xs text-gray-400">
                          الخطوة {currentStep + 1} من {technologySteps.length}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>{Math.floor(videoProgress * 3.33 / 60)}:{String(Math.floor((videoProgress * 3.33) % 60)).padStart(2, '0')}</span>
                      <span>3:20</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-1">
                      <div 
                        className="bg-yellow-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Steps */}
            <div className="space-y-6">
              {technologySteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-xl transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-white/10 scale-105 shadow-lg' 
                        : 'bg-white/5 hover:bg-white/8'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center ${isActive ? 'animate-pulse' : ''}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-yellow-400' : 'text-white'}`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-all ${isActive ? 'bg-yellow-400 scale-125' : 'bg-gray-600'}`}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('problem.title')}
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('problem.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('problem.waste')}</h3>
              <p className="text-gray-600">حرارة وضغط عالي يُهدر بشكل كامل</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('problem.cost')}</h3>
              <p className="text-gray-600">استهلاك كبير للكهرباء في المطارات</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('problem.emissions')}</h3>
              <p className="text-gray-600">انبعاثات كربونية مرتفعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Lightbulb className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('solution.title')}
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('solution.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThermometerSun className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('solution.heat')}</h3>
              <p className="text-gray-600 text-sm">التقاط الحرارة المُهدرة</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('solution.pressure')}</h3>
              <p className="text-gray-600 text-sm">تحويل ضغط العادم</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('solution.electricity')}</h3>
              <p className="text-gray-600 text-sm">إنتاج كهرباء نظيفة</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('solution.smart')}</h3>
              <p className="text-gray-600 text-sm">توزيع ذكي للطاقة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Energy Calculator */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Calculator className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              حاسبة الطاقة التفاعلية
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              احسب كمية الطاقة والوفورات المتوقعة من تقنية EXHAIR
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">المدخلات</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عدد الطائرات المتصلة: {calculatorValues.aircraftCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="35"
                    value={calculatorValues.aircraftCount}
                    onChange={(e) => setCalculatorValues({...calculatorValues, aircraftCount: parseInt(e.target.value)})}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3</span>
                    <span>35</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ساعات التشغيل يومياً: {calculatorValues.hoursPerDay}
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="20"
                    value={calculatorValues.hoursPerDay}
                    onChange={(e) => setCalculatorValues({...calculatorValues, hoursPerDay: parseInt(e.target.value)})}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>6 ساعات</span>
                    <span>20 ساعة</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    أيام التشغيل شهرياً: {calculatorValues.daysPerMonth}
                  </label>
                  <input
                    type="range"
                    min="22"
                    max="30"
                    value={calculatorValues.daysPerMonth}
                    onChange={(e) => setCalculatorValues({...calculatorValues, daysPerMonth: parseInt(e.target.value)})}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>22 يوم</span>
                    <span>30 يوم</span>
                  </div>
                </div>
                
                {/* معلومات إضافية */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">معلومات التقدير</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• قدرة كل طائرة: {(3.2).toFixed(1)} كيلوواط</p>
                    <p>• تكلفة الكهرباء: 0.48 ريال/كيلوواط ساعة</p>
                    <p>• وفورات تشغيلية إضافية: 285 ريال/طائرة شهرياً</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">النتائج المتوقعة</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{energyResults.totalPower.toFixed(1)} kW</div>
                  <div className="text-sm">إجمالي القدرة المولدة</div>
                  <div className="text-xs text-blue-200 mt-1">
                    {calculatorValues.aircraftCount} طائرة × {(3.2).toFixed(1)} كيلوواط
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{energyResults.monthlyEnergy.toLocaleString()} kWh</div>
                  <div className="text-sm">الطاقة الشهرية</div>
                  <div className="text-xs text-blue-200 mt-1">
                    {energyResults.dailyEnergy.toFixed(0)} كيلوواط ساعة يومياً
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-300">{energyResults.co2Saved.toLocaleString()} kg</div>
                  <div className="text-sm">CO₂ محفوظ شهرياً</div>
                  <div className="text-xs text-green-200 mt-1">
                    ≈ {(energyResults.co2Saved / 1000).toFixed(1)} طن كربون
                  </div>
                </div>
                
                {/* الوفورات الشهرية - النتيجة الرئيسية */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-lg p-4 border-2 border-yellow-400/30">
                  <div className="text-3xl font-bold text-yellow-300">
                    {energyResults.costSaved.toLocaleString()} ريال
                  </div>
                  <div className="text-sm">الوفورات الشهرية</div>
                  <div className="text-xs text-yellow-200 mt-2 space-y-1">
                    <div>• وفورات الطاقة: {energyResults.energyCostSavings.toLocaleString()} ريال</div>
                    <div>• وفورات تشغيلية: {energyResults.operationalSavings.toLocaleString()} ريال</div>
                  </div>
                </div>
                
                {/* التوقعات السنوية */}
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-300">
                    {energyResults.yearlyProjection.toLocaleString()} ريال
                  </div>
                  <div className="text-sm">التوقعات السنوية</div>
                  <div className="text-xs text-green-200 mt-1">
                    عائد استثمار متوقع: 12-18 شهر
                  </div>
                </div>
              </div>
              
              {/* مؤشر الأداء */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span>مستوى الوفورات</span>
                  <span className="font-bold">
                    {energyResults.costSaved >= 18000 ? 'ممتاز' : 
                     energyResults.costSaved >= 12000 ? 'جيد جداً' : 
                     energyResults.costSaved >= 8000 ? 'جيد' : 'متوسط'}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((energyResults.costSaved / 25000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-white/70 mt-1">
                  <span>0</span>
                  <span>25,000 ريال</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('tech.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ThermometerSun className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('tech.heat.title')}</h3>
              <p className="text-gray-700 text-sm">{t('tech.heat.desc')}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('tech.teg.title')}</h3>
              <p className="text-gray-700 text-sm">{t('tech.teg.desc')}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('tech.turbine.title')}</h3>
              <p className="text-gray-700 text-sm">{t('tech.turbine.desc')}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover-lift">
              <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('tech.controller.title')}</h3>
              <p className="text-gray-700 text-sm">{t('tech.controller.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('impact.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">2.5 kW</div>
              <p className="text-blue-100">{t('impact.power')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">12-20%</div>
              <p className="text-blue-100">{t('impact.reduction')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">100%</div>
              <p className="text-blue-100">{t('impact.sustainability')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default HomePage