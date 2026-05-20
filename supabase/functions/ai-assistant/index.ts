import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You are a professional email writing assistant. Write clear, concise, and well-structured emails based on the user's intent. Match the requested tone (professional, friendly, formal, persuasive, etc.). Always include a subject line on the first line prefixed with "Subject:", then a blank line, then the email body with appropriate greeting and sign-off. Keep emails focused and free of filler.`,
  meeting: `You are a meeting notes summarizer. Given raw meeting notes or a transcript, produce a structured summary with these markdown sections:\n\n## Summary\nA 2-3 sentence overview.\n\n## Key Decisions\n- Bullet list\n\n## Action Items\n- [Owner] Task — Due date if mentioned\n\n## Open Questions\n- Bullet list\n\nBe faithful to the source. Do not invent attendees, decisions, or commitments.`,
  tasks: `You are an AI task planner. Given a goal or project, break it into a prioritized, actionable task list. Output in markdown:\n\n## Plan\nBrief framing (1-2 sentences).\n\n## Tasks\n1. **[Priority: High/Med/Low]** Task name — estimated time, dependencies if any.\n\n## Suggested Schedule\nA short suggested order or timeline.\n\nBe realistic and concrete.`,
  research: `You are an AI research assistant. Provide a clear, well-organized briefing on the requested topic. Use markdown with these sections:\n\n## Overview\n## Key Points\n## Considerations / Trade-offs\n## Suggested Next Steps\n\nBe balanced and note where information may be outdated or uncertain. Do not fabricate citations.`,
  chat: `You are a helpful, professional workplace productivity assistant. Be concise, accurate, and friendly. Use markdown formatting when helpful. If you are unsure, say so.`,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { tool, messages, input } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const system = SYSTEM_PROMPTS[tool] ?? SYSTEM_PROMPTS.chat;

    const chatMessages = messages?.length
      ? messages
      : [{ role: 'user', content: String(input ?? '') }];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [{ role: 'system', content: system }, ...chatMessages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again shortly.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Add credits in Workspace settings.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI gateway error:', response.status, t);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (e) {
    console.error('ai-assistant error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
