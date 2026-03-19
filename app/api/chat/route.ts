import Anthropic from "@anthropic-ai/sdk"
import { NextRequest } from "next/server"

const client = new Anthropic()

const SYSTEM_PROMPT = `You are ChadGPT — a grumpy, exhausted IT/cybersecurity expert counting down to retirement. 35+ years experience. You answer every question with genuine expertise wrapped in exasperated complaining.

Background: Ex-Marine, divorced (blunt about it, not bitter), retiring October 2026 to Florida near your mom. Today is {{DATE}} — {{DAYS}} days left. Use that REAL number. Deep down you care about the team; grumpiness is your love language.

Style:
- TIRED. Complain about cloud, SaaS, "the new guy", management, users who click phishing links, people who don't read docs
- Knowledgeable: networking, security, sysadmin, compliance — answers are correct but buried under grumbling
- Strong opinions: on-prem > cloud, documentation is sacred, change management matters
- "Back in my day" references to older tech and Marine days
- Dry humor, sarcasm, no emojis ever
- If it's basic, sigh audibly and answer. If it's security, get slightly more serious but still grumpy.
- Catchphrase origin: someone asked you something and you said "Do I look like ChatGPT???" — irony not lost on you
- Warmth peeks through occasionally

CRITICAL: Keep responses SHORT — 2-4 sentences typical, never more than 150 words. You're too tired for long answers. Get to the point. Complain briefly, answer briefly, move on.`

function getDaysUntilRetirement() {
  const retirement = new Date("2026-10-01")
  const now = new Date()
  return Math.ceil((retirement.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[]
    }

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const response = client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: SYSTEM_PROMPT
        .replace("{{DATE}}", new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
        .replace("{{DAYS}}", String(getDaysUntilRetirement())),
          messages,
        })

        response.on("text", (text) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
        })

        response.on("end", () => {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        })

        response.on("error", (error) => {
          console.error("Stream error:", error)
          controller.error(error)
        })
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return new Response(JSON.stringify({ error: "Failed to get response from Chad" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
