import { createFileRoute } from "@tanstack/react-router";
import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/_app/meeting")({
  component: () => (
    <AiWorkspace
      tool="meeting"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a structured summary, decisions and action items."
      fields={[
        { name: "notes", label: "Raw meeting notes or transcript", placeholder: "Paste your meeting notes here…", rows: 12, required: true },
        { name: "context", label: "Optional context", placeholder: "e.g. Weekly product sync, attendees, goal of meeting" },
      ]}
      buildPrompt={(v) =>
        `Context: ${v.context || "N/A"}\n\nNotes/Transcript:\n${v.notes}`
      }
      examplePrompt={() => ({
        context: "Weekly engineering sync, 30 min",
        notes: "Alex: deploy on hold, blocker is staging db migration. Maria will pair tmrw morning. Q3 OKRs - need to cut scope on search redesign. Decision: ship MVP first, advanced filters in Q4. Jamie raised concern about test coverage; agreed to add e2e by Friday. Next: review architecture doc async.",
      })}
    />
  ),
});
