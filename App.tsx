import React, { useState, useEffect } from 'react';
import { Camera, Droplet, Search, Plus, TrendingUp, Award, Info, ChevronRight, X, Upload } from 'lucide-react';

// Definición de tipos para los animales
interface Animal {
  id: string;
  name: string;
  order: string;
  tolerance: number;
  image: string;
  color: string;
  description: string;
  habitat: string;
  bmwp: number;
  abi: number;
  ibf: number;
  isUserAdded?: boolean;
}

// Definición de tipos para la calidad del agua
interface WaterQuality {
  quality: string;
  color: string;
  description: string;
  recommendation: string;
  avgTolerance: string;
  bmwpScore: number;
  familyCount: number;
  hasEPT: boolean;
  biodiversity: string;
}

// Definición de tipos para el nuevo animal
interface NewAnimal {
  name: string;
  family: string;
  description: string;
  tolerance: number;
}

const WaterQualityApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [waterQuality, setWaterQuality] = useState<WaterQuality | null>(null);
  const [animatedBg, setAnimatedBg] = useState(0);
  const [showAnimalDetail, setShowAnimalDetail] = useState<Animal | null>(null);
  const [userAnimals, setUserAnimals] = useState<Animal[]>([]);
  const [newAnimal, setNewAnimal] = useState<NewAnimal>({
    name: '',
    family: '',
    description: '',
    tolerance: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBg((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const baseAnimals: Animal[] = [
    {
      id: 'hyalellidae',
      name: 'Hyalellidae',
      order: 'Amphipoda',
      tolerance: 6,
      image: '🦐',
      color: '#4ECDC4',
      description: 'Pequeño crustáceo anfípodo, blanco o semi-transparente. Tolerante a contaminación. Se alimenta de materia orgánica.',
      habitat: 'Fondos de ríos, entre vegetación',
      bmwp: 6,
      abi: 7,
      ibf: 8,
    },
    {
      id: 'baetidae',
      name: 'Baetidae',
      order: 'Ephemeroptera',
      tolerance: 4,
      image: '🐛',
      color: '#95E1D3',
      description: 'Ninfa de efímera con 3 colitas y branquias ovaladas. Indica aguas ligeramente contaminadas. Común en aguas rápidas.',
      habitat: 'Rocas, troncos, hojas en corrientes rápidas',
      bmwp: 7,
      abi: 4,
      ibf: 5,
    },
    {
      id: 'physidae',
      name: 'Physidae',
      order: 'Gasteropoda',
      tolerance: 3,
      image: '🐌',
      color: '#F38181',
      description: 'Caracol de agua dulce con abertura hacia la izquierda. Tolera cierta contaminación. Se alimenta de algas y detritus.',
      habitat: 'Piedras y vegetación de orilla',
      bmwp: 3,
      abi: 3,
      ibf: 8,
    },
    {
      id: 'tipulidae',
      name: 'Tipulidae',
      order: 'Diptera',
      tolerance: 3,
      image: '🪱',
      color: '#AA96DA',
      description: 'Larva de "mosca de la humedad" con 6+ cachitos en un extremo (coronita). Resiste contaminación. Respira por su coronita.',
      habitat: 'Hojas y troncos podridos',
      bmwp: 5,
      abi: 3,
      ibf: 3,
    },
    {
      id: 'planariidae',
      name: 'Planariidae',
      order: 'Tricladida',
      tolerance: 7,
      image: '🔷',
      color: '#FFB6C1',
      description: 'Organismo plano, pegajoso, marrón u oscuro. Ovalado sin patas. Indica aguas de buena a moderada calidad.',
      habitat: 'Debajo de piedras en aguas lentas',
      bmwp: 7,
      abi: 5,
      ibf: 4,
    },
    {
      id: 'oligochaeta',
      name: 'Oligochaeta',
      order: 'Annelida',
      tolerance: 1,
      image: '🪱',
      color: '#FCBAD3',
      description: 'Lombriz acuática con anillos finos. Sin cabeza visible. En exceso indica alta contaminación. Varios colores.',
      habitat: 'Fondo fangoso con materia orgánica',
      bmwp: 1,
      abi: 1,
      ibf: 8,
    },
    {
      id: 'elmidae',
      name: 'Elmidae',
      order: 'Coleoptera',
      tolerance: 6,
      image: '🪲',
      color: '#FFFACD',
      description: 'Escarabajo acuático con coraza dura segmentada. Tolera contaminación media. Vive adherido o debajo de rocas.',
      habitat: 'Rocas en corrientes',
      bmwp: 6,
      abi: 5,
      ibf: 4,
    },
  ];

  const allAnimals: Animal[] = [...baseAnimals, ...userAnimals];

  const calculateWaterQuality = (animals: Animal[]): WaterQuality | null => {
    if (animals.length === 0) return null;

    const totalTolerance = animals.reduce((sum, animal) => sum + animal.tolerance, 0);
    const avgTolerance = totalTolerance / animals.length;
    const bmwpSum = animals.reduce((sum, animal) => sum + (animal.bmwp || 0), 0);
    const hasEPT = animals.some((a) => ['Ephemeroptera', 'Plecoptera', 'Trichoptera'].includes(a.order));

    let quality, color, description, recommendation;

    if (avgTolerance <= 2) {
      quality = 'Excelente';
      color = '#00C851';
      description = 'Agua muy limpia, sin contaminación';
      recommendation = 'Mantener las condiciones actuales. Excelente ecosistema acuático.';
    } else if (avgTolerance <= 4) {
      quality = 'Buena';
      color = '#4ECDC4';
      description = 'Agua limpia con posible poca contaminación';
      recommendation = 'Monitorear regularmente. Implementar medidas preventivas.';
    } else if (avgTolerance <= 6) {
      quality = 'Moderada';
      color = '#FFD93D';
      description = 'Agua con contaminación moderada';
      recommendation = 'Se requiere atención. Identificar fuentes de contaminación.';
    } else if (avgTolerance <= 8) {
      quality = 'Mala';
      color = '#FF6B6B';
      description = 'Agua muy contaminada';
      recommendation = 'Acción urgente necesaria. Investigar actividades contaminantes.';
    } else {
      quality = 'Crítica';
      color = '#C70039';
      description = 'Agua severamente contaminada';
      recommendation = 'Crisis ecológica. Se requiere intervención inmediata.';
    }

    return {
      quality,
      color,
      description,
      recommendation,
      avgTolerance: avgTolerance.toFixed(1),
      bmwpScore: bmwpSum,
      familyCount: animals.length,
      hasEPT,
      biodiversity: animals.length >= 5 ? 'Alta' : animals.length >= 3 ? 'Media' : 'Baja',
    };
  };

  const handleAnimalSelect = (animal: Animal) => {
    if (selectedAnimals.find((a) => a.id === animal.id)) {
      setSelectedAnimals(selectedAnimals.filter((a) => a.id !== animal.id));
    } else {
      setSelectedAnimals([...selectedAnimals, animal]);
    }
  };

  const handleAnalyze = () => {
    const result = calculateWaterQuality(selectedAnimals);
    setWaterQuality(result);
    setShowResults(true);
  };

  const handleAddAnimal = () => {
    if (newAnimal.name && newAnimal.family) {
      const animal: Animal = {
        id: `user-${Date.now()}`,
        name: newAnimal.name,
        order: newAnimal.family,
        tolerance: parseInt(newAnimal.tolerance.toString(), 10),
        image: '🦋',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        description: newAnimal.description,
        habitat: 'Agregado por usuario',
        bmwp: 10 - parseInt(newAnimal.tolerance.toString(), 10),
        abi: 10 - parseInt(newAnimal.tolerance.toString(), 10),
        ibf: parseInt(newAnimal.tolerance.toString(), 10),
        isUserAdded: true,
      };
      setUserAnimals([...userAnimals, animal]);
      setNewAnimal({ name: '', family: '', description: '', tolerance: 5 });
      alert('✅ Organismo agregado exitosamente');
    } else {
      alert('⚠️ Por favor completa el nombre y la familia del organismo');
    }
  };

  const filteredAnimals = allAnimals.filter((animal) =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.order.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${animatedBg}% 50%, #4ECDC4 0%, transparent 50%),
                       radial-gradient(circle at ${100 - animatedBg}% 80%, #95E1D3 0%, transparent 50%)`,
          transition: 'all 0.5s ease',
        }}
      />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400 opacity-10"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </div>
  );

  const HomeView = () => (
    <div className="relative min-h-screen p-6 flex flex-col">
      <AnimatedBackground />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mb-4">
            <Droplet className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-3">
            AquaLife Monitor
          </h1>
          <p className="text-gray-600 text-lg">Monitoreo Ecológico de Calidad de Agua</p>
        </div>

        <div className="grid gap-4 mb-6">
          <button
            onClick={() => setCurrentView('select')}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">Identificar Organismos</h3>
                  <p className="text-gray-500">Selecciona los MIB encontrados</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>

          <button
            onClick={() => setCurrentView('add')}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-2xl group-hover:bg-green-200 transition-colors">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">Agregar Organismo</h3>
                  <p className="text-gray-500">Registra nuevos MIB</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
          </button>

          <button
            onClick={() => setCurrentView('info')}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-2xl group-hover:bg-purple-200 transition-colors">
                  <Info className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">Información</h3>
                  <p className="text-gray-500">Sobre los bioindicadores</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </button>
        </div>

        <div className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>🌿 Desarrollado para la conservación del agua 🌿</p>
          <p className="mt-1">Basado en protocolos GRUFIDES - Cajamarca, Perú</p>
        </div>
      </div>
    </div>
  );

  const SelectView = () => (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 pb-32">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setCurrentView('home');
              setSearchTerm('');
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Seleccionar Organismos</h2>
          <div className="w-10" />
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o familia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid gap-4 mb-6">
          {filteredAnimals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => handleAnimalSelect(animal)}
              className={`bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedAnimals.find((a) => a.id === animal.id)
                  ? 'ring-4 ring-blue-400 shadow-xl'
                  : 'shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="text-5xl p-3 rounded-2xl"
                  style={{ backgroundColor: animal.color + '20' }}
                >
                  {animal.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{animal.name}</h3>
                    {animal.isUserAdded && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Usuario
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{animal.order}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      Tolerancia: {animal.tolerance}/10
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAnimalDetail(animal);
                      }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAnimals.find((a) => a.id === animal.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnimals.find((a) => a.id === animal.id) && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAnimals.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 max-w-4xl mx-auto z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Organismos seleccionados</p>
                <p className="text-2xl font-bold text-blue-600">{selectedAnimals.length}</p>
              </div>
              <button
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Analizar Calidad 🔬
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AddView = () => (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Agregar Organismo</h2>
          <div className="w-10" />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Organismo *
              </label>
              <input
                type="text"
                value={newAnimal.name}
                onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                placeholder="Ej: Helicopsychidae"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Familia/Orden *
              </label>
              <input
                type="text"
                value={newAnimal.family}
                onChange={(e) => setNewAnimal({ ...newAnimal, family: e.target.value })}
                placeholder="Ej: Trichoptera"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={newAnimal.description}
                onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })}
                placeholder="Características, hábitat, comportamiento..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tolerancia a Contaminación: {newAnimal.tolerance}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newAnimal.tolerance}
                onChange={(e) => setNewAnimal({ ...newAnimal, tolerance: parseInt(e.target.value, 10) })}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00C851 0%, #FFD93D 50%, #FF6B6B 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Sensible (agua limpia)</span>
                <span>Tolerante (contaminación)</span>
              </div>
            </div>

            <button
              onClick={handleAddAnimal}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all mt-6"
            >
              Agregar Organismo ✨
            </button>
          </div>
        </div>

        {userAnimals.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-4">Organismos Agregados ({userAnimals.length})</h3>
            <div className="space-y-2">
              {userAnimals.map((animal) => (
                <div key={animal.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl">{animal.image}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{animal.name}</p>
                    <p className="text-sm text-gray-600">{animal.order}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Tolerancia: {animal.tolerance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const InfoView = () => (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Información</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-3 text-purple-600">
              ¿Qué son los MIB?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Los Macroinvertebrados Bentónicos (MIB) son pequeños animales sin columna vertebral que viven en el fondo de ríos y lagos. Son excelentes indicadores de la calidad del agua porque diferentes especies tienen distintos niveles de tolerancia a la contaminación.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-3 text-blue-600">
              Escala de Tolerancia
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                  1-3
                </div>
                <div>
                  <p className="font-semibold">Muy Sensibles</p>
                  <p className="text-sm text-gray-600">Indican agua muy limpia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-700">
                  4-6
                </div>
                <div>
                  <p className="font-semibold">Moderadamente Tolerantes</p>
                  <p className="text-sm text-gray-600">Agua de calidad media</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">
                  7-10
                </div>
                <div>
                  <p className="font-semibold">Muy Tolerantes</p>
                  <p className="text-sm text-gray-600">Indican contaminación</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-3 text-teal-600">
              Índices Utilizados
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>BMWP/Col:</strong> Biological Monitoring Working Party</p>
              <p><strong>ABI:</strong> Andean Biotic Index</p>
              <p><strong>IBF:</strong> Índice Biótico de Familias</p>
              <p><strong>EPT:</strong> Ephemeroptera, Plecoptera, Trichoptera (familias sensibles)</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-xl mb-2">
              🌍 Contribuye a la Ciencia Ciudadana
            </h3>
            <p className="text-sm opacity-90">
              Cada organismo que registras ayuda a crear una base de datos más completa para el monitoreo ambiental de los ríos en Cajamarca y el mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsView = () => (
    <div className="relative min-h-screen p-6 pb-32" style={{ backgroundColor: waterQuality?.color + '10' || '#ffffff10' }}>
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="inline-block p-6 rounded-full mb-4 animate-bounce"
            style={{ backgroundColor: waterQuality?.color + '30' || '#ffffff30' }}
          >
            <Award className="w-16 h-16" style={{ color: waterQuality?.color || '#000000' }} />
          </div>
          <h2 className="text-4xl font-bold mb-2" style={{ color: waterQuality?.color || '#000000' }}>
            Calidad: {waterQuality?.quality || 'Sin datos'}
          </h2>
          <p className="text-xl text-gray-600">{waterQuality?.description || 'No se ha analizado la calidad del agua'}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Métricas de Análisis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: waterQuality?.color || '#000000' }}>
                  {waterQuality?.avgTolerance || '0.0'}
                </p>
                <p className="text-sm text-gray-600 mt-1">Tolerancia Promedio</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {waterQuality?.familyCount || 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Familias Detectadas</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {waterQuality?.bmwpScore || 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Puntaje BMWP</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {waterQuality?.biodiversity || 'Baja'}
                </p>
                <p className="text-sm text-gray-600 mt-1">Biodiversidad</p>
              </div>
            </div>
          </div>

          {waterQuality?.hasEPT && (
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl p-6 shadow-xl text-white">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                ✨ Indicador Positivo Detectado
              </h3>
              <p className="text-sm opacity-90">
                Se encontraron organismos EPT (Ephemeroptera, Plecoptera o Trichoptera), 
                familias altamente sensibles que indican buena calidad del agua.
              </p>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-3">Organismos Identificados</h3>
            <div className="space-y-3">
              {selectedAnimals.map((animal, index) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="text-3xl p-2 rounded-xl"
                    style={{ backgroundColor: animal.color + '30' }}
                  >
                    {animal.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{animal.name}</p>
                    <p className="text-sm text-gray-600">{animal.order}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Tolerancia</p>
                    <p
                      className="font-bold"
                      style={{
                        color:
                          animal.tolerance <= 3
                            ? '#00C851'
                            : animal.tolerance <= 6
                            ? '#FFD93D'
                            : '#FF6B6B',
                      }}
                    >
                      {animal.tolerance}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl p-6 shadow-xl text-white"
            style={{ backgroundColor: waterQuality?.color || '#000000' }}
          >
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              💡 Recomendación
            </h3>
            <p className="text-sm opacity-95 leading-relaxed">
              {waterQuality?.recommendation || 'No hay recomendaciones disponibles'}
            </p>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 right-6 max-w-2xl mx-auto z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-4 flex gap-3">
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedAnimals([]);
                setCurrentView('select');
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Nuevo Análisis
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedAnimals([]);
                setCurrentView('home');
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Inicio
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );

  const AnimalDetailModal = () => {
    if (!showAnimalDetail) return null;
    
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowAnimalDetail(null)}
      >
        <div
          className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="p-6 rounded-t-3xl"
            style={{ backgroundColor: showAnimalDetail.color + '30' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-6xl">{showAnimalDetail.image}</div>
              <button
                onClick={() => setShowAnimalDetail(null)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-1">{showAnimalDetail.name}</h2>
            <p className="text-lg text-gray-700">{showAnimalDetail.order}</p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{showAnimalDetail.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Hábitat</h3>
              <p className="text-gray-700">{showAnimalDetail.habitat}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">BMWP</p>
                <p className="text-2xl font-bold text-blue-600">{showAnimalDetail.bmwp}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">ABI</p>
                <p className="text-2xl font-bold text-purple-600">{showAnimalDetail.abi}</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">IBF</p>
                <p className="text-2xl font-bold text-pink-600">{showAnimalDetail.ibf}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">
                Tolerancia a Contaminación
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${showAnimalDetail.tolerance * 10}%`,
                      backgroundColor:
                        showAnimalDetail.tolerance <= 3
                          ? '#00C851'
                          : showAnimalDetail.tolerance <= 6
                          ? '#FFD93D'
                          : '#FF6B6B',
                    }}
                  />
                </div>
                <span className="font-bold text-xl">{showAnimalDetail.tolerance}/10</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {showAnimalDetail.tolerance <= 3
                  ? 'Muy sensible - Indica agua limpia'
                  : showAnimalDetail.tolerance <= 6
                  ? 'Moderadamente tolerante - Agua regular'
                  : 'Muy tolerante - Puede indicar contaminación'}
              </p>
            </div>

            {showAnimalDetail.isUserAdded && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-800">
                  ✨ Este organismo fue agregado por un usuario de la comunidad
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 font-sans">
      {showResults ? <ResultsView /> : currentView === 'home' ? <HomeView /> : currentView === 'select' ? <SelectView /> : currentView === 'add' ? <AddView /> : currentView === 'info' ? <InfoView /> : <HomeView />}
      <AnimalDetailModal />
    </div>
  );
};

export default WaterQualityApp;