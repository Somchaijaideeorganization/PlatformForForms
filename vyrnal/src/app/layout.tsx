import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
