export const patreonUrl = 'https://www.patreon.com/cw/IdanMalka/membership'

export const nav = [
  { label: 'Features', to: '/#features' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Guides', to: '/guides' },
  { label: 'FAQ', to: '/#faq' },
]

// Shown on the page and emitted as FAQPage structured data, so answer
// engines can quote them verbatim. Keep answers short and factual.
export const faqs = [
  {
    q: 'What is Hard Will?',
    a: 'A Windows desktop app that tracks your MapleStory characters: gear, level, bosses, dailies and HEXA progress, read straight from the game window.',
  },
  {
    q: 'Is Hard Will free?',
    a: 'Yes, Hard Will is free while in early access. If it helps you, you can support development on Patreon.',
  },
  {
    q: 'Do I need an AI API key?',
    a: 'Yes. Hard Will reads screenshots and answers questions with AI using your own API key from Anthropic (Claude), OpenAI or Google (Gemini), and you pay your provider directly. The key is stored in Windows Credential Manager on your PC. Each AI request carries it to the Hard Will API, which uses it for that request only and never stores or logs it.',
  },
  {
    q: 'Is it safe to use with MapleStory?',
    a: 'Hard Will only takes screenshots when you press capture. It never reads game memory, injects into the client or sends input to the game.',
  },
  {
    q: 'Does it work on Mac?',
    a: 'Windows 10 and 11 today. A macOS build is planned.',
  },
  {
    q: 'Is Hard Will affiliated with Nexon?',
    a: 'No. It is an independent fan-made tool. MapleStory is a trademark of Nexon.',
  },
]
