// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
























"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { quotesData, allCategories } from "@/data/quotes";

// Quote object ka type define karein
interface Quote {
  quote: string;
  author: string;
}

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [generatedQuotes, setGeneratedQuotes] = useState<Quote[]>([]);

  const handleGenerateQuotes = () => {
    if (!topic) {
        // Agar koi topic nahi hai to random quotes dikhayein
        const randomCategory = quotesData[Math.floor(Math.random() * quotesData.length)];
        setGeneratedQuotes(randomCategory.quotes);
        return;
    }
    
    const lowerCaseTopic = topic.toLowerCase();
    const category = quotesData.find(cat => cat.category.toLowerCase() === lowerCaseTopic);
    
    if (category) {
      setGeneratedQuotes(category.quotes);
    } else {
      setGeneratedQuotes([{ quote: "Sorry, is topic par koi quotes nahi mile.", author: "System" }]);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setTopic(categoryName);
    const category = quotesData.find(cat => cat.category.toLowerCase() === categoryName.toLowerCase());
    if (category) {
      setGeneratedQuotes(category.quotes);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <Card className="bg-slate-800 border-slate-700 shadow-lg shadow-cyan-500/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-cyan-400">
              AI Quote Generator Pro
            </CardTitle>
            <CardDescription className="text-slate-400 pt-2">
              Koi bhi topic likhein jaise 'motivation', 'wisdom', ya 'programming' aur quotes hasil karein.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                type="text"
                placeholder="Enter a topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-cyan-500"
              />
              <Button onClick={handleGenerateQuotes} className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold">
                Generate Quotes
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-slate-300 mr-2">Ya select karein:</span>
              {allCategories.map(category => (
                <Badge 
                    key={category} 
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-slate-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="grid gap-6">
                {generatedQuotes.map((q, index) => (
                    <Card key={index} className="bg-slate-900 border-slate-700 transform transition-transform hover:scale-105">
                        <CardContent className="p-6">
                            <p className="text-lg italic text-slate-200">"{q.quote}"</p>
                            <p className="text-right font-semibold text-cyan-400 mt-4">- {q.author}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="text-center mt-8 text-slate-500">
        <p>Built with ❤️ using Next.js 15 & ShadCN UI at Nexium.</p>
      </footer>
    </main>
  );
}