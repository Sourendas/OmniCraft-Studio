import React, { useState, useMemo } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { jsPDF } from 'jspdf';
import { 
  HeartPulse, 
  ArrowLeft, 
  Download, 
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthCalcPage: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [activityLevel, setActivityLevel] = useState<number>(1.375);
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('cut');
  const [dietPlan, setDietPlan] = useState<'high-protein' | 'balanced' | 'keto'>('high-protein');

  const currentWeightKg = unitSystem === 'metric' ? weightKg : weightLbs * 0.453592;
  const currentHeightCm = unitSystem === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;

  const bmr = useMemo(() => {
    if (gender === 'male') {
      return Math.round(10 * currentWeightKg + 6.25 * currentHeightCm - 5 * age + 5);
    }
    return Math.round(10 * currentWeightKg + 6.25 * currentHeightCm - 5 * age - 161);
  }, [gender, currentWeightKg, currentHeightCm, age]);

  const tdee = useMemo(() => Math.round(bmr * activityLevel), [bmr, activityLevel]);

  const targetCalories = useMemo(() => {
    if (goal === 'cut') return Math.round(tdee - 500);
    if (goal === 'bulk') return Math.round(tdee + 350);
    return tdee;
  }, [tdee, goal]);

  const bmi = useMemo(() => {
    const hMeters = currentHeightCm / 100;
    if (hMeters <= 0) return 22;
    return (currentWeightKg / (hMeters * hMeters)).toFixed(1);
  }, [currentWeightKg, currentHeightCm]);

  const macros = useMemo(() => {
    let proteinRatio = 0.3;
    let carbRatio = 0.4;
    let fatRatio = 0.3;
    if (dietPlan === 'high-protein') {
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
    } else if (dietPlan === 'keto') {
      proteinRatio = 0.25;
      carbRatio = 0.05;
      fatRatio = 0.70;
    }
    return {
      proteinGrams: Math.round((targetCalories * proteinRatio) / 4),
      carbGrams: Math.round((targetCalories * carbRatio) / 4),
      fatGrams: Math.round((targetCalories * fatRatio) / 9),
      proteinPercent: Math.round(proteinRatio * 100),
      carbPercent: Math.round(carbRatio * 100),
      fatPercent: Math.round(fatRatio * 100)
    };
  }, [targetCalories, dietPlan]);

  const handleExportPlanPdf = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('FileTools Kit Fitness Estimate', 15, 20);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} · Estimate only — not medical advice`, 15, 28);
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text('Biometric Summary', 15, 42);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`• Age: ${age} | Gender: ${gender.toUpperCase()}`, 15, 50);
    doc.text(`• Weight: ${currentWeightKg.toFixed(1)} kg | Height: ${currentHeightCm.toFixed(1)} cm | BMI: ${bmi}`, 15, 56);
    doc.text(`• Basal Metabolic Rate (BMR): ${bmr} kcal/day`, 15, 62);
    doc.text(`• Total Daily Energy Expenditure (TDEE): ${tdee} kcal/day`, 15, 68);
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Daily Caloric & Macro Target (${goal.toUpperCase()})`, 15, 84);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`• Target Calories: ${targetCalories} kcal / day`, 15, 92);
    doc.text(`• Protein: ${macros.proteinGrams}g (${macros.proteinPercent}%)`, 15, 98);
    doc.text(`• Carbohydrates: ${macros.carbGrams}g (${macros.carbPercent}%)`, 15, 104);
    doc.text(`• Fats: ${macros.fatGrams}g (${macros.fatPercent}%)`, 15, 110);
    doc.save('fitness-estimate.pdf');
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] font-bold mb-1">
            <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Productivity & Utility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <HeartPulse className="w-7 h-7 text-rose-600" />
            Health Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Mifflin-St Jeor estimate. Not medical advice.
          </p>
        </div>
        <button onClick={handleExportPlanPdf} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white text-xs font-bold shadow-lg shadow-rose-500/20 cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Export estimate PDF</span>
        </button>
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        Mifflin-St Jeor estimate. Not medical advice.
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">Biometric Inputs</h3>
              <div className="flex rounded-xl bg-[#F4F8FA] p-1 border border-slate-200 text-xs">
                <button onClick={() => setUnitSystem('metric')} className={`px-3 py-1 rounded-lg font-semibold ${unitSystem === 'metric' ? 'bg-rose-50 text-rose-800' : 'text-slate-500'}`}>Metric (kg/cm)</button>
                <button onClick={() => setUnitSystem('imperial')} className={`px-3 py-1 rounded-lg font-semibold ${unitSystem === 'imperial' ? 'bg-rose-50 text-rose-800' : 'text-slate-500'}`}>Imperial (lbs/ft)</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setGender('male')} className={`py-2 rounded-xl font-bold border ${gender === 'male' ? 'bg-[#E6F8F9] text-[#007A82] border-[#B3EAEF]' : 'bg-[#F4F8FA] border-slate-200 text-slate-400'}`}>Male</button>
              <button onClick={() => setGender('female')} className={`py-2 rounded-xl font-bold border ${gender === 'female' ? 'bg-pink-50 text-pink-800 border-pink-200' : 'bg-[#F4F8FA] border-slate-200 text-slate-400'}`}>Female</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
              </div>
              {unitSystem === 'metric' ? (
                <>
                  <div>
                    <label className="block text-slate-600 mb-1">Weight (kg)</label>
                    <input type="number" value={weightKg} onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Height (cm)</label>
                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-slate-600 mb-1">Weight (lbs)</label>
                    <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Height (ft & in)</label>
                    <div className="flex gap-1">
                      <input type="number" value={heightFt} onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)} className="w-1/2 px-2 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
                      <input type="number" value={heightIn} onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)} className="w-1/2 px-2 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540]" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Activity Level</label>
              <select value={activityLevel} onChange={(e) => setActivityLevel(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540]">
                <option value={1.2}>Sedentary (Desk job, little exercise)</option>
                <option value={1.375}>Lightly Active (Workouts 1-3 days/week)</option>
                <option value={1.55}>Moderately Active (Workouts 3-5 days/week)</option>
                <option value={1.725}>Very Active (Hard training 6-7 days/week)</option>
                <option value={1.9}>Extremely Active (Athletic training / physical job)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Primary Fitness Goal</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[{ id: 'cut' as const, label: 'Fat Loss (-500)' }, { id: 'maintain' as const, label: 'Maintain' }, { id: 'bulk' as const, label: 'Muscle Gain (+350)' }].map((g) => (
                  <button key={g.id} onClick={() => setGoal(g.id)} className={`py-2 px-1 rounded-xl font-bold border ${goal === g.id ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-[#F4F8FA] border-slate-200 text-slate-400'}`}>{g.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Macronutrient Ratio</label>
              <select value={dietPlan} onChange={(e) => setDietPlan(e.target.value as any)} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540]">
                <option value="high-protein">High Protein (35% P / 35% C / 30% F)</option>
                <option value="balanced">Balanced Zone (30% P / 40% C / 30% F)</option>
                <option value="keto">Keto / Low Carb (25% P / 5% C / 70% F)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Basal Metabolic Rate</span>
              <div className="text-xl font-black text-[#0A2540] mt-1">{bmr} <span className="text-xs text-slate-400 font-normal">kcal/d</span></div>
              <p className="text-[10px] text-slate-500 mt-1">Calories burned at resting baseline</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Maintenance TDEE</span>
              <div className="text-xl font-extrabold text-[#00A3AD] mt-1">{tdee} <span className="text-xs text-slate-400 font-normal">kcal/d</span></div>
              <p className="text-[10px] text-slate-500 mt-1">Daily energy with activity factored</p>
            </div>
            <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] text-rose-800 uppercase font-mono font-bold">Target Daily Intake</span>
              <div className="text-2xl font-black text-rose-600 mt-1">{targetCalories} <span className="text-xs text-rose-700 font-normal">kcal/d</span></div>
              <p className="text-[10px] text-rose-700 mt-1">Optimized for {goal.toUpperCase()}</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#00A3AD]" />
              <span>Target Daily Macronutrient Allocation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-cyan-500/20">
                <div className="flex justify-between items-center text-xs mb-1"><span className="text-[#00A3AD] font-bold">Protein</span><span className="text-[10px] text-slate-400 font-mono">{macros.proteinPercent}%</span></div>
                <div className="text-2xl font-black text-[#0A2540]">{macros.proteinGrams}g</div>
                <span className="text-[10px] text-slate-500">{macros.proteinGrams * 4} kcal</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-amber-500/20">
                <div className="flex justify-between items-center text-xs mb-1"><span className="text-amber-400 font-bold">Carbs</span><span className="text-[10px] text-slate-400 font-mono">{macros.carbPercent}%</span></div>
                <div className="text-2xl font-black text-[#0A2540]">{macros.carbGrams}g</div>
                <span className="text-[10px] text-slate-500">{macros.carbGrams * 4} kcal</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-rose-500/20">
                <div className="flex justify-between items-center text-xs mb-1"><span className="text-rose-600 font-bold">Fats</span><span className="text-[10px] text-slate-400 font-mono">{macros.fatPercent}%</span></div>
                <div className="text-2xl font-black text-[#0A2540]">{macros.fatGrams}g</div>
                <span className="text-[10px] text-slate-500">{macros.fatGrams * 9} kcal</span>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F4F8FA] flex overflow-hidden border border-slate-200">
              <div style={{ width: `${macros.proteinPercent}%` }} className="bg-cyan-500 h-full" />
              <div style={{ width: `${macros.carbPercent}%` }} className="bg-amber-500 h-full" />
              <div style={{ width: `${macros.fatPercent}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
          <AdBanner type="in-content" />
        </div>
      </div>
    </div>
  );
};
