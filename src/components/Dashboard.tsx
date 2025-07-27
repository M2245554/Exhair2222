import React, { useState } from 'react';
import { MapPin, Zap, TrendingUp, Leaf, Activity, Plane, Battery, Settings, AlertCircle, CheckCircle, Clock, BarChart3, ThermometerSun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AirportData {
  id: string;
  name: string;
  code: string;
  location: { lat: number; lng: number };
  aircraft: number;
  powerOutput: number;
  efficiency: number;
  status: 'active' | 'maintenance' | 'offline';
  co2Saved: number;
}

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAirport, setSelectedAirport] = useState<AirportData | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    totalPower: 125.1,
    efficiency: 91.2,
    co2Saved: 187.6,
    connectedAircraft: 53,
    activeDevices: 28,
    totalDevices: 32,
    avgTemperature: 847,
    avgPressure: 2.7
  });

  // Simulate real-time data updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        totalPower: Math.max(120, Math.min(130, prev.totalPower + (Math.random() - 0.5) * 3)),
        efficiency: Math.max(88, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        co2Saved: prev.co2Saved + Math.random() * 0.8,
        connectedAircraft: Math.max(48, Math.min(58, prev.connectedAircraft + Math.floor((Math.random() - 0.5) * 4))),
        activeDevices: Math.max(25, Math.min(32, prev.activeDevices + Math.floor((Math.random() - 0.5) * 2))),
        totalDevices: 32,
        avgTemperature: Math.max(820, Math.min(870, prev.avgTemperature + (Math.random() - 0.5) * 10)),
        avgPressure: Math.max(2.3, Math.min(3.1, prev.avgPressure + (Math.random() - 0.5) * 0.2))
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const airportsData: AirportData[] = [
    {
      id: '1',
      name: 'مطار الملك عبدالعزيز الدولي',
      code: 'JED',
      location: { lat: 21.6796, lng: 39.1567 },
      aircraft: 14,
      powerOutput: 28.5,
      efficiency: 94,
      status: 'active',
      co2Saved: 42.7
    },
    {
      id: '2',
      name: 'مطار الملك خالد الدولي',
      code: 'RUH',
      location: { lat: 24.9576, lng: 46.6988 },
      aircraft: 22,
      powerOutput: 41.2,
      efficiency: 92,
      status: 'active',
      co2Saved: 61.8
    },
    {
      id: '3',
      name: 'مطار الأمير محمد بن عبدالعزيز',
      code: 'MED',
      location: { lat: 24.5535, lng: 39.7050 },
      aircraft: 6,
      powerOutput: 19.6,
      efficiency: 88,
      status: 'maintenance',
      co2Saved: 29.4
    },
    {
      id: '4',
      name: 'مطار الدمام الدولي',
      code: 'DMM',
      location: { lat: 26.4712, lng: 49.7978 },
      aircraft: 11,
      powerOutput: 35.8,
      efficiency: 91,
      status: 'active',
      co2Saved: 53.7
    }
  ];

  // EXHAIR devices data for each airport
  const deviceData = {
    '1': { devices: 8, aircraft: 14, avgPowerPerDevice: 3.6 },
    '2': { devices: 12, aircraft: 22, avgPowerPerDevice: 3.4 },
    '3': { devices: 6, aircraft: 6, avgPowerPerDevice: 3.3 },
    '4': { devices: 10, aircraft: 11, avgPowerPerDevice: 3.6 }
  };

  const totalPower = airportsData.reduce((sum, airport) => sum + airport.powerOutput, 0);
  const totalAircraft = airportsData.reduce((sum, airport) => sum + airport.aircraft, 0);
  const totalCO2Saved = airportsData.reduce((sum, airport) => sum + airport.co2Saved, 0);
  const avgEfficiency = airportsData.reduce((sum, airport) => sum + airport.efficiency, 0) / airportsData.length;
  const activeAirports = airportsData.filter(airport => airport.status === 'active').length;
  const totalDevices = Object.values(deviceData).reduce((sum, data) => sum + data.devices, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('dashboard.active');
      case 'maintenance': return t('dashboard.maintenance');
      case 'offline': return t('dashboard.offline');
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">{t('dashboard.title')}</h1>
          <p className="text-gray-600 text-lg animate-fade-in-delay">{t('dashboard.overview')}</p>
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse mt-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">البيانات المباشرة</span>
            </div>
            <div className="text-sm text-gray-500">
              آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.totalPower')}</p>
                <p className="text-2xl font-bold text-blue-600 animate-pulse">{realTimeData.totalPower.toFixed(1)} kW</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.3% من الأمس
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full animate-pulse">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.efficiency')}</p>
                <p className="text-2xl font-bold text-green-600 animate-pulse">{realTimeData.efficiency.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.8% من الأمس
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full animate-pulse">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.co2Saved')}</p>
                <p className="text-2xl font-bold text-emerald-600 animate-pulse">{realTimeData.co2Saved.toFixed(1)} kg</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5.2% من الأمس
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full animate-pulse">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.connectedAircraft')}</p>
                <p className="text-2xl font-bold text-purple-600 animate-pulse">{realTimeData.connectedAircraft}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3 من الأمس
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full animate-pulse">
                <Plane className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">أجهزة EXHAIR</p>
                <p className="text-2xl font-bold text-orange-600">{realTimeData.activeDevices}/{realTimeData.totalDevices}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {Math.round((realTimeData.activeDevices/realTimeData.totalDevices)*100)}% نشط
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">متوسط الحرارة</p>
                <p className="text-2xl font-bold text-red-600 animate-pulse">{realTimeData.avgTemperature}°C</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ThermometerSun className="w-3 h-3 mr-1" />
                  ضغط: {realTimeData.avgPressure.toFixed(1)} bar
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full animate-pulse">
                <ThermometerSun className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Energy Flow Visualization */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
            تدفق الطاقة المباشر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-red-600">حرارة</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">التقاط الحرارة من العادم</p>
              <p className="text-lg font-bold text-red-600">{realTimeData.avgTemperature}°C</p>
              <p className="text-xs text-gray-500 mt-1">{realTimeData.activeDevices} جهاز نشط</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">ضغط</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">تحويل ضغط العادم</p>
              <p className="text-lg font-bold text-blue-600">{realTimeData.avgPressure.toFixed(1)} bar</p>
              <p className="text-xs text-gray-500 mt-1">توربينات صغيرة</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">كهرباء</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">الطاقة المولدة</p>
              <p className="text-lg font-bold text-green-600">{realTimeData.totalPower.toFixed(1)} kW</p>
              <p className="text-xs text-gray-500 mt-1">مولدات حرارية</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-yellow-600">توزيع</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">توزيع الطاقة</p>
              <p className="text-lg font-bold text-yellow-600">{realTimeData.efficiency.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">كفاءة النظام</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.realtimeMap')}</h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 p-4 relative overflow-hidden border-2 border-blue-100">
              {/* Saudi Arabia Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-20"></div>
              
              {/* Map Grid Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gray-300 opacity-30"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 opacity-30"></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gray-300 opacity-30"></div>
                <div className="absolute top-1/4 left-0 w-full h-px bg-gray-300 opacity-30"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 opacity-30"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-gray-300 opacity-30"></div>
              </div>
              
              {/* Airport Markers */}
              {airportsData.map((airport) => (
                <div
                  key={airport.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${((airport.location.lng - 34) / (55 - 34)) * 100}%`,
                    top: `${((26 - airport.location.lat) / (26 - 16)) * 100}%`,
                  }}
                  onClick={() => setSelectedAirport(airport)}
                >
                  {/* Airport Building Icon */}
                  <div className="absolute -top-12 -left-8 w-16 h-8 bg-gray-400 rounded-t opacity-70 shadow-lg">
                    <div className="absolute top-0 left-2 w-2 h-5 bg-gray-600 rounded-t"></div>
                    <div className="absolute top-0 left-6 w-2 h-4 bg-gray-600 rounded-t"></div>
                    <div className="absolute top-0 left-10 w-2 h-6 bg-gray-600 rounded-t"></div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 font-bold">
                      Terminal
                    </div>
                  </div>
                  
                  {/* Enhanced Aircraft Icons */}
                  <div className="absolute -top-6 -left-12 flex space-x-2">
                    {Array.from({ length: Math.min(airport.aircraft, 4) }).map((_, i) => (
                      <div key={i} className="relative" style={{
                        transform: `rotate(${i * 10}deg)`,
                        animationDelay: `${i * 0.2}s`
                      }}>
                        {/* Aircraft Body */}
                        <div className="w-4 h-1.5 bg-white rounded-full shadow-md relative">
                          {/* Wings */}
                          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-0.5 bg-gray-300 rounded"></div>
                          <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-1 h-0.5 bg-gray-300 rounded"></div>
                          {/* Tail */}
                          <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-white rounded-t"></div>
                        </div>
                        
                        {/* Aircraft Count Badge */}
                        {i === 0 && airport.aircraft > 4 && (
                          <div className="absolute -top-2 -right-1 bg-blue-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold">
                            {airport.aircraft}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced EXHAIR System Indicator */}
                  <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg cursor-pointer hover:scale-125 transition-all duration-300 ${
                    airport.status === 'active' ? 'bg-green-500' : 
                    airport.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  } relative`}>
                    {/* Energy Flow Animation */}
                    {airport.status === 'active' && (
                      <>
                        <div className="absolute inset-1 bg-white rounded-full opacity-30 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                      </>
                    )}
                    
                    {/* Pulsing Ring */}
                    <div className={`w-16 h-16 rounded-full absolute -top-4 -left-4 animate-ping opacity-40 ${
                      airport.status === 'active' ? 'bg-green-500' : 
                      airport.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    
                    {/* Enhanced Power Output Indicator */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                      <div className="font-bold">{airport.powerOutput} kW</div>
                      <div className="text-xs opacity-80">{deviceData[airport.id]?.devices || 0} أجهزة</div>
                    </div>
                  </div>
                  
                  {/* Enhanced Airport Code and Info */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap border-2 border-blue-200">
                    <div className="text-blue-600 text-sm">{airport.code}</div>
                    <div className="text-gray-600 text-xs">{airport.aircraft} طائرة</div>
                    <div className="text-green-600 text-xs">{deviceData[airport.id]?.devices || 0} EXHAIR</div>
                  </div>
                  
                  {/* Enhanced Energy Flow Lines */}
                  {airport.status === 'active' && (
                    <>
                      <div className="absolute top-4 left-4 w-24 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-transparent animate-pulse opacity-70 rounded"></div>
                      <div className="absolute top-6 left-6 w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent animate-pulse opacity-50 rounded" style={{animationDelay: '0.5s'}}></div>
                    </>
                  )}
                  
                  {/* EXHAIR Devices Underground Visualization */}
                  {airport.status === 'active' && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(deviceData[airport.id]?.devices || 0, 6) }).map((_, i) => (
                          <div key={i} className={`w-1 h-2 rounded-t ${
                            i < (deviceData[airport.id]?.devices || 0) ? 'bg-green-400' : 'bg-gray-300'
                          } animate-pulse`} style={{animationDelay: `${i * 0.1}s`}}></div>
                        ))}
                      </div>
                      <div className="text-xs text-center text-gray-600 mt-1">
                        أجهزة EXHAIR
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Energy Grid Visualization */}
              <div className="absolute inset-0 pointer-events-none">
                {airportsData.filter(a => a.status === 'active').map((airport, index) => (
                  <div key={`energy-${airport.id}`} className="absolute" style={{
                    left: `${((airport.location.lng - 34) / (55 - 34)) * 100}%`,
                    top: `${((26 - airport.location.lat) / (26 - 16)) * 100}%`,
                  }}>
                    {/* Energy Particles */}
                    <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-70" style={{
                      animationDelay: `${index * 0.5}s`
                    }}></div>
                    <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-50" style={{
                      animationDelay: `${index * 0.3}s`,
                      left: '10px',
                      top: '5px'
                    }}></div>
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60" style={{
                      animationDelay: `${index * 0.7}s`,
                      left: '15px',
                      top: '8px'
                    }}></div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-xs">
                <div className="text-sm font-medium text-gray-900 mb-2">الحالة</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{t('dashboard.active')}</span>
                    <span className="text-gray-500">({airportsData.filter(a => a.status === 'active').length})</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>{t('dashboard.maintenance')}</span>
                    <span className="text-gray-500">({airportsData.filter(a => a.status === 'maintenance').length})</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>{t('dashboard.offline')}</span>
                    <span className="text-gray-500">({airportsData.filter(a => a.status === 'offline').length})</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200 space-y-1">
                  <div className="text-xs text-gray-600">إجمالي الطاقة المولدة</div>
                  <div className="text-sm font-bold text-green-600">{realTimeData.totalPower.toFixed(1)} kW</div>
                  <div className="text-xs text-gray-600">أجهزة EXHAIR النشطة</div>
                  <div className="text-sm font-bold text-blue-600">{realTimeData.activeDevices}/{realTimeData.totalDevices}</div>
                  <div className="text-xs text-gray-600">متوسط الحرارة</div>
                  <div className="text-sm font-bold text-red-600">{realTimeData.avgTemperature}°C</div>
                </div>
              </div>
              
              {/* Real-time Update Indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-700">تحديث مباشر</span>
                <span className="text-xs text-gray-500">كل 1.5 ثانية</span>
              </div>
            </div>
          </div>

          {/* Airport Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.airportDetails')}</h2>
            
            {selectedAirport ? (
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedAirport.name}</h3>
                  <p className="text-gray-600">{selectedAirport.code}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                    {selectedAirport.status === 'active' ? <CheckCircle className="w-4 h-4 text-green-600" /> : 
                     selectedAirport.status === 'maintenance' ? <Clock className="w-4 h-4 text-yellow-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAirport.status)}`}>
                    {getStatusText(selectedAirport.status)}
                  </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('dashboard.aircraft')}</span>
                    <span className="font-medium">{selectedAirport.aircraft}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">أجهزة EXHAIR</span>
                    <span className="font-medium">{deviceData[selectedAirport.id]?.devices || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">متوسط الطاقة/جهاز</span>
                    <span className="font-medium">{deviceData[selectedAirport.id]?.avgPowerPerDevice.toFixed(1) || 0} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('dashboard.powerOutput')}</span>
                    <span className="font-medium">{selectedAirport.powerOutput} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('dashboard.efficiency')}</span>
                    <span className="font-medium">{selectedAirport.efficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('dashboard.co2Saved')}</span>
                    <span className="font-medium">{selectedAirport.co2Saved} kg</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">كفاءة الطاقة</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000 animate-pulse"
                      style={{ width: `${selectedAirport.efficiency}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Device Status Breakdown */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">حالة الأجهزة</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 p-2 rounded text-center">
                      <div className="text-lg font-bold text-green-600">{deviceData[selectedAirport.id]?.devices || 0}</div>
                      <div className="text-xs text-gray-600">أجهزة نشطة</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="text-lg font-bold text-blue-600">{selectedAirport.aircraft}</div>
                      <div className="text-xs text-gray-600">طائرات متصلة</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-bounce" />
                <p>انقر على أي مطار في الخريطة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        </div>

        {/* Airports List */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.activeAirports')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-900">المطار</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">أجهزة EXHAIR</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">{t('dashboard.aircraft')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">{t('dashboard.powerOutput')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">{t('dashboard.efficiency')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">{t('dashboard.status')}</th>
                </tr>
              </thead>
              <tbody>
                {airportsData.map((airport) => (
                  <tr key={airport.id} className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200 hover:scale-[1.02] hover:shadow-sm" onClick={() => setSelectedAirport(airport)}>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{airport.name}</div>
                        <div className="text-sm text-gray-600">{airport.code}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-gray-900 font-medium">{deviceData[airport.id]?.devices || 0}</span>
                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(deviceData[airport.id]?.devices || 0, 5) }).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{airport.aircraft}</td>
                    <td className="py-4 px-4 text-gray-900">{airport.powerOutput} kW</td>
                    <td className="py-4 px-4 text-gray-900">{airport.efficiency}%</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {airport.status === 'active' ? <CheckCircle className="w-4 h-4 text-green-600" /> : 
                         airport.status === 'maintenance' ? <Clock className="w-4 h-4 text-yellow-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(airport.status)}`}>
                        {getStatusText(airport.status)}
                      </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> {/* Electricity Usage Section */}
<div className="mt-8 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
  <h2 className="text-xl font-bold text-gray-900 mb-4">استخدامات الطاقة المستخرجة</h2>
  <p className="text-gray-700 text-sm mb-4">
    الطاقة الكهربائية الناتجة من أنظمة EXHAIR تُستخدم بشكل مباشر في تحسين كفاءة تشغيل المطار ودعم البنية التحتية.
  </p>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800 list-disc list-inside">
    <li>تشغيل معدات الخدمات الأرضية (GSE) بدون الحاجة لمحركات الديزل</li>
    <li>توفير تكييف وتبريد للطائرات المتوقفة</li>
    <li>شحن المركبات الكهربائية داخل نطاق المطار</li>
    <li>دعم شبكة الكهرباء الداخلية في المطار</li>
    <li>تشغيل أنظمة الإنارة والطوارئ</li>
    <li>تقليل الاعتماد على الشبكة العامة وتقليل التكاليف التشغيلية</li>
  </ul>
  );
};

export default Dashboard;