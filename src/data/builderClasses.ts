export const BUILDER_CLASSES: string[] = [
  "Terminal Dweller",
  "10x Shipper",
  "Vibe Engineer",
  "Chief Chaos Officer",
  "Principal Breaker",
  "Zero-to-Prod Wizard",
  "Async Native",
  "Stack Whisperer",
  "Deployment Prophet",
  "Context Window Enjoyer",
  "Late-Night Committer",
  "Token Economist",
  "Ship-it Shaman",
  "Rubber Duck Debugger",
  "Uptime Cultist",
  "Hackathon Hermit",
  "Web3 Alchemist",
  "Full-Stack Shapeshifter",
  "AI Prompt Ranger",
  "Open Source Pilgrim",
  "Merge Conflict Survivor",
  "Production Cowboy",
  "Code Gardener",
  "Edge Case Archaeologist",
  "Senior Stackoverflow Engineer",
  "Recursion Devotee",
  "Side Project Hoarder",
  "Regex Whisperer",
  "Infinite Loop Escapist",
  "The One Who Ships",
];

export function getRandomBuilderClass(exclude?: string): string {
  const filtered = BUILDER_CLASSES.filter(b => b !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}
