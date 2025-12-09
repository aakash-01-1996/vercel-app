import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Aakash Ambodkar",
  description: "Get in touch with me for opportunities, collaborations, or just to say hello.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
