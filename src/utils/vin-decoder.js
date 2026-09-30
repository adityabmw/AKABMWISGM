export function decodeBMWVin(vin){
  vin = (vin||'').toUpperCase();
  if(vin.length!==17) return {valid:false, msg:'VIN harus 17 digit'};
  const wmi = vin.slice(0,3);
  const vds = vin.slice(3,9);
  const yearCode = vin[9];
  const modelMap = { 'F30':'F30 3-Series','F10':'F10 5-Series','G20':'G20 3-Series','E90':'E90 3-Series','G30':'G30 5-Series','F15':'F15 X5' };
  let model = 'BMW'; for(const k in modelMap){ if(vin.includes(k.slice(1))||vds.includes(k[1])) model=modelMap[k]; }
  if(vin.includes('N20')) model+=' N20'; if(vin.includes('B48')) model+=' B48';
  return {valid:true, wmi, vds, year:yearCode, model, engine: vds[2]+vds[3]||'N20/B48', plant: vin[10]};
}
