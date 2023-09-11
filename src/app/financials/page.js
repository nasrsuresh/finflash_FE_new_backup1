import Header from "@/components/Header";

export default function Financials() {
  return (
    <main className="h-[100vh]">
      <Header />
      <div className="w-full h-[92vh] p-8 flex items-center justify-center">
        <div className="border border-black w-[500px] h-[130px] p-4 flex items-center justify-center"> {/* Added flex, items-center, and justify-center */}
          <span className="text-maroon-500 text-2xl font-bold">Coming Soon</span>
        </div>
      </div>
    </main>
  );
}



