import { createFileRoute } from "@tanstack/react-router";
import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/_app/email")({
  component: () => (
    <AiWorkspace
      tool="email"
      title="Smart Email Generator"
      description="Describe the email you need — we'll draft a polished, well-structured version."
      fields={[
        { name: "recipient", label: "Recipient & context", placeholder: "e.g. My manager, about a project update", required: true },
        { name: "intent", label: "What do you want to say?", placeholder: "Key points the email should cover", rows: 4, required: true },
        { name: "tone", label: "Tone", placeholder: "Professional, friendly, formal, persuasive…" },
      ]}
      buildPrompt={(v) =>
        `Write an email.\nRecipient/context: ${v.recipient}\nIntent: ${v.intent}\nTone: ${v.tone || "professional"}`
      }
      examplePrompt={() => ({
        recipient: "My manager Sarah, about a delayed deliverable",
        intent: "The Q3 dashboard ship is slipping by ~3 days due to API rate limits. Propose new date Friday, explain mitigation, ask if she wants a sync.",
        tone: "Professional, concise, accountable",
      })}
    />
  ),
});
