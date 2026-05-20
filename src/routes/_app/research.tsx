import { createFileRoute } from "@tanstack/react-router";
import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/_app/research")({
  component: () => (
    <AiWorkspace
      tool="research"
      title="AI Research Assistant"
      description="Get a structured briefing on any topic — overview, key points, trade-offs and next steps."
      fields={[
        { name: "topic", label: "Research topic", placeholder: "What do you want to understand?", rows: 3, required: true },
        { name: "audience", label: "Audience", placeholder: "Who is this for? (e.g. exec summary, engineering team)" },
        { name: "focus", label: "Specific angles", placeholder: "Anything to emphasize or avoid" },
      ]}
      buildPrompt={(v) =>
        `Topic: ${v.topic}\nAudience: ${v.audience || "general"}\nFocus: ${v.focus || "balanced overview"}`
      }
      examplePrompt={() => ({
        topic: "Vector databases for RAG: when to use Pinecone vs pgvector vs Weaviate",
        audience: "Engineering team evaluating options",
        focus: "Cost, ops complexity, scale ceiling, lock-in",
      })}
    />
  ),
});
