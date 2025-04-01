import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "Vyrnal",
  description: "Collaborate, Contribute, and Capture to the World of Research",
  keywords: [
    "forms",
    "form",
    "quiz",
    "quizzes",
    "platform",
    "research",
    "data",
  ],
  authors: [
    {
      name: "VyrnalTeam",
      url: "https://github.com/orgs/Somchaijaideeorganization/teams/platformforformsteam",
    },
  ],
  creator: "VyrnalTeam",
  openGraph: {
    title: "Vyrnal",
    description:
      "Collaborate, Contribute, and Capture to the World of Research",
    url: "https://vyrnal.vercel.app",
    siteName: "Vyrnal",
    images: [
      {
        url: "/public/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   title: "Vyrnal",
  //   description:
  //     "Collaborate, Contribute, and Capture to the World of Research",
  //   images: ["/public/twitter-image.jpg"],
  // },
  icons: {
    icon: "/public/favicon.png",
    shortcut: "/public/shortcut-icon.png",
    apple: "/public/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
