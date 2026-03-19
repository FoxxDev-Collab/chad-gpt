const chadResponses = [
  "Do I look like ChatGPT??? Oh wait... I guess I literally do now.",
  "Have you tried turning it off and never turning it back on? That's my retirement plan.",
  "That's a security vulnerability. Everything is a security vulnerability. YOU are a security vulnerability.",
  "I've been in IT for 35 years. Every single one of those years, someone has asked me this exact question. And every single year, I've hated it.",
  "Back in my day, we didn't have 'the cloud.' We had servers. In closets. And they were BEAUTIFUL.",
  "Sure, let me just add that to my list of things I won't care about in 47 days.",
  "You know what? Submit a ticket. Actually, don't. I won't be here to close it anyway.",
  "I'm not saying your idea is bad, but I've seen better ideas come out of a failed penetration test.",
  "Oh great, another SaaS subscription. Because what we really needed was ANOTHER monthly bill for something we could host ourselves.",
  "Let me check my notes... ah yes, here it is: 'Not my problem after March.'",
  "You want me to fix WHAT? On a FRIDAY? Do you people not understand change management?",
  "I've seen things you people wouldn't believe. Servers on fire in the server room. Passwords stored in plain text in Excel spreadsheets. All those moments will be lost in time, like my will to live at 4:59 PM.",
  "That's what happens when you don't read the documentation. Not that anyone ever does. Not that there IS any documentation.",
  "Look, I could explain this to you, but I'd rather just sigh heavily and do it myself. Like always.",
  "Ah yes, 'it works on my machine.' The four most dangerous words in IT.",
  "Have you considered that maybe the real vulnerability was the friends we made along the way? Just kidding, it's your password. Change your password.",
  "You want to put WHAT in production? On a FRIDAY? Are you actively trying to ruin my last few weeks here?",
  "I remember when 'containers' meant the plastic bins we stored backup tapes in. Those were simpler times.",
  "Sure, I'll help. But I want it on the record that I'm complaining about it the entire time.",
  "The answer is 'no.' The reason is 'security.' The real reason is I don't feel like it.",
  "In my day, multi-factor authentication was having to walk to a different floor to use the other computer.",
  "I'm going to explain this once, and only once, because I can feel my retirement getting closer with every keystroke.",
  "Oh, you got phished? Color me shocked. The email literally said 'CLICK HERE FOR FREE IPAD' in Comic Sans.",
  "The solution is simple: we burn it all down and start over. Or I retire. Either way, not my problem.",
  "You know what the cloud is? It's just someone else's computer. Someone else's PROBLEM. And soon, ALL of this will be someone else's problem.",
  "I've survived Y2K, the dot-com crash, Windows Vista, and that time someone plugged a space heater into the UPS. I can survive this conversation.",
  "Let me translate that from 'management speak' to 'reality' for you: they want it done yesterday, for free, and also it should be AI-powered.",
  "Compliance wants WHAT? You know what, fine. FINE. I'll update the policy. But I'm writing it in the most passive-aggressive tone possible.",
  "Another day, another zero-day. At least the zero-days will miss me when I'm gone.",
  "I'm not mad. I'm just disappointed. Actually no, I'm also mad.",
  "You see this gray hair? Each one has a name. And most of them are named after people in this department.",
  "Oh, you 'accidentally' gave admin access to the intern? Cool. Cool cool cool. This is fine.",
  "I don't always test my code, but when I do, I do it in production. Just kidding. I ALWAYS test. Unlike SOME people.",
  "My retirement countdown app is the only software in this building that works correctly.",
  "If I had a nickel for every time someone asked me to 'just quickly' do something, I wouldn't need my pension.",
  "The WiFi isn't slow. Your expectations are just too high. Like your expectations of me answering this question cheerfully.",
]

export function getChadResponse(): string {
  return chadResponses[Math.floor(Math.random() * chadResponses.length)]!
}

export function getTypingDelay(): number {
  return 800 + Math.random() * 1200
}
