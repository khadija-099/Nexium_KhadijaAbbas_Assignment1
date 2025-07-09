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
// import { Badge } from "@/components/ui/badge";
import { quotesData, allCategories } from "@/data/quotes";

// Quote object ka type d
interface Quote {
  quote: string;
  author: string;
}


export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [generatedQuotes, setGeneratedQuotes] = useState<Quote[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      setGeneratedQuotes([{ quote: "Sorry, No Quotes On This Topic", author: "System" }]);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setTopic(categoryName);
    const category = quotesData.find(cat => cat.category.toLowerCase() === categoryName.toLowerCase());
    if (category) {
      setGeneratedQuotes(category.quotes);
    }
    setShowSuggestions(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTopic(inputValue);
    setGeneratedQuotes([]);
    console.log("Input Value:", inputValue); // DEBUG: Check input
    if (inputValue.length > 0){
      const lowerCaseInput = inputValue.toLowerCase();
      const filtered = allCategories.filter(category => 
        category.toLowerCase().includes(lowerCaseInput)
      );
      setFilteredCategories(filtered);
      setShowSuggestions(true);
      console.log("Filtered Categories:", filtered); // See whats being filtered
    console.log("Show Suggestions:", true); // DEBUG: Confirm showSuggestions is true
    }
    else {
      setFilteredCategories([]);
      setShowSuggestions(false); // Input empty hone par suggestions hide 
      console.log("Show Suggestions:", false); // DEBUG: Confirm showSuggestions is false
    }
  };

  return (
   <div className="app-background min-h-screen flex flex-col items-center p-4 sm:p-8">
    <main className="app-background flex flex-col items-center justify-center min-h-screen  text-white p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <Card className="bg-white/20 backdrop-blur-md border-white/20 shadow-lg shadow-cyan-500/10">
        {/* <Card className="bg-slate-800 border-slate-700 shadow-lg shadow-cyan-500/10"> */}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-cyan-300">
                Quote Generator Pro
            </CardTitle>
            <CardDescription className="pt-4 text-white/100 font-bold">
              Enter Any Topic And Get Quotes....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                type="text"
                placeholder="Enter a topic..."
                value={topic}
                
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)} // Focus par suggestions dikhayein
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} //
                
                className="
                    bg-white/5         /* Transparent white background */
                    border-white/100     /* Subtle border */
                    text-white/100
                    font-bold
                    placeholder:text-white-180 
                    placeholder:font-bold           /* Lighter placeholder */
                    focus:ring-cyan-400 focus:ring-offset-0 focus:border-cyan-400     /* Focus styles */
                    rounded-lg          /* Input field ko bhi rounded karein */
                    pr-10             /* Right padding for a potential clear button if added later */
                  "
              />

              <Button 
                  onClick={handleGenerateQuotes} 
                  className="
                    bg-cyan-600/60 /* Transparent cyan background */
                    hover:bg-cyan-500/40 /* Hover effect */
                    text-white/100 /* Button text color */
                    font-bold
                    border border-cyan-400/50 /* Subtle border */
                    shadow-md shadow-cyan-500/20 /* Subtle shadow/glow */
                    rounded-lg /* Button ko bhi rounded karein */
                    transition-all duration-300 /* Smooth transition on hover */
                  "
                >
                  Generate Quotes
              </Button>
                        
              {/* Autocomplete Suggestions */}
              {showSuggestions && filteredCategories.length > 0 && (
                <div 
                  className="
                    absolute top-full left-0 right-0 z-20 
                    bg-white/15 backdrop-blur-sm text-white/100 font-bold
                    border border-white/10 rounded-lg 
                    mt-2 overflow-hidden
                  "
                >
                  {filteredCategories.map((cat) => (
                    <div 
                      key={cat} 
                      onClick={() => handleCategoryClick(cat)}
                      className="
                        px-4 py-2 cursor-pointer 
                        hover:bg-white/25 text-slate-100
                        transition-colors duration-200
                      "
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
                
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
      </main>
    
      <footer className="text-center mt-8 text-white/100">
        <p>Built with ❤️ using Next.js 15 & ShadCN UI at Nexium.</p>
      </footer>
      </div>
      
  );
}