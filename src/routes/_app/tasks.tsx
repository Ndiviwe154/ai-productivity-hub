import { createFileRoute } from "@tanstack/react-router";
import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/_app/tasks")({
  component: () => (
    <AiWorkspace
      tool="tasks"
      title="AI Task Planner"
      description="Describe a goal or project. Get a prioritized, actionable task breakdown."
      fields={[
        { name: "goal", label: "Goal or project", placeholder: "What are you trying to accomplish?", rows: 3, required: true },
        { name: "deadline", label: "Deadline / timeframe", placeholder: "e.g. 2 weeks, by Sep 30" },
        { name: "constraints", label: "Constraints / context", placeholder: "Team size, dependencies, must-haves" },
      ]}
      buildPrompt={(v) =>
        `Goal: ${v.goal}\nDeadline: ${v.deadline || "unspecified"}\nConstraints: ${v.constraints || "none"}`
      }
      examplePrompt={() => ({
        goal: "Launch a public beta for our new analytics dashboard",
        deadline: "3 weeks",
        constraints: "Team of 4, marketing site already done, need docs + onboarding flow",
      })}
    />
  ),
});
