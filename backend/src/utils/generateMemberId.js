const stateCodeMap = {
  'Andhra Pradesh': 'AP',
  'Arunachal Pradesh': 'AR',
  'Assam': 'AS',
  'Bihar': 'BR',
  'Chhattisgarh': 'CG',
  'Goa': 'GA',
  'Gujarat': 'GJ',
  'Haryana': 'HR',
  'Himachal Pradesh': 'HP',
  'Jharkhand': 'JH',
  'Karnataka': 'KA',
  'Kerala': 'KL',
  'Madhya Pradesh': 'MP',
  'Maharashtra': 'MH',
  'Manipur': 'MN',
  'Meghalaya': 'ML',
  'Mizoram': 'MZ',
  'Nagaland': 'NL',
  'Odisha': 'OD',
  'Punjab': 'PB',
  'Rajasthan': 'RJ',
  'Sikkim': 'SK',
  'Tamil Nadu': 'TN',
  'Telangana': 'TG',
  'Tripura': 'TR',
  'Uttar Pradesh': 'UP',
  'Uttarakhand': 'UK',
  'West Bengal': 'WB',
  'Delhi': 'DL',
  'Jammu & Kashmir': 'JK',
  'Ladakh': 'LA'
};

async function generateMemberId(state, MemberModel) {
  const code = stateCodeMap[state] || (state ? state.slice(0, 2).toUpperCase() : 'IN');
  const count = await MemberModel.countDocuments({ state, applicationStatus: 'approved' });
  const seq = String(count + 1).padStart(6, '0');
  return `SDMKF-${code}-${seq}`;
}

module.exports = { generateMemberId };
