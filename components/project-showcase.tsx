"use client";

import { Project } from "@/lib/data";
import { ExternalLink } from "lucide-react";

interface ProjectShowcaseProps {
  project: Project;
}

export default function ProjectShowcase({ project }: ProjectShowcaseProps) {
  return (
    <div
      onClick={() => {
        window.open(project.link);
      }}
      className="rounded-xl border bg-card text-card-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground"
      style={{ cursor: "none" }}
      data-clickable="true"
    >
      <div className="space-y-2 p-6" data-clickable="true">
        <div className="flex space-x-1" data-clickable="true">
          <h3
            className="font-semibold leading-none tracking-tight"
            data-clickable="true"
          >
            {project.title}
          </h3>
          <ExternalLink height={15} width={15} />
        </div>
        <p className="text-sm text-muted-foreground" data-clickable="true">
          {project.description}
        </p>
      </div>
    </div>
  );
}
