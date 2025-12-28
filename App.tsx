import React, { useState } from 'react';
import { Ruler, Layers, Scissors, Hammer, Home, Menu, X, FileText, HelpCircle } from 'lucide-react';
import { PROJECT_PARAMS, PARTS_LIST, CUTLIST_SHEETS } from './constants';
import CutlistDiagram from './components/CutlistDiagram';
import SchematicView from './components/SchematicView';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
        activeSection === id 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold font-serif text-slate-800">Mudroom Bench</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8 hidden md:block">
            <h1 className="text-2xl font-bold font-serif text-slate-900">Mudroom Bench</h1>
            <p className="text-sm text-slate-500 mt-2">Projekt Wiki v1.0</p>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem id="overview" label="Översikt" icon={Home} />
            <NavItem id="specs" label="Specifikationer" icon={Ruler} />
            <NavItem id="parts" label="Stycklista" icon={Layers} />
            <NavItem id="cutlist" label="Kapplan" icon={Scissors} />
            <NavItem id="assembly" label="Montering" icon={Hammer} />
            <NavItem id="notes" label="Noteringar" icon={FileText} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 text-xs text-slate-400">
            Genererad från OpenSCAD källkod.
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-5xl mx-auto">
        
        {/* Overview Section */}
        <section id="overview" className="mb-16 scroll-mt-20">
          <header className="mb-8">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Projektöversikt</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              Detta projekt beskriver en platsbyggd hallmöbel ("Mudroom Bench") med integrerad sittbänk, skoförvaring och hyllsystem.
              Designen är modulär med fyra sektioner och anpassad för plywood-konstruktion.
            </p>
          </header>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <h3 className="text-lg font-bold mb-4 text-slate-800">Schematisk Vy (Front)</h3>
            <SchematicView />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 font-bold mb-2">Total Bredd</div>
              <div className="text-3xl font-serif text-slate-900">{PROJECT_PARAMS.totalWidth} mm</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 font-bold mb-2">Total Höjd</div>
              <div className="text-3xl font-serif text-slate-900">{PROJECT_PARAMS.totalHeight} mm</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 font-bold mb-2">Antal Sektioner</div>
              <div className="text-3xl font-serif text-slate-900">{PROJECT_PARAMS.places} st</div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section id="specs" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Ruler className="text-blue-600" /> Specifikationer
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600 w-1/3">Stomdjup</td>
                  <td className="p-4 text-slate-900 font-mono">{PROJECT_PARAMS.depthCarcass} mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Sittdjup</td>
                  <td className="p-4 text-slate-900 font-mono">{PROJECT_PARAMS.depthSeat} mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Sitthöjd (Ovansida)</td>
                  <td className="p-4 text-slate-900 font-mono">{PROJECT_PARAMS.benchHeight} mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Handskhylla (Höjd)</td>
                  <td className="p-4 text-slate-900 font-mono">1700 mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Hjälmhylla (Höjd)</td>
                  <td className="p-4 text-slate-900 font-mono">1950 mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Materialtjocklek (Stomme)</td>
                  <td className="p-4 text-slate-900 font-mono">{PROJECT_PARAMS.materialThickness} mm</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-600">Materialtjocklek (Sits)</td>
                  <td className="p-4 text-slate-900 font-mono">{PROJECT_PARAMS.seatThickness} mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* BOM / Parts List */}
        <section id="parts" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Layers className="text-blue-600" /> Stycklista (BOM)
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-slate-100 text-slate-700 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Del</th>
                    <th className="p-4">Antal</th>
                    <th className="p-4">Dimensioner (mm)</th>
                    <th className="p-4">Material</th>
                    <th className="p-4 hidden md:table-cell">Beskrivning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PARTS_LIST.map((part) => (
                    <tr key={part.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{part.name}</td>
                      <td className="p-4 text-slate-700 font-mono">{part.count} st</td>
                      <td className="p-4 text-slate-700 font-mono">
                        {part.width} x {part.length} x {part.thickness}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          part.thickness === 21 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {part.thickness}mm
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 hidden md:table-cell">{part.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cutlist Section */}
        <section id="cutlist" className="mb-16 scroll-mt-20">
          <header className="mb-6">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-3">
              <Scissors className="text-blue-600" /> Kapplan
            </h2>
            <p className="text-slate-600">
              Visuell representation av sågsnitt. Baserat på skivstorlekar definierade i koden (huvudsakligen 900x2500 och 1200x2500).
              <span className="block mt-1 text-sm text-amber-600 font-medium">Obs: Inkluderar 4mm sågsnitt (kerf) i layouten.</span>
            </p>
          </header>
          
          <div className="space-y-12">
            {CUTLIST_SHEETS.map((sheet) => (
              <CutlistDiagram key={sheet.id} sheet={sheet} />
            ))}
          </div>
        </section>

        {/* Assembly / Construction Notes */}
        <section id="assembly" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Hammer className="text-blue-600" /> Monteringsguide
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl mb-3 text-slate-800">Sockelkonstruktion</h3>
              <p className="text-slate-600 mb-4">
                Sockeln består av en bottenplatta och en topplatta med 18mm mellanrum (sargar). 
                Total höjd för sockeln är {18 + 55 + 18} mm.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Botten: 18mm Ply</li>
                <li>Hålrum/Reglar: 55mm höga</li>
                <li>Topp (Golv för fack): 18mm Ply</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl mb-3 text-slate-800">Delad Mellanvägg</h3>
              <p className="text-slate-600 mb-4">
                För att optimera sågning är mellanväggarna delade i två delar:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Nedre del:</strong> Under sitsen ({PROJECT_PARAMS.benchHeight - PROJECT_PARAMS.seatThickness}mm hög).</li>
                <li><strong>Övre del:</strong> Ovanför sitsen.</li>
                <li>Sitsen vilar ovanpå den nedre delen, och den övre delen står på sitsen (eller skruvas igenom).</li>
              </ul>
            </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
              <h3 className="font-bold text-xl mb-3 text-slate-800">Bakstycke & Skidbänk</h3>
              <p className="text-slate-600 mb-4">
                Bakstycket är uppdelat i fyra sektioner (2x Vänster, 2x Höger) för att passa standardbredder på skivmaterial.
                Skarven ligger dolt bakom mitt-mellanväggen.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <p className="font-medium text-amber-800">Notis från koden:</p>
                <p className="text-amber-700 italic">"Bakskarv ligger på mitt-skiljeväggen (perfekt infästning)."</p>
              </div>
            </div>

            {/* NEW EXPLANATION BLOCK */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm md:col-span-2">
              <h3 className="font-bold text-xl mb-3 text-blue-900 flex items-center gap-2">
                <HelpCircle size={24} />
                Konstruktionsdetalj: Dubbelbotten
              </h3>
              <p className="text-blue-800 mb-4">
                Designen använder både en <strong>Sockel Topp</strong> (2400x450) och separata <strong>Boot-hyllor</strong> (4 st á 578x420). Detta är en medveten designval ("dubbelbotten").
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-1">Sockel Topp</h4>
                  <p className="text-sm text-blue-800">
                    Den strukturella basen som håller ihop hela möbeln. Den går hela vägen (2400mm) och skruvas i sockelreglarna. Utan denna skulle konstruktionen bli instabil.
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-1">Boot-hyllor (Insatser)</h4>
                  <p className="text-sm text-blue-800">
                    Dessa läggs <em>ovanpå</em> sockeltoppen inne i varje fack. De fungerar som slitageskydd (enkla att byta ut vid fuktskador) och skapar ett grundare djup (420mm) för att matcha skomattor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notes / T-Track */}
        <section id="notes" className="mb-24 scroll-mt-20">
           <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
            <FileText className="text-blue-600" /> Övriga Detaljer
          </h2>
          <div className="bg-slate-800 text-slate-100 p-8 rounded-xl">
             <h3 className="text-xl font-bold mb-4 text-white">Skidbänk & T-Track</h3>
             <p className="mb-4 text-slate-300">
               Konstruktionen inkluderar en "Skidbänk" på baksidan (negativ Y i koden).
               Denna är försedd med urfräsningar för T-Track skenor.
             </p>
             <div className="grid grid-cols-2 gap-8 font-mono text-sm">
               <div>
                 <span className="block text-slate-400">T-Track Bredd</span>
                 <span className="text-xl">12 mm</span>
               </div>
               <div>
                 <span className="block text-slate-400">T-Track Djup</span>
                 <span className="text-xl">10 mm</span>
               </div>
                <div>
                 <span className="block text-slate-400">Marginal från kant</span>
                 <span className="text-xl">70 mm</span>
               </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;