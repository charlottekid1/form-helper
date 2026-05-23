// ╔══════════════════════════════════════════════════════════════════╗
// ║         SENIOR 1040 AI ASSISTANT — SETUP INSTRUCTIONS           ║
// ║                                                                  ║
// ║  Uses Google Gemini AI — FREE, no credit card needed!           ║
// ║                                                                  ║
// ║  1. Install Node.js from nodejs.org (LTS version)               ║
// ║  2. In terminal/command prompt run:                              ║
// ║       npx create-react-app senior-tax-app                       ║
// ║       cd senior-tax-app                                         ║
// ║  3. Replace src/App.js with this file (rename to App.js)        ║
// ║  4. Get a FREE Gemini API key (no credit card):                 ║
// ║       Go to: aistudio.google.com                                ║
// ║       Sign in with Google → click "Get API Key" → Create key   ║
// ║  5. Create a file called .env in the senior-tax-app folder:     ║
// ║       REACT_APP_GEMINI_KEY=paste-your-key-here                  ║
// ║  6. Run:  npm start                                              ║
// ║     The app opens at: http://localhost:3000                      ║
// ║                                                                  ║
// ║  NEVER share your .env file or API key publicly                 ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const colors = {
  bg: "#F7F5F0",
  card: "#FFFFFF",
  primary: "#1B4F72",
  primaryLight: "#D6E8F5",
  accent: "#E67E22",
  accentLight: "#FDEBD0",
  success: "#1E8449",
  successLight: "#D5F5E3",
  warning: "#B7950B",
  warningLight: "#FCF3CF",
  danger: "#C0392B",
  dangerLight: "#FADBD8",
  text: "#1A1A1A",
  textMuted: "#555555",
  border: "#D5CFC7",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: colors.bg,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: colors.text,
    padding: "0",
  },
  header: {
    background: colors.primary,
    color: "#fff",
    padding: "24px 32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  headerIcon: { fontSize: "36px" },
  headerTitle: { fontSize: "26px", fontWeight: "bold", margin: 0 },
  headerSub: { fontSize: "16px", opacity: 0.85, marginTop: "4px" },
  main: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px" },
  card: {
    background: colors.card,
    borderRadius: "16px",
    border: `1px solid ${colors.border}`,
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionDesc: {
    fontSize: "17px",
    color: colors.textMuted,
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  uploadZone: {
    border: `2px dashed ${colors.primary}`,
    borderRadius: "12px",
    padding: "40px 24px",
    textAlign: "center",
    cursor: "pointer",
    background: colors.primaryLight,
    transition: "all 0.2s",
  },
  uploadZoneHover: {
    background: "#C2DCF0",
    borderColor: colors.accent,
  },
  uploadIcon: { fontSize: "48px", marginBottom: "12px" },
  uploadText: { fontSize: "20px", fontWeight: "bold", color: colors.primary, marginBottom: "8px" },
  uploadSub: { fontSize: "16px", color: colors.textMuted },
  fileList: { marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    background: colors.successLight,
    border: `1px solid #A9DFBF`,
    borderRadius: "10px",
    fontSize: "16px",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 32px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnPrimary: {
    background: colors.primary,
    color: "#fff",
  },
  btnAccent: {
    background: colors.accent,
    color: "#fff",
  },
  btnDisabled: {
    background: "#CCC",
    color: "#888",
    cursor: "not-allowed",
  },
  qaBlock: {
    background: colors.primaryLight,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    border: `1px solid #AED6F1`,
  },
  qaQuestion: { fontSize: "19px", fontWeight: "bold", color: colors.primary, marginBottom: "12px" },
  qaOptions: { display: "flex", gap: "12px", flexWrap: "wrap" },
  qaOption: {
    padding: "12px 24px",
    fontSize: "17px",
    borderRadius: "8px",
    border: `2px solid ${colors.primary}`,
    background: "#fff",
    color: colors.primary,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.15s",
  },
  qaOptionSelected: {
    background: colors.primary,
    color: "#fff",
  },
  resultLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: `1px solid ${colors.border}`,
    fontSize: "17px",
  },
  resultLabel: { color: colors.textMuted, flex: 1 },
  resultLineNum: { fontSize: "13px", color: "#999", marginLeft: "8px", fontFamily: "monospace" },
  resultValue: { fontWeight: "bold", fontSize: "18px", color: colors.primary },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  disclaimer: {
    background: colors.warningLight,
    border: `1px solid #F9CA3E`,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
    fontSize: "16px",
    color: "#7D6608",
    lineHeight: "1.6",
  },
  progress: {
    display: "flex",
    gap: "0",
    marginBottom: "32px",
    background: colors.card,
    borderRadius: "12px",
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
  },
  progressStep: {
    flex: 1,
    padding: "16px 8px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: colors.textMuted,
    borderRight: `1px solid ${colors.border}`,
  },
  progressStepActive: { background: colors.primary, color: "#fff" },
  progressStepDone: { background: colors.successLight, color: colors.success },
  // ── Chat styles ──
  chatFab: {
    position: "fixed",
    bottom: "28px",
    right: "28px",
    width: "68px",
    height: "68px",
    borderRadius: "50%",
    background: colors.accent,
    color: "#fff",
    fontSize: "30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    transition: "transform 0.2s",
  },
  chatPanel: {
    position: "fixed",
    bottom: "110px",
    right: "28px",
    width: "380px",
    maxWidth: "calc(100vw - 40px)",
    height: "520px",
    background: colors.card,
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    border: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    overflow: "hidden",
  },
  chatHeader: {
    background: colors.primary,
    color: "#fff",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  msgUser: {
    alignSelf: "flex-end",
    background: colors.primary,
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "16px 16px 4px 16px",
    maxWidth: "80%",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  msgAI: {
    alignSelf: "flex-start",
    background: colors.primaryLight,
    color: colors.text,
    padding: "12px 16px",
    borderRadius: "16px 16px 16px 4px",
    maxWidth: "85%",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  msgTyping: {
    alignSelf: "flex-start",
    background: colors.primaryLight,
    padding: "12px 16px",
    borderRadius: "16px 16px 16px 4px",
    fontSize: "20px",
    letterSpacing: "4px",
  },
  chatInputRow: {
    display: "flex",
    gap: "8px",
    padding: "12px 16px",
    borderTop: `1px solid ${colors.border}`,
    flexShrink: 0,
  },
  chatInput: {
    flex: 1,
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: `1.5px solid ${colors.border}`,
    outline: "none",
    fontFamily: "inherit",
    resize: "none",
  },
  chatSend: {
    padding: "12px 18px",
    background: colors.primary,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer",
    flexShrink: 0,
  },
  suggestedQuestions: {
    padding: "0 16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flexShrink: 0,
  },
  suggestedBtn: {
    padding: "8px 14px",
    background: colors.accentLight,
    border: `1px solid #F0C48A`,
    borderRadius: "8px",
    color: colors.accent,
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    fontWeight: "bold",
  },
  loadingDot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: colors.primary,
    margin: "0 4px",
    animation: "bounce 1.2s infinite ease-in-out",
  },
};

// ─── System prompt for Claude ─────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a tax document reading assistant. Extract financial data from IRS tax documents.

FOR A W-2 FORM — read these boxes exactly:
- Look for "1 Wages, tips, other compensation" — the dollar amount next to it → "wages"
- Look for "2 Federal income tax withheld" — the dollar amount next to it → "federalTaxWithheld"  
- Look for "3 Social security wages" → "socialSecurityWages"
- Look for "4 Social security tax withheld" → "socialSecurityTaxWithheld"
- Look for "5 Medicare wages and tips" → ignore
- Look for "6 Medicare tax withheld" → "medicareTaxWithheld"
- Look for "16 State wages" → ignore, use Box 1 only
- Look for "17 State income tax" → "stateTaxWithheld"
- Employer name is in box "c" on left side → "employerOrPayer"
- IMPORTANT: Box 1 and Box 16 often have the same number — always use Box 1 for "wages"
- If a box shows $0.00 or is blank, use 0

FOR A 1099-R FORM:
- Box 1 "Gross distribution" → "retirementDistribution"
- Box 4 "Federal income tax withheld" → "federalTaxWithheld"

FOR A SSA-1099 (Social Security):
- "Total benefits paid" or "Net benefits" → "socialSecurityBenefits"
- Box 6 "Voluntary federal income tax withheld" → "federalTaxWithheld"

FOR A 1099-INT (Bank interest):
- Box 1 "Interest income" → "interestIncome"
- Box 4 "Federal income tax withheld" → "federalTaxWithheld"

FOR A 1099-B (Brokerage / capital gains):
- "Proceeds" or "Total proceeds" → "capitalGainsProceeds"
- "Cost basis" or "Total cost basis" → "capitalGainsBasis"
- Net gain = proceeds minus basis → "capitalGainsNet" (can be negative for a loss)
- "Long-term" gains → "longTermGains"
- "Short-term" gains → "shortTermGains"
- Box 4 "Federal income tax withheld" → "federalTaxWithheld"

FOR A 1099-DIV (Dividends):
- Box 1a "Total ordinary dividends" → "dividendIncome"
- Box 1b "Qualified dividends" → "qualifiedDividends"
- Box 2a "Total capital gain distributions" → "capitalGainsNet"
- Box 4 "Federal income tax withheld" → "federalTaxWithheld"

RETURN ONLY valid JSON — no markdown fences, no explanation text, nothing else:
{"documentType":"W-2","employerOrPayer":"","wages":0,"federalTaxWithheld":0,"stateTaxWithheld":0,"socialSecurityWages":0,"socialSecurityTaxWithheld":0,"medicareTaxWithheld":0,"retirementDistribution":0,"socialSecurityBenefits":0,"interestIncome":0,"dividendIncome":0,"qualifiedDividends":0,"capitalGainsNet":0,"longTermGains":0,"shortTermGains":0,"capitalGainsProceeds":0,"capitalGainsBasis":0,"notes":""}

RULES:
- Copy dollar amounts exactly — do not round
- Use 0 for missing fields, never null or undefined
- NEVER include SSN, EIN, account numbers, dates of birth`;

// ─── Q&A for seniors ──────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "age65",
    text: "Are you 65 years old or older?",
    hint: "This affects your standard deduction — it's higher for seniors.",
    options: ["Yes", "No"],
  },
  {
    id: "blind",
    text: "Are you legally blind?",
    hint: "This also increases your standard deduction.",
    options: ["Yes", "No"],
  },
  {
    id: "married",
    text: "What is your filing status?",
    hint: "How you file affects your tax bracket and deductions.",
    options: ["Single", "Married Filing Jointly", "Married Filing Separately", "Widowed"],
  },
  {
    id: "medicarePremiums",
    text: "Did you pay Medicare Part B or Part D premiums out of pocket?",
    hint: "These may count as a medical deduction if you itemize.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "medicalExpenses",
    text: "Did you have large medical or dental expenses this year?",
    hint: "Medical expenses over 7.5% of your income may be deductible if you itemize.",
    options: ["Yes, over $5,000", "Yes, under $5,000", "No"],
    inputId: "medicalExpensesAmt",
    inputLabel: "Approximate total medical expenses paid ($)",
    showInputIf: "Yes, over $5,000",
  },
  {
    id: "charitableDonations",
    text: "Did you make any donations to churches, charities, or nonprofits?",
    hint: "Cash and non-cash donations to qualified organizations can be deducted if you itemize.",
    options: ["Yes", "No"],
    inputId: "charitableAmt",
    inputLabel: "Total donated this year ($)",
    showInputIf: "Yes",
  },
  {
    id: "mortgageInterest",
    text: "Did you pay mortgage interest on your home?",
    hint: "Mortgage interest is deductible on Schedule A if you itemize.",
    options: ["Yes", "No"],
    inputId: "mortgageAmt",
    inputLabel: "Total mortgage interest paid ($)",
    showInputIf: "Yes",
  },
  {
    id: "spouseAge65",
    text: "Is your spouse 65 years old or older?",
    hint: "If your spouse is also 65+, you get an additional standard deduction bonus.",
    options: ["Yes", "No"],
    showIfMarried: true,
  },
  {
    id: "spouseBlind",
    text: "Is your spouse legally blind?",
    hint: "This adds another bonus to your standard deduction.",
    options: ["Yes", "No"],
    showIfMarried: true,
  },
  {
    id: "spouseIncome",
    text: "Did your spouse have any income this year?",
    hint: "When filing jointly, both spouses' income is combined on one return.",
    options: ["Yes — I will upload their documents", "No income", "Not sure"],
    showIfMarried: true,
  },
  {
    id: "estimatedTaxPayments",
    text: "Did you make quarterly estimated tax payments to the IRS this year?",
    hint: "Many retired seniors pay taxes quarterly instead of having them withheld.",
    options: ["Yes", "No", "Not sure"],
    inputId: "estimatedTaxAmt",
    inputLabel: "Total estimated tax payments made ($)",
    showInputIf: "Yes",
  },
  {
    id: "hasCapitalGains",
    text: "Did you sell any stocks, bonds, mutual funds, or property this year?",
    hint: "If yes, you should have received a 1099-B from your broker. Capital gains are taxed at special lower rates for seniors.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "capitalGainsType",
    text: "Were these investments held for more than 1 year before selling?",
    hint: "Investments held over 1 year are 'long-term' and taxed at 0%, 15%, or 20% — much lower than ordinary income rates.",
    options: ["Yes — held over 1 year (long-term)", "No — held under 1 year (short-term)", "Mix of both", "Not sure"],
    showIfCapGains: true,
  },
  {
    id: "capitalGainsAmt",
    text: "What was your approximate net capital gain or loss?",
    hint: "Net gain = what you sold it for minus what you paid for it. Check your 1099-B for this number. If you lost money, that is a loss.",
    options: ["I have a gain", "I have a loss", "About even / not sure"],
    showIfCapGains: true,
    inputId: "capitalGainsManual",
    inputLabel: "Enter your net capital gain or loss ($) — use a minus sign for losses",
    showInputIf: "I have a gain",
  },
  {
    id: "itemize",
    text: "Would you like us to check if itemizing saves you more than the standard deduction?",
    hint: "We will compare both and recommend whichever gives you a bigger deduction.",
    options: ["Yes, compare for me", "No, use standard deduction"],
  },
];

// ─── 1040 mapping logic ───────────────────────────────────────────────────────
function is65OrSpouse65(answers) {
  return answers.age65 === "Yes" || answers.spouseAge65 === "Yes";
}

function compute1040(extractedData, answers, manualInputs = {}) {
  const data = extractedData.reduce(
    (acc, doc) => ({
      wages: acc.wages + (doc.wages || 0),
      federalTaxWithheld: acc.federalTaxWithheld + (doc.federalTaxWithheld || 0),
      stateTaxWithheld: acc.stateTaxWithheld + (doc.stateTaxWithheld || 0),
      retirementDistribution: acc.retirementDistribution + (doc.retirementDistribution || 0),
      socialSecurityBenefits: acc.socialSecurityBenefits + (doc.socialSecurityBenefits || 0),
      interestIncome: acc.interestIncome + (doc.interestIncome || 0),
      dividendIncome: acc.dividendIncome + (doc.dividendIncome || 0),
      qualifiedDividends: acc.qualifiedDividends + (doc.qualifiedDividends || 0),
      capitalGainsNet: acc.capitalGainsNet + (doc.capitalGainsNet || 0),
      longTermGains: acc.longTermGains + (doc.longTermGains || 0),
      shortTermGains: acc.shortTermGains + (doc.shortTermGains || 0),
    }),
    {
      wages: 0, federalTaxWithheld: 0, stateTaxWithheld: 0,
      retirementDistribution: 0, socialSecurityBenefits: 0,
      interestIncome: 0, dividendIncome: 0, qualifiedDividends: 0,
      capitalGainsNet: 0, longTermGains: 0, shortTermGains: 0,
    }
  );

  const isMarried = answers.married === "Married Filing Jointly";
  const is65 = answers.age65 === "Yes";
  const isBlind = answers.blind === "Yes";

  // Manual inputs from Q&A
  const medicalExpenses = parseFloat(manualInputs.medicalExpensesAmt) || 0;
  const charitableAmt = parseFloat(manualInputs.charitableAmt) || 0;
  const mortgageAmt = parseFloat(manualInputs.mortgageAmt) || 0;
  const estimatedPayments = parseFloat(manualInputs.estimatedTaxAmt) || 0;

  // Standard deduction 2025 (IRS Rev. Proc. 2024-40)
  let stdDeduction = isMarried ? 30000 : 15000;
  const extraPerCondition = isMarried ? 1600 : 2000; // Age 65+ or blind bonus
  if (is65) stdDeduction += extraPerCondition;
  if (isBlind) stdDeduction += extraPerCondition;
  // Spouse bonuses (married filing jointly only)
  if (isMarried && answers.spouseAge65 === "Yes") stdDeduction += 1600;
  if (isMarried && answers.spouseBlind === "Yes") stdDeduction += 1600;

  // SS taxability (up to 85% taxable based on provisional income)
  const capitalGainsForSS = Math.max(0, data.capitalGainsNet);
  const provisionalIncome = data.wages + data.retirementDistribution + data.interestIncome + data.dividendIncome + capitalGainsForSS + data.socialSecurityBenefits * 0.5;
  const ssTaxable = provisionalIncome > 34000 ? data.socialSecurityBenefits * 0.85 : provisionalIncome > 25000 ? data.socialSecurityBenefits * 0.5 : 0;

  // Capital gains — from uploaded 1099-B OR manual Q&A entry
  const manualCapGains = parseFloat(manualInputs.capitalGainsManual) || 0;
  const rawCapGains = data.capitalGainsNet !== 0 ? data.capitalGainsNet : manualCapGains;
  const isLongTerm = answers.capitalGainsType === "Yes — held over 1 year (long-term)" ||
                     answers.capitalGainsType === "Mix of both";
  const netCapGains = answers.hasCapitalGains === "No" ? 0 : Math.max(rawCapGains, -3000);
  const longTermGains = isLongTerm
    ? Math.max(0, netCapGains)
    : (data.longTermGains || 0);

  // Total income (Line 9)
  const totalIncome = data.wages + data.retirementDistribution + ssTaxable + data.interestIncome + data.dividendIncome + netCapGains;
  const agi = Math.max(0, totalIncome);

  // Itemized deductions (Schedule A)
  const medicalThreshold = agi * 0.075; // 7.5% AGI floor
  const deductibleMedical = Math.max(0, medicalExpenses - medicalThreshold);
  const itemizedTotal = deductibleMedical + charitableAmt + mortgageAmt;

  // Choose whichever is larger
  const useItemized = answers.itemize === "Yes, compare for me" && itemizedTotal > stdDeduction;
  const deduction = useItemized ? itemizedTotal : stdDeduction;

  // Taxable income
  const taxableIncome = Math.max(0, agi - deduction);

  // Ordinary income tax brackets 2024
  function calcOrdinaryTax(income, married) {
    const brackets = married
      ? [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]]
      : [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]];
    let tax = 0, prev = 0;
    for (const [limit, rate] of brackets) {
      if (income <= prev) break;
      tax += Math.min(income, limit) * rate - prev * rate;
      prev = limit;
    }
    return Math.round(tax);
  }

  // Long-term capital gains tax (preferential rates 0%, 15%, 20%)
  function calcLTCGTax(ltcg, agi, married) {
    if (ltcg <= 0) return 0;
    const zeroThreshold = married ? 96700 : 48350;
    const fifteenThreshold = married ? 600050 : 533400;
    if (agi <= zeroThreshold) return 0;
    if (agi <= fifteenThreshold) return Math.round(ltcg * 0.15);
    return Math.round(ltcg * 0.20);
  }

  // Separate ordinary income from long-term gains for tax calc
  const ordinaryIncome = Math.max(0, taxableIncome - longTermGains);
  const ordinaryTax = calcOrdinaryTax(ordinaryIncome, isMarried);
  const ltcgTax = calcLTCGTax(Math.min(longTermGains, taxableIncome), agi, isMarried);
  const estimatedTax = ordinaryTax + ltcgTax;

  // Total payments
  const totalPayments = data.federalTaxWithheld + estimatedPayments;
  const refundOrOwed = totalPayments - estimatedTax;

  return {
    line1a_wages: data.wages,
    line2b_interest: data.interestIncome,
    line3b_dividends: data.dividendIncome,
    line3a_qualifiedDiv: data.qualifiedDividends,
    line4b_retirement: data.retirementDistribution,
    line5a_ssBenefits: data.socialSecurityBenefits,
    line5b_taxableSS: Math.round(ssTaxable),
    line6b_capitalGains: netCapGains,
    line6b_isLongTerm: isLongTerm,
    line7_totalIncome: Math.round(totalIncome),
    line11_agi: Math.round(agi),
    line12_deduction: Math.round(deduction),
    line12_isItemized: useItemized,
    line12_itemizedBreakdown: { deductibleMedical: Math.round(deductibleMedical), charitableAmt, mortgageAmt, total: Math.round(itemizedTotal), stdForComparison: stdDeduction },
    line15_taxableIncome: Math.round(taxableIncome),
    line16_ordinaryTax: ordinaryTax,
    line16_ltcgTax: ltcgTax,
    line16_tax: estimatedTax,
    line25a_fedWithheld: data.federalTaxWithheld,
    line26_estimatedPayments: estimatedPayments,
    line33_totalPayments: Math.round(totalPayments),
    line35a_refund: refundOrOwed > 0 ? Math.round(refundOrOwed) : 0,
    line37_amountOwed: refundOrOwed < 0 ? Math.round(Math.abs(refundOrOwed)) : 0,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return "$" + Math.round(n).toLocaleString();
}

function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// eslint-disable-next-line no-unused-vars
function isImage(file) {
  return file.type.startsWith("image/");
}

// ─── PDF → Image Converter (using PDF.js) ───────────────────────────────────
// Converts first page of a PDF to a PNG base64 string in the browser
// This lets Gemini read PDFs reliably on the free tier
async function pdfToImageBase64(file) {
  return new Promise(async (resolve, reject) => {
    try {
      // Load PDF.js from CDN
      if (!window.pdfjsLib) {
        await new Promise((res, rej) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            res();
          };
          script.onerror = rej;
          document.head.appendChild(script);
        });
      }

      // Read PDF file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Render first page at high resolution
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 }); // 2x = clearer image

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");

      await page.render({ canvasContext: ctx, viewport }).promise;

      // Export as PNG base64 (strip the data:image/png;base64, prefix)
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      console.log("📄 PDF converted to image successfully, size:", base64.length);
      resolve(base64);
    } catch (err) {
      console.error("PDF conversion error:", err);
      reject(err);
    }
  });
}

// ─── SSN Scrubbing ────────────────────────────────────────────────────────────
// Converts file to an image on a canvas, blacks out SSN patterns, returns base64
// SSN pattern: XXX-XX-XXXX or XXXXXXXXX (9 digits)
// eslint-disable-next-line no-unused-vars
const SSN_PATTERN = /\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b/g;

// eslint-disable-next-line no-unused-vars
async function scrubSSNFromImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // We cannot do OCR here — so we send a privacy-safe prompt instead
      URL.revokeObjectURL(url);
      // Return original base64 but flag that SSN scrubbing prompt is active
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Builds a privacy-safe prompt that instructs AI to IGNORE and NOT return SSNs
const PRIVACY_INSTRUCTION = `
CRITICAL PRIVACY RULE: This document may contain a Social Security Number (SSN).
You MUST:
1. NEVER include any SSN, EIN, or tax ID numbers in your JSON response
2. NEVER include any account numbers or routing numbers
3. NEVER include any dates of birth
4. ONLY extract the financial amounts listed in the JSON schema below
5. If you see a 9-digit number that looks like an SSN, skip it completely

`; 

// ─── Chat system prompt ───────────────────────────────────────────────────────
const CHAT_SYSTEM = `You are a friendly, patient bilingual tax assistant helping seniors fill out IRS Form 1040-SR-SR. You speak both English and Spanish — respond in the same language the user writes in. 

Rules:
- Use plain English. No jargon. Explain any tax term you use.
- Keep answers SHORT (3–5 sentences max). Seniors prefer brief, clear answers.
- Be warm and encouraging. Never make the person feel stupid for asking.
- Always end answers about tax decisions with: "A tax professional can confirm this for your specific situation."
- Never give a definitive "you owe X" or "your refund is X" — only estimates.
- If asked about something unrelated to taxes, gently redirect: "I'm here to help with your tax questions!"
- Topics you know well: W-2s, 1099s, Social Security income, standard deductions for seniors, retirement income, Medicare premiums, filing status, refunds, IRS deadlines.`;

const SUGGESTED_QUESTIONS = [
  "What is a standard deduction?",
  "Is my Social Security income taxable?",
  "What does 'filing status' mean?",
  "What is a W-2 form?",
  "What is a 1099-R?",
  "Why might I owe money this year?",
  "What is the deadline to file my taxes?",
  "Can I deduct my Medicare premiums?",
  "¿Qué es una deducción estándar?",
  "¿Es mi Seguro Social gravable?",
  "¿Qué es un formulario W-2?",
  "¿Cuándo es la fecha límite para presentar impuestos?",
];

// ─── Terms of Use Modal ──────────────────────────────────────────────────────
function TermsModal({ lang, onAccept }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", maxWidth: "520px", width: "100%",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      }}>
        {/* Header */}
        <div style={{ background: colors.primary, borderRadius: "20px 20px 0 0", padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📋</div>
          <div style={{ color: "#fff", fontSize: "22px", fontWeight: "bold" }}>Form Helper</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginTop: "4px" }}>
            {lang === "es" ? "Términos de Uso y Aviso de Privacidad" : "Terms of Use & Privacy Notice"}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div style={{ background: colors.warningLight, border: `1px solid #F9CA3E`, borderRadius: "10px", padding: "14px 16px", marginBottom: "20px", fontSize: "15px", color: "#7D6608", lineHeight: "1.6" }}>
            ⚠️ <strong>{lang === "es" ? "Importante:" : "Important:"}</strong>{" "}
            {lang === "es"
              ? "Form Helper es una herramienta educativa gratuita. NO es un preparador de impuestos con licencia. Todos los resultados son estimaciones y DEBEN ser revisados por un profesional antes de presentar."
              : "Form Helper is a free educational tool. It is NOT a licensed tax preparer. All results are estimates and MUST be reviewed by a professional before filing."}
          </div>

          {[
            {
              icon: "📄",
              title: lang === "es" ? "No es asesoramiento fiscal profesional" : "Not professional tax advice",
              desc: lang === "es"
                ? "Form Helper produce borradores de orientación solamente. No proporciona asesoramiento fiscal legal. Siempre verifique los resultados con un CPA, agente inscrito, o sitio VITA gratuito del IRS antes de presentar su declaración."
                : "Form Helper produces draft guidance only. It does not provide legal tax advice. Always verify results with a CPA, enrolled agent, or free IRS VITA site before filing your return."
            },
            {
              icon: "🔒",
              title: lang === "es" ? "Sus documentos no se almacenan" : "Your documents are not stored",
              desc: lang === "es"
                ? "Los documentos que sube se procesan en su navegador y se envían a Google Gemini AI para leerlos. Este sitio web no almacena ningún documento, número de Seguro Social, ni información personal. Cerrar el navegador borra todo."
                : "Documents you upload are processed in your browser and sent to Google Gemini AI to be read. This website stores no documents, Social Security Numbers, or personal information. Closing your browser erases everything."
            },
            {
              icon: "🤖",
              title: lang === "es" ? "Procesamiento de IA por Google" : "AI processing by Google",
              desc: lang === "es"
                ? "Esta aplicación usa la API de Google Gemini. En el nivel gratuito, Google puede usar los datos para mejorar sus modelos. Solo los montos en dólares se devuelven a la aplicación — nunca números de Seguro Social ni números de cuenta."
                : "This app uses the Google Gemini API. On the free tier, Google may use inputs to improve their models. Only dollar amounts are returned to the app — never Social Security Numbers or account numbers."
            },
            {
              icon: "⚖️",
              title: lang === "es" ? "Limitación de responsabilidad" : "Limitation of liability",
              desc: lang === "es"
                ? "Form Helper se proporciona 'tal cual' sin garantías. Aarthi Nelatoor y Ardrey Kell High School no son responsables de errores en los resultados. Al usar esta aplicación, usted acepta que es responsable de verificar todos los números antes de presentar."
                : "Form Helper is provided 'as is' without warranties. Aarthi Nelatoor and Ardrey Kell High School are not liable for errors in results. By using this app you agree you are responsible for verifying all figures before filing."
            },
            {
              icon: "🎓",
              title: lang === "es" ? "Proyecto estudiantil" : "Student project",
              desc: lang === "es"
                ? "Form Helper fue creado por una estudiante de secundaria como proyecto educativo. No está afiliado al IRS, ni a ningún preparador de impuestos con licencia, ni a ninguna institución financiera."
                : "Form Helper was created by a high school student as an educational project. It is not affiliated with the IRS, any licensed tax preparer, or any financial institution."
            },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: "flex", gap: "14px", padding: "14px 0", borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px", color: colors.text }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: colors.textMuted, lineHeight: "1.6" }}>{item.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px", fontSize: "13px", color: colors.textMuted, textAlign: "center", marginBottom: "16px" }}>
            {lang === "es"
              ? "Al tocar 'Acepto', confirma que ha leído y acepta estos términos."
              : "By tapping 'I Agree', you confirm you have read and accept these terms."}
          </div>

          <button
            onClick={onAccept}
            style={{
              width: "100%", padding: "18px", fontSize: "20px", fontWeight: "bold",
              background: colors.primary, color: "#fff", border: "none",
              borderRadius: "12px", cursor: "pointer",
            }}
          >
            {lang === "es" ? "✅ Acepto — Comenzar" : "✅ I Agree — Get Started"}
          </button>

          <div style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: colors.textMuted }}>
            {lang === "es"
              ? "Form Helper es gratuito para siempre. Sin registro. Sin almacenamiento de datos."
              : "Form Helper is free forever. No sign-up. No data storage."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feedback Form Component ─────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function FeedbackForm({ lang }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ background: colors.successLight, borderRadius: "10px", padding: "16px", textAlign: "center", fontSize: "16px", color: colors.success }}>
        ✅ {lang === "es" ? "¡Gracias por su opinión! Significa mucho para Aarthi." : "Thank you for your feedback! It means a lot to Aarthi."}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
        {[
          { val: "very_helpful", label: lang === "es" ? "😊 Muy útil" : "😊 Very helpful" },
          { val: "somewhat", label: lang === "es" ? "😐 Algo útil" : "😐 Somewhat" },
          { val: "needs_work", label: lang === "es" ? "😕 Necesita mejoras" : "😕 Needs work" },
        ].map(opt => (
          <button
            key={opt.val}
            onClick={() => setRating(opt.val)}
            style={{
              padding: "10px 16px", fontSize: "15px", borderRadius: "8px", cursor: "pointer",
              border: `2px solid ${rating === opt.val ? colors.primary : colors.border}`,
              background: rating === opt.val ? colors.primaryLight : "#fff",
              color: rating === opt.val ? colors.primary : colors.text,
              fontWeight: rating === opt.val ? "bold" : "normal",
            }}
          >{opt.label}</button>
        ))}
      </div>
      <textarea
        rows={3}
        placeholder={lang === "es" ? "¿Algún comentario? (opcional)" : "Any comments? What could be better? (optional)"}
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "10px", border: `1.5px solid ${colors.border}`, fontFamily: "inherit", resize: "none", marginBottom: "12px" }}
      />
      <button
        style={{ ...styles.btn, ...(rating ? styles.btnAccent : styles.btnDisabled) }}
        disabled={!rating}
        onClick={() => {
          console.log("Feedback:", { rating, comment, timestamp: new Date().toISOString() });
          setSubmitted(true);
        }}
      >
        {lang === "es" ? "Enviar Opinión" : "Submit Feedback"}
      </button>
    </div>
  );
}

