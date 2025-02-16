import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, X, Check } from 'lucide-react';

function Deltakere({ deltakere, setDeltakere, disabled }) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Legg til 3 tomme deltakere når komponenten lastes hvis det ikke finnes noen
    if (deltakere.length === 0) {
      setDeltakere([
        { fagFunksjon: '', navn: '', forberedelser: '', fullfort: false },
        { fagFunksjon: '', navn: '', forberedelser: '', fullfort: false },
        { fagFunksjon: '', navn: '', forberedelser: '', fullfort: false }
      ]);
    }
  }, []);

  const handleDeltakerEndring = (index, felt, verdi) => {
    const oppdaterteDeltakere = [...deltakere];
    oppdaterteDeltakere[index][felt] = verdi;
    setDeltakere(oppdaterteDeltakere);
  };

  const leggTilDeltaker = () => {
    setDeltakere([...deltakere, { fagFunksjon: '', navn: '', forberedelser: '' }]);
  };

  const fjernDeltaker = (index) => {
    const oppdaterteDeltakere = deltakere.filter((_, i) => i !== index);
    setDeltakere(oppdaterteDeltakere);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold">Deltakere</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="grid grid-cols-12 gap-4 mb-2 font-medium text-sm text-gray-700">
            <div className="col-span-2">Funksjon</div>
            <div className="col-span-3">Navn</div>
            <div className="col-span-6">Forberedelser</div>
            <div className="col-span-1"></div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {/* Deltakerliste */}
            <div className="divide-y">
              {deltakere.map((deltaker, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={deltaker.fagFunksjon}
                      onChange={(e) => handleDeltakerEndring(index, 'fagFunksjon', e.target.value)}
                      className="w-full border rounded p-2"
                      placeholder="F.eks. BL"
                      disabled={disabled}
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={deltaker.navn}
                      onChange={(e) => handleDeltakerEndring(index, 'navn', e.target.value)}
                      className="w-full border rounded p-2"
                      placeholder="Navn"
                      disabled={disabled}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={deltaker.forberedelser}
                      onChange={(e) => handleDeltakerEndring(index, 'forberedelser', e.target.value)}
                      className="w-full border rounded p-2"
                      placeholder="Hva må forberedes?"
                      disabled={disabled}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => fjernDeltaker(index)}
                      className="text-red-500 hover:text-red-700"
                      disabled={disabled}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={leggTilDeltaker}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            disabled={disabled}
          >
            <Plus size={16} />
            Legg til deltaker
          </button>
        </div>
      )}
    </div>
  );
}

export default Deltakere; 