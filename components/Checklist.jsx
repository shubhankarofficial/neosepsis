"use client";
import { useState, useEffect } from 'react';

const Checklist = () => {
  const initialOptions = [
    { name: "Rupture of membranes lasting longer than 18 hours", checked: false, value: 3 },
    { name: "Discovered high maternal antepartum temperature ", checked: false, value: 3 },
    { name: "Preterm delivery of 18-24 weeks", checked: false, value: 3 },
    { name: "Presence of Maternal Group B streptococcus, or Chorioamnionitis", checked: false, value: 3 },
    { name: "Prolonged Catheterization, or Surgery", checked: false, value: 3 },
    { name: "Neurological exam finding of reduced activity or lethdargy", checked: false, value: 3 },
    { name: "Purluent or foul-smelling amniotic fluid", checked: false, value: 3 },
    { name: "Presnece of fetal tachycardia ", checked: false, value: 2 },
    { name: "Recorded Newborn Respiratory Rate:>60 breaths/min or apnea ", checked: false, value: 3 },
    { name: "Low Apgar score reported", checked: false, value: 3 },
    { name: "Newborn is assigned male at birth", checked: false, value: 1 },
    { name: "Known maternal history of spontaneous abortion", checked: false, value: 1 },
    { name: "Delivery within 32-37 weeks of pregnancy", checked: false, value: 1 },
    { name: "Preterm delivery of 29-32 weeks", checked: false, value: 2 },
    { name: "NICU Visit", checked: false, value: 2 },
    { name: "Respiratory rate of newborn 50-60 breaths per minute", checked: false, value: 2 },
    { name: "Recorded birth weight <2500g or < 5.5 pounds", checked: false, value: 2 },
    { name: "Neurological exam finding reduced activity or lethargy", checked: false, value: 2 },
    { name: "Visual changes of placenta", checked: false, value: 2 },
    { name: "Presence of maternal tachycardia", checked: false, value: 2 },
    { name: "Use of invasive devices as feeding tubes, endotracheal tubes, vascular access or other", checked: false, value: 0 },
    { name: "Presence of uterine tenderness", checked: false, value: 2 },
    { name: "Presence of maternal leukocytosis", checked: false, value: 2 }
    // Define more options as needed
  ];
  const [checklist, setChecklist] = useState(initialOptions);
  const [tscore, setTscore] = useState(0);
  const [riskResult, setRiskResult] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 12;
  
  const visibleItems = checklist.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);

  const riskActions = {
    'HIGH RISK': [
      "Antibiotic administration through IV/IM route: A ) A combination of ampicillin (100mg/Kg/day) and gentamycin (5mg/Kg/day) is a good choice for blind treatment of EOS because of synergism between these antibiotics.(Wa, K. B.) For late-onset cloxacillin (100mg/Kg/day) or vancomycin (30mg/Kg/day).",
      "Lab /culture tests: IL-6, white blood cell count,  immature-to-total (I/T) neutrophil ratio."
    ],
    'MEDIUM RISK': [
      "Monitor Vitals in increased frequency of every 1 hour",
      "If clinical status worsens, consider administering  broad-spectrum antibiotics( combination of different classes to reduce antibiotic resistance) after obtaining blood culture."
    ],
    'LOW RISK': [
      "Continously monitor vital signs every 2 hours",
      "Consider a blood culture"
    ],
    'Patient is safe': [
      "No immediate action needed",
      "Continue normal routine",
      "Keep standard follow-ups"
    ]
  };

  useEffect(() => {
    if (tscore >= 9 && !showModal) {
      setRiskResult('HIGH RISK');
      setShowModal(true);
    } else if (tscore < 9 && riskResult === 'HIGH RISK' && showModal) {
      setShowModal(false);
    }
  }, [tscore, riskResult]);

  const handleChecklistChange = (name, checked) => {
    const valueIncrement = checklist.find(item => item.name === name).value;
    const updatedChecklist = checklist.map(item => 
      item.name === name ? { ...item, checked } : item
    );
    setChecklist(updatedChecklist);
    setTscore(prev => checked ? prev + valueIncrement : prev - valueIncrement);
  };

  const calculateRisk = () => {
    if (tscore >= 9) {
      setRiskResult('HIGH RISK');
      setShowModal(true);
    } else if (tscore >= 4 && tscore < 9) {
      setRiskResult('MEDIUM RISK');
      setShowModal(true);
    } else if (tscore > 0 && tscore < 4) {
      setRiskResult('LOW RISK');
      setShowModal(true);
    } else {
      setRiskResult('Patient is safe');
      setShowModal(true);
    }
  };

  const closeRiskModal = () => {
    setChecklist(initialOptions);
    setTscore(0);
    setShowModal(false);
    setRiskResult('');
  };

  const goToNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const goToPrevPage = () => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <div className='relative'>
      <div className='flex mr-80 mt-5 w-full mb-10'>
        <div className='flex-1'>
          <h2 className='text-lg font-semibold text-gray-700'>Please Select all that apply:</h2>
          <div className='flex flex-col items-start space-y-2'>
            {visibleItems.map((item, index) => (
              <label key={index} className='flex items-center text-gray-600'>
                <input
                  type="checkbox"
                  name={item.name}
                  checked={item.checked}
                  onChange={(e) => handleChecklistChange(item.name, e.target.checked)}
                  className="form-checkbox h-5 w-5 text-gray-600 mr-2"
                /> <span className="ml-2 text-sm">{item.name}</span>
              </label>
            ))}
            <div className='flex mt-4'>
              {pageIndex > 0 && (
                <button onClick={goToPrevPage} className='mr-4 px-4 py-2 bg-black text-white rounded hover:bg-opacity-80'>Previous</button>
              )}
              <button onClick={calculateRisk} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Calculate</button>
              <button onClick={closeRiskModal} className='mx-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700'>Reset</button>
              {(pageIndex + 1) * itemsPerPage < checklist.length && (
                <button onClick={goToNextPage} className='px-4 py-2 bg-black text-white rounded hover:bg-opacity-80'>Next</button>
              )}
            </div>
          </div>
        </div>
        {showModal && (
          <div className={`fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center`}>
            <div className={`p-4 max-w-sm w-full mx-auto rounded shadow-lg bg-white`}>
            <h3 className={`font-bold text-lg mb-2 ${riskResult === 'HIGH RISK' ? 'red_gradient' : riskResult === 'MEDIUM RISK' ? 'orange_gradient' : riskResult === 'LOW RISK' ? 'green_gradient' : 'blue_gradient'}`}>{riskResult}</h3>
              <ul className="list-disc pl-4 space-y-1">
                {riskActions[riskResult].map((action, index) => (
                  <li key={index} className="text-sm font-normal">{action}</li>
                ))}
              </ul>
              <button onClick={closeRiskModal} className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checklist;