// ─── TaxChat Component ────────────────────────────────────────────────────────
function TaxChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm your tax helper. Ask me anything about your 1040 — in plain English. I'm here to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setShowSuggested(false);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    // Build history for context (skip the welcome message)
    const history = messages
      .filter((m) => m.role === "user" || (m.role === "assistant" && m !== messages[0]))
      .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

    try {
      // eslint-disable-next-line no-unused-vars
const geminiChatMessages = [
        { role: "user", parts: [{ text: CHAT_SYSTEM + "\n\nUser: " + userText }] },
        ...history.slice(1).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        { role: "user", parts: [{ text: userText }] },
      ];
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: CHAT_SYSTEM + "\n\nNow answer this question from a senior: " + userText }] }] }),
        }
      );
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        style={{
          ...styles.chatFab,
          transform: open ? "scale(0.9)" : "scale(1)",
        }}
        onClick={() => setOpen((o) => !o)}
        title="Ask a tax question"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={styles.chatPanel}>
          {/* Header */}
          <div style={styles.chatHeader}>
            <span style={{ fontSize: "24px" }}>🤖</span>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "17px" }}>Tax Question Helper</div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>Ask me anything — I speak English & Español</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer" }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={styles.chatMessages}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === "user" ? styles.msgUser : styles.msgAI}>
                {m.text}
              </div>
            ))}
            {loading && <div style={styles.msgTyping}>· · ·</div>}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {showSuggested && (
            <div style={styles.suggestedQuestions}>
              <div style={{ fontSize: "13px", color: colors.textMuted, marginBottom: "2px", paddingLeft: "2px" }}>
                Tap a question to get started:
              </div>
              {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                <button key={q} style={styles.suggestedBtn} onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
              <button
                style={{ ...styles.suggestedBtn, background: "transparent", border: "none", color: colors.textMuted, fontSize: "13px" }}
                onClick={() => setShowSuggested(false)}
              >
                See all questions ▾
              </button>
            </div>
          )}

          {/* Input */}
          <div style={styles.chatInputRow}>
            <textarea
              style={styles.chatInput}
              rows={2}
              placeholder="Type your question here…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <button
              style={{ ...styles.chatSend, opacity: loading ? 0.5 : 1 }}
              onClick={() => sendMessage()}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Line Explainers ─────────────────────────────────────────────────────────
const LINE_EXPLAINERS = {
  "Line 1a": "This is money you earned from working — your salary or hourly wages. It comes from Box 1 of your W-2 form.",
  "Line 2b": "This is interest your bank paid you on savings accounts or CDs. It comes from your 1099-INT form.",
  "Line 3a": "These are special dividends from stocks that are taxed at a lower rate than ordinary income.",
  "Line 3b": "Total dividends paid to you from stocks or mutual funds. Comes from your 1099-DIV form.",
  "Line 4b": "Money you received from a pension, IRA, or 401(k). Comes from your 1099-R form.",
  "Line 5a": "The total Social Security benefits you received this year from the SSA-1099 form.",
  "Line 5b": "The portion of your Social Security that is taxable. Depending on your total income, 0% to 85% may be taxable.",
  "Line 6b": "Profit or loss from selling stocks, bonds, or property. Long-term gains (held over 1 year) are taxed at a lower rate.",
  "Line 7": "All your income added together before any deductions.",
  "Line 11": "Your total income after any above-the-line deductions. This is the key number used to calculate your taxes.",
  "Line 12": "The amount subtracted from your income before calculating tax. Seniors get a higher standard deduction — an extra ~$1,950 if you are 65 or older.",
  "Line 15": "The income you actually pay tax on — AGI minus your deduction.",
  "Line 16": "The tax calculated on your taxable income using the IRS tax brackets.",
  "Line 25a": "Federal income tax your employer already withheld from your paychecks throughout the year.",
  "Line 26": "Quarterly tax payments you sent directly to the IRS during the year.",
  "Line 33": "All the tax payments you have already made — withholding plus estimated payments.",
  "Line 35a": "Money the IRS will send back to you because you paid more tax than you owed.",
  "Line 37": "Additional tax you still owe the IRS after your payments.",
};

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  en: {
    uploadTitle: "📂 Upload Your Tax Documents",
    uploadDesc: "Upload your W-2, 1099-R (retirement), SSA-1099 (Social Security), 1099-INT (bank interest), or other tax forms. You can upload multiple files. We accept PDF or photos (JPG, PNG).",
    uploadBtn: "🔍 Read My Documents with AI",
    tapHere: "Tap here to choose files",
    dragDrop: "or drag and drop them here",
    accepts: "Accepts: PDF, JPG, PNG",
    noFiles: "No files uploaded yet. Tap above to get started.",
    docsRead: "✅ Documents Read Successfully",
    docsDesc: "Here is what we found in your tax documents:",
    questions: "❓ A Few Quick Questions",
    questionsDesc: "Please answer these questions so we can fill out your 1040-SR correctly. Tap your answer.",
    calculate: "📊 Calculate My 1040-SR",
    draftSummary: "📋 Your Form 1040-SR — Draft Summary",
    draftDesc: "Each line below matches a real line on IRS Form 1040-SR (2025).",
    nextSteps: "📌 What to Do Next",
    printPage: "🖨️ Print This Page",
    startOver: "🔄 Start Over",
    downloadLetter: "📄 Download Summary Letter",
    findVITA: "📍 Find Free Tax Help Near You",
    disclaimer: "Important: This AI assistant helps you prepare a draft of your 1040. It is not a licensed tax preparer. Always review the results with a tax professional or at a free IRS VITA site before filing.",
    refundMsg: "Estimated Refund",
    owedMsg: "Estimated Amount Owed",
    refundNote: "This is an estimate based on your documents. A tax professional can verify the final number.",
    payer: "Payer",
    wages: "Wages",
    retirement: "Retirement income",
    ssBenefits: "Social Security benefits",
    interest: "Interest income",
    fedTax: "Federal tax withheld",
  },
  es: {
    uploadTitle: "📂 Suba Sus Documentos de Impuestos",
    uploadDesc: "Suba su W-2, 1099-R (jubilación), SSA-1099 (Seguro Social), 1099-INT (interés bancario) u otros formularios. Aceptamos PDF o fotos (JPG, PNG).",
    uploadBtn: "🔍 Leer Mis Documentos con IA",
    tapHere: "Toque aquí para elegir archivos",
    dragDrop: "o arrastre y suelte aquí",
    accepts: "Acepta: PDF, JPG, PNG",
    noFiles: "No hay archivos todavía. Toque arriba para comenzar.",
    docsRead: "✅ Documentos Leídos con Éxito",
    docsDesc: "Esto es lo que encontramos en sus documentos:",
    questions: "❓ Unas Preguntas Rápidas",
    questionsDesc: "Por favor responda estas preguntas para completar su 1040 correctamente.",
    calculate: "📊 Calcular Mi 1040-SR",
    draftSummary: "📋 Su Formulario 1040-SR — Borrador",
    draftDesc: "Cada línea corresponde a una línea real del Formulario 1040 del IRS (2025).",
    nextSteps: "📌 Próximos Pasos",
    printPage: "🖨️ Imprimir Esta Página",
    startOver: "🔄 Empezar de Nuevo",
    downloadLetter: "📄 Descargar Carta de Resumen",
    findVITA: "📍 Encontrar Ayuda Gratuita Cerca",
    disclaimer: "Importante: Este asistente de IA le ayuda a preparar un borrador de su 1040. No es un preparador de impuestos con licencia. Siempre revise los resultados con un profesional o en un sitio VITA del IRS antes de presentar.",
    refundMsg: "Reembolso Estimado",
    owedMsg: "Cantidad Estimada a Pagar",
    refundNote: "Esta es una estimación basada en sus documentos. Un profesional puede verificar el número final.",
    payer: "Pagador",
    wages: "Salarios",
    retirement: "Ingreso de jubilación",
    ssBenefits: "Beneficios del Seguro Social",
    interest: "Ingreso por intereses",
    fedTax: "Impuesto federal retenido",
  }
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("en");
  const [hasAccepted, setHasAccepted] = useState(false);
  const [explainer, setExplainer] = useState(null); // 0=upload, 1=processing, 2=qa, 3=results
  const [files, setFiles] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [manualInputs, setManualInputs] = useState({});
  const [result, setResult] = useState(null);
  const [processingMsg, setProcessingMsg] = useState("Reading your documents…");

  // Drag & drop
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setHovering(false);
    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf" || f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const onFileInput = (e) => {
    const picked = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...picked]);
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  // Process documents with Claude API
  async function processDocuments() {
    setStep(1);
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProcessingMsg(`🔒 Protecting privacy in document ${i + 1} of ${files.length}…`);
      await new Promise(r => setTimeout(r, 600)); // show privacy step
      setProcessingMsg(`📄 Reading financial data from document ${i + 1} of ${files.length}: ${file.name}…`);

      try {
        const isPDF = file.type === "application/pdf";
        const model = "gemini-2.0-flash";

        let b64, mediaType;
        if (isPDF) {
          // Convert PDF to PNG image so Gemini can read it reliably
          setProcessingMsg(`🖼️ Converting PDF to image for document ${i + 1} of ${files.length}…`);
          b64 = await pdfToImageBase64(file);
          mediaType = "image/png";
        } else {
          b64 = await toBase64(file);
          mediaType = file.type;
        }

        const parts = [
          { inline_data: { mime_type: mediaType, data: b64 } },
          { text: PRIVACY_INSTRUCTION + SYSTEM_PROMPT + "\n\nThis is an IRS W-2 or tax document. Extract ONLY the financial amounts exactly as shown. Box 1 wages are the most important field. Return only valid JSON. Never include SSN, account numbers, or personal identifiers." },
        ];

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts }],
              generationConfig: { temperature: 0.1, maxOutputTokens: 1000 },
            }),
          }
        );

        const data = await response.json();
        console.log("🔍 Full Gemini API response:", JSON.stringify(data).slice(0, 500));
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        console.log("🔍 Gemini raw response for", file.name, ":", text); // debug
        const clean = text.replace(/```json|```/g, "").trim();
        let parsed;
        try {
          parsed = JSON.parse(clean);
        } catch (parseErr) {
          console.error("JSON parse error:", parseErr, "Raw text:", text);
          parsed = { documentType: "Parse Error", notes: "AI returned unexpected format. Try uploading a clearer image." };
        }
        // Validate wages field specifically
        if (parsed.wages === undefined || parsed.wages === null) parsed.wages = 0;
        console.log("✅ Parsed data:", parsed); // debug
        results.push({ fileName: file.name, ...parsed });
      } catch (err) {
        results.push({ fileName: file.name, documentType: "Error", notes: `Could not read: ${err.message}` });
      }
    }

    setExtractedData(results);
    setStep(2);
  }

  // Handle Q&A answers
  function answerQuestion(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function allAnswered() {
    const visibleQuestions = QUESTIONS.filter(q => {
      if (q.showIfMarried && answers.married !== "Married Filing Jointly") return false;
      if (q.showIfCapGains && answers.hasCapitalGains !== "Yes") return false;
      return true;
    });
    return visibleQuestions.every((q) => answers[q.id]);
  }

  function computeResults() {
    const r = compute1040(extractedData, answers, manualInputs);
    setResult(r);
    setStep(3);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const stepLabels = ["1. Upload Docs", "2. AI Reading", "3. Your Info", "4. Results"];

  return (
    <div style={styles.app}>
      {/* Terms of Use Modal — MUST be first, blocks everything */}
      {!hasAccepted && (
        <TermsModal lang={lang} onAccept={() => setHasAccepted(true)} />
      )}

      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>📋</span>
        <div style={{ flex: 1 }}>
          <div style={styles.headerTitle}>Form Helper</div>
          <div style={styles.headerSub}>Free AI tax assistant for seniors — simple, clear, secure</div>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", opacity: 0.8, lineHeight: "1.6" }}>
          <div>Built by <strong>Aarthi Nelatoor</strong></div>
          <div>Ardrey Kell High School</div>
          <div>Charlotte, NC</div>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: "8px", border: "none", fontSize: "14px", cursor: "pointer", background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
          </select>
        </div>
      </div>

      <div style={styles.main}>
        {/* Progress */}
        <div style={styles.progress}>
          {stepLabels.map((label, i) => ({
            ...styles.progressStep,
            ...(i === step ? styles.progressStepActive : {}),
            ...(i < step ? styles.progressStepDone : {}),
          })).map((s, i) => (
            <div key={i} style={s}>{i < step ? "✓ " : ""}{stepLabels[i]}</div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          ⚠️ {T[lang].disclaimer}
        </div>

        {/* STEP 0: Upload */}
        {step === 0 && (
          <div style={styles.card}>
            <div style={styles.sectionTitle}>📂 Upload Your Tax Documents</div>
            <div style={styles.sectionDesc}>
              Upload your W-2, 1099-R (retirement), SSA-1099 (Social Security), 1099-INT (bank interest), or other tax forms. You can upload multiple files. We accept PDF or photos (JPG, PNG).
            </div>

            <div
              style={{ ...styles.uploadZone, ...(hovering ? styles.uploadZoneHover : {}) }}
              onDragOver={(e) => { e.preventDefault(); setHovering(true); }}
              onDragLeave={() => setHovering(false)}
              onDrop={onDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div style={styles.uploadIcon}>📤</div>
              <div style={styles.uploadText}>Tap here to choose files</div>
              <div style={styles.uploadSub}>or drag and drop them here</div>
              <div style={{ marginTop: "12px", fontSize: "14px", color: colors.textMuted }}>
                Accepts: PDF, JPG, PNG
              </div>
              <div style={{ marginTop: "10px", fontSize: "13px", color: colors.success, background: colors.successLight, padding: "8px 14px", borderRadius: "8px", border: `1px solid #A9DFBF` }}>
                🔒 SSNs and account numbers are automatically protected before any AI processing
              </div>
              <input
                id="fileInput"
                type="file"
                accept=".pdf,image/*"
                multiple
                style={{ display: "none" }}
                onChange={onFileInput}
              />
            </div>

            {files.length > 0 && (
              <div style={styles.fileList}>
                {files.map((f, i) => (
                  <div key={i} style={styles.fileItem}>
                    <span>✅</span>
                    <span style={{ flex: 1, fontWeight: "bold" }}>{f.name}</span>
                    <span style={{ color: colors.textMuted, fontSize: "14px" }}>
                      {(f.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      onClick={() => removeFile(i)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: colors.danger, fontSize: "18px", padding: "0 4px" }}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  style={{ ...styles.btn, ...(files.length === 0 ? styles.btnDisabled : styles.btnPrimary), marginTop: "12px", width: "100%", justifyContent: "center" }}
                  disabled={files.length === 0}
                  onClick={processDocuments}
                >
                  🔍 Read My Documents with AI
                </button>
              </div>
            )}

            {files.length === 0 && (
              <div style={{ textAlign: "center", marginTop: "24px", color: colors.textMuted, fontSize: "16px" }}>
                No files uploaded yet. Tap above to get started.
              </div>
            )}
          </div>
        )}

        {/* STEP 1: Processing */}
        {step === 1 && (
          <div style={{ ...styles.card, textAlign: "center", padding: "60px 28px" }}>
            <div style={{ fontSize: "56px", marginBottom: "20px" }}>🤖</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: colors.primary, marginBottom: "12px" }}>
              {processingMsg}
            </div>
            <div style={{ fontSize: "17px", color: colors.textMuted, marginBottom: "32px" }}>
              The AI is carefully reading your documents. This may take a moment.
            </div>
            <div>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ ...styles.loadingDot, animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
          </div>
        )}

        {/* STEP 2: Q&A */}
        {step === 2 && (
          <div>
            {/* Show extracted summary */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>✅ Documents Read Successfully</div>
              <div style={styles.sectionDesc}>Here is what we found in your tax documents:</div>
              {extractedData.map((doc, i) => (
                <div key={i} style={{ marginBottom: "16px", padding: "16px", background: colors.primaryLight, borderRadius: "10px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    📄 {doc.fileName} — <span style={{ color: colors.primary }}>{doc.documentType}</span>
                    <span style={{ fontSize: "12px", background: colors.successLight, color: colors.success, padding: "2px 8px", borderRadius: "20px", border: `1px solid #A9DFBF` }}>🔒 SSN Protected</span>
                  </div>
                  {doc.employerOrPayer && <div style={{ fontSize: "15px", marginBottom: "4px" }}>Payer: <strong>{doc.employerOrPayer}</strong></div>}
                  {doc.wages > 0 && <div style={{ fontSize: "15px" }}>Wages: <strong>{fmt(doc.wages)}</strong></div>}
                  {doc.retirementDistribution > 0 && <div style={{ fontSize: "15px" }}>Retirement income: <strong>{fmt(doc.retirementDistribution)}</strong></div>}
                  {doc.socialSecurityBenefits > 0 && <div style={{ fontSize: "15px" }}>Social Security benefits: <strong>{fmt(doc.socialSecurityBenefits)}</strong></div>}
                  {doc.interestIncome > 0 && <div style={{ fontSize: "15px" }}>Interest income: <strong>{fmt(doc.interestIncome)}</strong></div>}
                  {doc.federalTaxWithheld > 0 && <div style={{ fontSize: "15px" }}>Federal tax withheld: <strong>{fmt(doc.federalTaxWithheld)}</strong></div>}
                  {doc.notes && <div style={{ fontSize: "14px", color: colors.warning, marginTop: "6px" }}>⚠️ {doc.notes}</div>}
                  {/* Debug panel */}
                  <details style={{ marginTop: "10px" }}>
                    <summary style={{ fontSize: "13px", color: colors.textMuted, cursor: "pointer" }}>🔍 Show raw AI response (tap to debug)</summary>
                    <pre style={{ fontSize: "12px", background: "#f0f0f0", padding: "10px", borderRadius: "8px", marginTop: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(doc, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>

            {/* Q&A */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>❓ A Few Quick Questions</div>
              <div style={styles.sectionDesc}>
                Please answer these questions so we can fill out your 1040 correctly. Tap your answer.
              </div>
              {QUESTIONS.filter(q => {
                  if (q.showIfMarried && answers.married !== 'Married Filing Jointly') return false;
                  if (q.showIfCapGains && answers.hasCapitalGains !== 'Yes') return false;
                  return true;
                }).map((q) => (
                <div key={q.id} style={styles.qaBlock}>
                  <div style={styles.qaQuestion}>{q.text}</div>
                  {q.hint && <div style={{ fontSize: "15px", color: colors.textMuted, marginBottom: "10px" }}>{q.hint}</div>}
                  <div style={styles.qaOptions}>
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        style={{
                          ...styles.qaOption,
                          ...(answers[q.id] === opt ? styles.qaOptionSelected : {}),
                        }}
                        onClick={() => answerQuestion(q.id, opt)}
                      >
                        {answers[q.id] === opt ? "✓ " : ""}{opt}
                      </button>
                    ))}
                  </div>
                  {q.inputId && answers[q.id] === q.showInputIf && (
                    <div style={{ marginTop: "12px" }}>
                      <label style={{ fontSize: "15px", display: "block", marginBottom: "6px", color: colors.primary, fontWeight: "bold" }}>
                        {q.inputLabel}
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Enter amount..."
                        value={manualInputs[q.inputId] || ""}
                        onChange={(e) => setManualInputs(prev => ({ ...prev, [q.inputId]: e.target.value }))}
                        style={{ padding: "12px 16px", fontSize: "18px", borderRadius: "10px", border: `2px solid ${colors.primary}`, width: "220px", outline: "none" }}
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                style={{
                  ...styles.btn,
                  ...(allAnswered() ? styles.btnAccent : styles.btnDisabled),
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "8px",
                }}
                disabled={!allAnswered()}
                onClick={computeResults}
              >
                📊 Calculate My 1040
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && result && (
          <div>
            {/* Refund / owed banner */}
            <div style={{
              ...styles.card,
              background: result.line35a_refund > 0 ? colors.successLight : colors.dangerLight,
              border: `2px solid ${result.line35a_refund > 0 ? "#A9DFBF" : "#F1948A"}`,
              textAlign: "center",
              padding: "32px",
            }}>
              <div style={{ fontSize: "48px" }}>{result.line35a_refund > 0 ? "🎉" : "📬"}</div>
              <div style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px", color: result.line35a_refund > 0 ? colors.success : colors.danger }}>
                {result.line35a_refund > 0
                  ? `Estimated Refund: ${fmt(result.line35a_refund)}`
                  : `Estimated Amount Owed: ${fmt(result.line37_amountOwed)}`}
              </div>
              <div style={{ fontSize: "16px", color: colors.textMuted }}>
                This is an estimate based on your documents. A tax professional can verify the final number.
              </div>
            </div>

            {/* 1040 Line breakdown */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>📋 Your Form 1040-SR — Draft Summary</div>
              <div style={styles.sectionDesc}>Each line below matches a real line on IRS Form 1040-SR (2025).</div>

              {[
                { label: "Wages, salaries, tips", line: "Line 1a", value: result.line1a_wages },
                { label: "Taxable interest", line: "Line 2b", value: result.line2b_interest },
                { label: "Qualified dividends", line: "Line 3a", value: result.line3a_qualifiedDiv },
                { label: "Ordinary dividends", line: "Line 3b", value: result.line3b_dividends },
                { label: "IRA / pension / annuity distributions", line: "Line 4b", value: result.line4b_retirement },
                { label: "Social Security benefits (total)", line: "Line 5a", value: result.line5a_ssBenefits },
                { label: "Taxable Social Security", line: "Line 5b", value: result.line5b_taxableSS },
                { label: result.line6b_capitalGains >= 0 ? `Capital gains${result.line6b_capitalGains > 0 && result.line6b_isLongTerm ? " (long-term rate applies)" : ""}` : "Capital loss (up to $3,000 deductible)", line: "Line 6b", value: result.line6b_capitalGains },
                null,
                { label: "Total income", line: "Line 7", value: result.line7_totalIncome, bold: true },
                { label: "Adjusted Gross Income (AGI)", line: "Line 11", value: result.line11_agi, bold: true },
                { label: result.line12_isItemized ? "Itemized deductions (Schedule A)" : `Standard deduction 2025${is65OrSpouse65(answers) ? " (senior bonus included)" : ""}`, line: "Line 12", value: result.line12_deduction },
                result.line12_isItemized ? { label: `  — Medical: ${fmt(result.line12_itemizedBreakdown.deductibleMedical)}  Charity: ${fmt(result.line12_itemizedBreakdown.charitableAmt)}  Mortgage: ${fmt(result.line12_itemizedBreakdown.mortgageAmt)}`, line: "", value: null, note: true } : null,
                { label: "Taxable income", line: "Line 15", value: result.line15_taxableIncome, bold: true },
                { label: "Tax on ordinary income", line: "Line 16", value: result.line16_ordinaryTax },
                result.line16_ltcgTax > 0 ? { label: "Tax on long-term capital gains (preferential rate)", line: "", value: result.line16_ltcgTax } : null,
                { label: "Total tax", line: "Line 16", value: result.line16_tax, bold: true },
                null,
                { label: "Federal income tax withheld", line: "Line 25a", value: result.line25a_fedWithheld },
                result.line26_estimatedPayments > 0 ? { label: "Estimated tax payments", line: "Line 26", value: result.line26_estimatedPayments } : null,
                { label: "Total payments", line: "Line 33", value: result.line33_totalPayments, bold: true },
                null,
                { label: "Refund", line: "Line 35a", value: result.line35a_refund, highlight: result.line35a_refund > 0 ? "success" : null },
                { label: "Amount you owe", line: "Line 37", value: result.line37_amountOwed, highlight: result.line37_amountOwed > 0 ? "danger" : null },
              ].filter(Boolean).map((item, i) =>
                item === null ? (
                  <div key={i} style={{ borderTop: `2px solid ${colors.border}`, margin: "8px 0" }} />
                ) : item.note ? (
                  <div key={i} style={{ fontSize: "13px", color: colors.textMuted, padding: "4px 8px 8px", fontStyle: "italic" }}>
                    {item.label}
                  </div>
                ) : item.value === null ? null : (
                  <div key={i} style={{
                    ...styles.resultLine,
                    flexDirection: "column",
                    alignItems: "stretch",
                    fontWeight: item.bold ? "bold" : "normal",
                    background: item.highlight === "success" ? colors.successLight : item.highlight === "danger" ? colors.dangerLight : "transparent",
                    borderRadius: item.highlight ? "8px" : "0",
                    padding: item.highlight ? "12px" : "14px 0",
                    marginBottom: item.highlight ? "4px" : "0",
                  }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.resultLabel}>
                      {item.label}
                      <span style={styles.resultLineNum}>{item.line}</span>
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.line && LINE_EXPLAINERS[item.line] && (
                      <button
                        onClick={() => setExplainer(explainer === item.line ? null : item.line)}
                        style={{ background: explainer === item.line ? colors.primary : colors.primaryLight, border: "none", borderRadius: "50%", width: "22px", height: "22px", fontSize: "12px", cursor: "pointer", color: explainer === item.line ? "#fff" : colors.primary, fontWeight: "bold", flexShrink: 0 }}
                        title="What does this mean?"
                      >?</button>
                    )}
                    <span style={{
                      ...styles.resultValue,
                      color: item.highlight === "success" ? colors.success : item.highlight === "danger" ? colors.danger : colors.primary,
                    }}>
                      {fmt(item.value)}
                    </span>
                  </div>
                  {explainer === item.line && LINE_EXPLAINERS[item.line] && (
                    <div style={{ background: colors.primaryLight, borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: colors.primary, lineHeight: "1.6", marginTop: "4px" }}>
                      💡 {LINE_EXPLAINERS[item.line]}
                    </div>
                  )}
                  </div>
                </div>
                )
              )}
            </div>

            {/* Standard vs Itemized comparison — always shown when user asked to compare */}
            {result && result.line12_itemizedBreakdown && (
              <div style={styles.card}>
                <div style={styles.sectionTitle}>
                  ⚖️ {lang === "es" ? "Comparación: Deducción Estándar vs. Desglosada" : "Comparison: Standard vs. Itemized Deduction"}
                </div>
                <div style={{ fontSize: "15px", color: colors.textMuted, marginBottom: "16px" }}>
                  {lang === "es"
                    ? "Comparamos ambas opciones y elegimos la que le ahorra más dinero:"
                    : "We compared both options and chose whichever saves you more money:"}
                </div>

                {/* Side by side cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                  {/* Standard deduction card */}
                  <div style={{
                    borderRadius: "12px", padding: "18px", textAlign: "center",
                    background: result.line12_isItemized ? "#f5f5f5" : colors.successLight,
                    border: `2px solid ${result.line12_isItemized ? colors.border : colors.success}`,
                  }}>
                    <div style={{ fontSize: "13px", color: colors.textMuted, marginBottom: "6px", fontWeight: "bold" }}>
                      {lang === "es" ? "📋 Deducción Estándar" : "📋 Standard Deduction"}
                    </div>
                    <div style={{ fontSize: "26px", fontWeight: "bold", color: result.line12_isItemized ? colors.textMuted : colors.success, textDecoration: result.line12_isItemized ? "line-through" : "none" }}>
                      {fmt(result.line12_isItemized ? result.line12_itemizedBreakdown.stdForComparison || 14600 : result.line12_deduction)}
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "8px", color: result.line12_isItemized ? colors.textMuted : colors.success, fontWeight: "bold" }}>
                      {result.line12_isItemized
                        ? (lang === "es" ? "❌ No usado" : "❌ Not used")
                        : (lang === "es" ? "✅ Se usó esta — ahorra más" : "✅ Used — saves you more")}
                    </div>
                  </div>

                  {/* Itemized deduction card */}
                  <div style={{
                    borderRadius: "12px", padding: "18px", textAlign: "center",
                    background: result.line12_isItemized ? colors.successLight : "#f5f5f5",
                    border: `2px solid ${result.line12_isItemized ? colors.success : colors.border}`,
                  }}>
                    <div style={{ fontSize: "13px", color: colors.textMuted, marginBottom: "6px", fontWeight: "bold" }}>
                      {lang === "es" ? "📝 Deducciones Desglosadas" : "📝 Itemized Deductions"}
                    </div>
                    <div style={{ fontSize: "26px", fontWeight: "bold", color: result.line12_isItemized ? colors.success : colors.textMuted, textDecoration: result.line12_isItemized ? "none" : "line-through" }}>
                      {fmt(result.line12_itemizedBreakdown.total)}
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "8px", color: result.line12_isItemized ? colors.success : colors.textMuted, fontWeight: "bold" }}>
                      {result.line12_isItemized
                        ? (lang === "es" ? "✅ Se usó esta — ahorra más" : "✅ Used — saves you more")
                        : (lang === "es" ? "❌ No usado" : "❌ Not used")}
                    </div>
                  </div>
                </div>

                {/* Itemized breakdown */}
                {result.line12_itemizedBreakdown.total > 0 && (
                  <div style={{ background: colors.primaryLight, borderRadius: "10px", padding: "14px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: colors.primary, marginBottom: "10px" }}>
                      {lang === "es" ? "Desglose de sus deducciones:" : "Your itemized deduction breakdown:"}
                    </div>
                    {result.line12_itemizedBreakdown.deductibleMedical > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "6px 0", borderBottom: `1px solid #AED6F1` }}>
                        <span>🏥 {lang === "es" ? "Gastos médicos (sobre el límite del 7.5%)" : "Medical expenses (above 7.5% AGI floor)"}</span>
                        <strong>{fmt(result.line12_itemizedBreakdown.deductibleMedical)}</strong>
                      </div>
                    )}
                    {result.line12_itemizedBreakdown.charitableAmt > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "6px 0", borderBottom: `1px solid #AED6F1` }}>
                        <span>🙏 {lang === "es" ? "Donaciones benéficas" : "Charitable donations"}</span>
                        <strong>{fmt(result.line12_itemizedBreakdown.charitableAmt)}</strong>
                      </div>
                    )}
                    {result.line12_itemizedBreakdown.mortgageAmt > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "6px 0" }}>
                        <span>🏠 {lang === "es" ? "Interés hipotecario" : "Mortgage interest"}</span>
                        <strong>{fmt(result.line12_itemizedBreakdown.mortgageAmt)}</strong>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "bold", color: colors.primary, marginTop: "8px", paddingTop: "8px", borderTop: `2px solid #AED6F1` }}>
                      <span>{lang === "es" ? "Total desglosado" : "Total itemized"}</span>
                      <span>{fmt(result.line12_itemizedBreakdown.total)}</span>
                    </div>
                  </div>
                )}

                {/* Winner banner */}
                <div style={{ marginTop: "14px", padding: "12px 16px", borderRadius: "10px", background: result.line12_isItemized ? colors.successLight : colors.primaryLight, border: `1px solid ${result.line12_isItemized ? "#A9DFBF" : "#AED6F1"}`, fontSize: "15px", fontWeight: "bold", color: result.line12_isItemized ? colors.success : colors.primary }}>
                  {result.line12_isItemized
                    ? (lang === "es" ? `✅ Resultado: Desglosar le ahorra ${fmt(result.line12_itemizedBreakdown.total - (result.line12_itemizedBreakdown.stdForComparison || 14600))} más que la deducción estándar.` : `✅ Result: Itemizing saves you ${fmt(result.line12_itemizedBreakdown.total - (result.line12_itemizedBreakdown.stdForComparison || 14600))} more than the standard deduction.`)
                    : (lang === "es" ? `✅ Resultado: La deducción estándar de ${fmt(result.line12_deduction)} es mejor para usted.` : `✅ Result: The standard deduction of ${fmt(result.line12_deduction)} is better for you.`)}
                </div>
              </div>
            )}

            {/* VITA Locator */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>📍 {lang === "es" ? "Encuentre Ayuda Gratuita" : "Find Free Tax Help Near You"}</div>
              <div style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "16px", lineHeight: "1.6" }}>
                {lang === "es"
                  ? "Los sitios VITA del IRS ofrecen preparación de impuestos GRATUITA para personas mayores. Voluntarios capacitados revisarán su borrador sin costo."
                  : "IRS VITA sites offer FREE tax preparation for seniors. Trained volunteers will review your draft and file for you at no cost."}
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={() => window.open("https://irs.treasury.gov/freetaxprep/", "_blank")}>
                  📍 {lang === "es" ? "Buscar Sitio VITA" : "Find VITA Site Near Me"}
                </button>
                <button style={{ ...styles.btn, background: colors.accentLight, color: colors.accent, border: `1px solid #F0C48A` }} onClick={() => window.open("tel:18008290582")}>
                  📞 1-800-829-0582
                </button>
              </div>
            </div>

            {/* Personal Summary Letter */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>📄 {lang === "es" ? "Su Carta de Resumen Personal" : "Your Personal Summary Letter"}</div>
              <div style={{ fontSize: "15px", color: colors.textMuted, marginBottom: "16px" }}>
                {lang === "es" ? "Imprima esta carta y llévela a su preparador de impuestos." : "Print this letter and bring it to your tax preparer or VITA site."}
              </div>
              <div id="summary-letter" style={{ background: "#f9f7f3", border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "28px", fontFamily: "Georgia, serif", fontSize: "15px", lineHeight: "1.9", marginBottom: "16px" }}>
                <div style={{ textAlign: "right", color: colors.textMuted, fontSize: "13px" }}>Form Helper — {new Date().toLocaleDateString()}</div>
                <div style={{ fontWeight: "bold", fontSize: "18px", margin: "12px 0 20px" }}>
                  {lang === "es" ? "Estimado Preparador de Impuestos:" : "Dear Tax Preparer,"}
                </div>
                <p style={{ marginBottom: "14px" }}>
                  {lang === "es"
                    ? "Este resumen fue preparado con Form Helper, una herramienta gratuita de IA para personas mayores, creada por Aarthi Nelatoor de Ardrey Kell High School en Charlotte, NC. El contribuyente ha subido sus documentos fiscales para el año fiscal 2024."
                    : "This summary was prepared using Form Helper, a free AI tax assistant for seniors — built by Aarthi Nelatoor, Ardrey Kell High School, Charlotte NC. The taxpayer uploaded their tax documents for tax year 2025."}
                </p>
                <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{lang === "es" ? "Ingresos encontrados:" : "Income found:"}</p>
                <ul style={{ paddingLeft: "24px", marginBottom: "14px" }}>
                  {result && result.line1a_wages > 0 && <li>{lang === "es" ? "Salarios (Línea 1a)" : "Wages (Line 1a)"}: <strong>{fmt(result.line1a_wages)}</strong></li>}
                  {result && result.line4b_retirement > 0 && <li>{lang === "es" ? "Jubilación (Línea 4b)" : "Retirement distributions (Line 4b)"}: <strong>{fmt(result.line4b_retirement)}</strong></li>}
                  {result && result.line5a_ssBenefits > 0 && <li>{lang === "es" ? "Seguro Social (Línea 5a)" : "Social Security benefits (Line 5a)"}: <strong>{fmt(result.line5a_ssBenefits)}</strong></li>}
                  {result && result.line6b_capitalGains !== 0 && <li>{lang === "es" ? "Ganancias de capital (Línea 6b)" : "Capital gains (Line 6b)"}: <strong>{fmt(result.line6b_capitalGains)}</strong></li>}
                  {result && result.line2b_interest > 0 && <li>{lang === "es" ? "Intereses (Línea 2b)" : "Interest income (Line 2b)"}: <strong>{fmt(result.line2b_interest)}</strong></li>}
                </ul>
                <ul style={{ paddingLeft: "24px", marginBottom: "14px" }}>
                  <li>{lang === "es" ? "Ingreso bruto ajustado (AGI)" : "Adjusted Gross Income (AGI)"}: <strong>{result ? fmt(result.line11_agi) : "$0"}</strong></li>
                  <li>{lang === "es" ? "Deducción utilizada" : "Deduction used"}: <strong>{result ? fmt(result.line12_deduction) : "$0"}</strong> ({result && result.line12_isItemized ? (lang === "es" ? "desglosada" : "itemized") : (lang === "es" ? "estándar" : "standard")})</li>
                  <li>{lang === "es" ? "Impuesto estimado" : "Estimated tax"}: <strong>{result ? fmt(result.line16_tax) : "$0"}</strong></li>
                  <li>{lang === "es" ? "Impuesto retenido" : "Federal tax withheld"}: <strong>{result ? fmt(result.line25a_fedWithheld) : "$0"}</strong></li>
                </ul>
                <p style={{ marginBottom: "14px" }}>
                  <strong>{lang === "es" ? "Resultado estimado: " : "Estimated result: "}</strong>
                  {result && result.line35a_refund > 0
                    ? (lang === "es" ? `Reembolso de aproximadamente ${fmt(result.line35a_refund)}.` : `A refund of approximately ${fmt(result.line35a_refund)}.`)
                    : (lang === "es" ? `Cantidad a pagar de aproximadamente ${fmt(result ? result.line37_amountOwed : 0)}.` : `An amount owed of approximately ${fmt(result ? result.line37_amountOwed : 0)}.`)}
                </p>
                <p style={{ fontSize: "13px", color: colors.textMuted, fontStyle: "italic" }}>
                  {lang === "es"
                    ? "⚠️ Esta es una estimación de IA solamente. Todos los números deben verificarse con documentos originales antes de presentar."
                    : "⚠️ This is an AI estimate only. All figures should be verified against original documents before filing."}
                </p>
                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${colors.border}`, fontSize: "13px", color: colors.textMuted }}>
                  Form Helper | {lang === "es" ? "Creado por" : "Built by"} Aarthi Nelatoor | Ardrey Kell High School | Charlotte, NC
                </div>
              </div>
              <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={() => window.print()}>
                🖨️ {lang === "es" ? "Imprimir Esta Carta" : "Print This Letter"}
              </button>
            </div>

            {/* Next steps */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>📌 {lang === "es" ? "Próximos Pasos" : "What to Do Next"}</div>
              {[
                { icon: "👩‍💼", text: lang === "es" ? "Lleve este resumen a un sitio VITA del IRS o a un CPA para revisión final." : "Take this summary to a free IRS VITA site or a CPA for final review." },
                { icon: "🖨️", text: lang === "es" ? "Imprima esta página o guárdela como PDF para llevarla." : "Print this page or save it as a PDF to bring with you." },
                { icon: "📂", text: lang === "es" ? "Traiga sus documentos originales (W-2, 1099s, carta del Seguro Social)." : "Bring your original documents (W-2, 1099s, SS letter) to the appointment." },
                { icon: "🔒", text: lang === "es" ? "Sus documentos NO fueron guardados. Todo se procesó en memoria solamente." : "Your documents were NOT saved or stored. All data processed in memory only." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${colors.border}` : "none", fontSize: "16px", lineHeight: "1.6" }}>
                  <span style={{ fontSize: "24px" }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={() => window.print()}>
                🖨️ {lang === "es" ? "Imprimir" : "Print This Page"}
              </button>
              <button style={{ ...styles.btn, background: colors.border, color: colors.text }}
                onClick={() => { setStep(0); setFiles([]); setExtractedData([]); setAnswers({}); setManualInputs({}); setResult(null); }}>
                🔄 {lang === "es" ? "Empezar de Nuevo" : "Start Over"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating chat assistant — available on every step */}
      <TaxChat />

      {/* Footer */}
      <div style={{ background: colors.primary, color: "#fff", padding: "20px 32px", textAlign: "center", fontSize: "13px", opacity: 0.9, lineHeight: "1.8" }}>
        <div><strong>Form Helper</strong> — Free AI Tax Assistant for Seniors</div>
        <div>Built by <strong>Aarthi Nelatoor</strong> | Ardrey Kell High School | Charlotte, NC</div>
        <div style={{ opacity: 0.7, marginTop: "4px" }}>
          Not a licensed tax preparer. Always verify with a professional before filing. |{" "}
          <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open("https://irs.treasury.gov/freetaxprep/", "_blank")}>
            Find free VITA help near you
          </span>
        </div>
      </div>
    </div>
  );
}
