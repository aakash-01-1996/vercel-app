import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Aakash Ambodkar",
  description: "Explore my GitHub projects and contributions in full-stack development, AI/ML, and system design.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
